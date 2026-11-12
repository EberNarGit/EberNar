/* Demos interactivas. Todas usan datos de ejemplo inventados para explicar cómo funciona cada proyecto.
   Cada demo es { state(), view(s) -> html, on(s, accion, valor, api), guia(s) -> { t, sel, fin } }.
   Los botones llevan data-a (acción) y data-v (valor). "guia" dice, según el estado, qué explica el paso actual y qué botón pulsa «Siguiente». */

const ICONS = {
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/>',
  laptop: '<rect x="5" y="5" width="14" height="10" rx="1.5"/><path d="M3 19h18"/>',
  globe: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c.8-3.5 3.4-5 7-5s6.2 1.5 7 5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 15c2 .6 3.1 2.2 3.5 5"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.2"/>',
  bed: '<path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="10.5" r="1.8"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  box: '<path d="M3 8l9-4 9 4v9l-9 4-9-4z"/><path d="M3 8l9 4 9-4M12 12v9"/>',
  utensils: '<path d="M6 3v8M4 3v5a2 2 0 0 0 4 0V3M6 11v10M17 3c-2 2-3 5-3 9h3zM17 12v9"/>',
  award: '<circle cx="12" cy="9" r="5"/><path d="M9 13.5 7.5 21l4.5-2.5 4.5 2.5-1.500-7.5"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  cart: '<path d="M3 4h3l2.5 11h9L20 7H7"/><circle cx="9.5" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  clipboard: '<rect x="5" y="5" width="14" height="16" rx="2"/><path d="M9 5V3h6v2M9 11h6M9 15h4"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.500-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.500-3.500"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.500 1.500M17.500 17.500 19 19M5 19l1.500-1.500M17.500 6.500 19 5"/>',
  moon: '<path d="M20 14A8 8 0 1 1 10 4a6.500 6.500 0 0 0 10 10z"/>',
  redo: '<path d="M4 12a8 8 0 1 0 2.500-5.800L4 8.500M4 4v4.500h4.500"/>',
  file: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/>'
};
const svg = k => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[k] || ""}</svg>`;
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fmt = n => n.toLocaleString("es-MX", { maximumFractionDigits: 1 });
const money = n => "$" + fmt(n);
const r1 = n => +n.toFixed(1);

/* ── piezas de interfaz ── */
const B = (a, v, html, cls = "mk-btn", extra = "") => `<button type="button" class="${cls}" data-a="${a}" data-v="${v}" ${extra}>${html}</button>`;
const pill = (t, k = "") => `<span class="mk-pill ${k}">${t}</span>`;
const row = (b, small = "", right = "") => `<div class="mk-row"><div class="grow"><b>${b}</b>${small ? `<small>${small}</small>` : ""}</div>${right}</div>`;
const phone = (t, sub, body, cls = "", attr = "") => `<div class="dev-wrap"><div class="dev ${cls}"><div class="dev-screen"><div class="mk-status" aria-hidden="true"><span>9:41</span><span>●●●</span></div><div class="mk-bar"><div><b>${t}</b><small>${sub}</small></div></div><div class="mk-body" ${attr}>${body}</div></div></div></div>`;
const hbar = (l, v, max, cls = "") => `<div class="hbar"><span>${l}</span><div class="mk-bar-pp ${cls}"><i style="width:${Math.min(100, v / max * 100)}%"></i></div><b>${v}</b></div>`;
const okMsg = t => `<div class="sent"><span class="ok-ico">${svg("check")}</span><b>${t}</b></div>`;
const tabla = (heads, rows) => `<details class="tbl"><summary>Ver como tabla</summary><table class="tblx"><thead><tr>${heads.map((h, i) => `<th${i ? ' class="num"' : ""}>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td${i ? ' class="num"' : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></details>`;

/* ── gráficas dibujadas con SVG, sin librerías ──
   shortcut: el detalle al pasar el cursor usa <title> nativo; cambiar a tooltip propio si se necesitan series múltiples. */
function bars(it, { unit = "", max, label = "" } = {}) {
  const W = 320, H = 170, T = 20, ph = H - T - 22, st = W / it.length, bw = Math.min(34, st * .62);
  max = max || Math.max(...it.map(d => d.v)) * 1.1;
  return `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">${[0, .5, 1].map(g => `<line class="grid" x1="0" x2="${W}" y1="${T + ph * g}" y2="${T + ph * g}"/>`).join("")}${it.map((d, i) => {
    const h = Math.max(2, ph * d.v / max), x = r1(i * st + (st - bw) / 2), y = r1(T + ph - h), r = Math.min(4, h), x2 = r1(x + bw);
    return `<g style="--i:${i}"><title>${d.l}: ${fmt(d.v)}${unit}</title><rect class="hit" x="${r1(i * st)}" y="0" width="${r1(st)}" height="${H}"/><path class="b" d="M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x2 - r}Q${x2},${y} ${x2},${y + r}V${y + h}Z"/><text class="v" x="${x + bw / 2}" y="${y - 5}" text-anchor="middle">${fmt(d.v)}${unit}</text><text x="${x + bw / 2}" y="${H - 6}" text-anchor="middle">${d.l}</text></g>`;
  }).join("")}</svg>`;
}
function line(it, { unit = "", label = "" } = {}) {
  const W = 320, H = 170, T = 20, ph = H - T - 22, L = 14, R = 34, max = Math.max(...it.map(d => d.v)) * 1.1;
  const px = i => r1(L + i * (W - L - R) / (it.length - 1)), py = v => r1(T + ph * (1 - v / max)), last = it.length - 1;
  return `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">${[0, .5, 1].map(g => `<line class="grid" x1="0" x2="${W}" y1="${T + ph * g}" y2="${T + ph * g}"/>`).join("")}<path class="ln" pathLength="1" d="${it.map((d, i) => (i ? "L" : "M") + px(i) + "," + py(d.v)).join("")}"/>${it.map((d, i) => `<g style="--i:${i}"><title>${d.l}: ${fmt(d.v)}${unit}</title><circle class="hit" cx="${px(i)}" cy="${py(d.v)}" r="12"/><circle class="pt" cx="${px(i)}" cy="${py(d.v)}" r="4"/><text x="${px(i)}" y="${H - 6}" text-anchor="middle">${d.l}</text></g>`).join("")}<text class="v" x="${px(last) + 8}" y="${py(it[last].v) + 4}">${fmt(it[last].v)}${unit}</text></svg>`;
}
function donut(it, { label = "" } = {}) {
  const r = 52, C = 2 * Math.PI * r, tot = it.reduce((a, d) => a + d.v, 0); let acc = 0;
  return `<svg class="ch" viewBox="0 0 140 140" role="img" aria-label="${label}" style="max-width:170px;margin:auto"><g transform="rotate(-90 70 70)">${it.map((d, i) => {
    const len = C * d.v / tot, seg = `<circle class="arc c${i + 1}" style="--i:${i}" cx="70" cy="70" r="${r}" stroke-dasharray="${r1(len - 2)} ${r1(C - len + 2)}" stroke-dashoffset="${r1(-acc)}"><title>${d.l}: ${fmt(d.v)}</title></circle>`;
    acc += len; return seg;
  }).join("")}</g><text class="tot" x="70" y="70" text-anchor="middle" dominant-baseline="central">${fmt(tot)}</text></svg><ul class="lg">${it.map((d, i) => `<li><i class="sw c${i + 1}"></i>${d.l}<b>${fmt(d.v)}</b></li>`).join("")}</ul>`;
}

/* ── flujo por pasos: sirve para varias demos ── */
const flujo = (pasos, fin) => ({
  state: () => ({ i: 0 }),
  view: s => {
    const done = s.i >= pasos.length, cur = pasos[s.i];
    return `<div class="dg"><ol class="pipe">${pasos.map((p, k) => `<li class="pstep k-ok ${k <= s.i ? "on" : ""} ${k === s.i ? "cur" : ""}"${k === s.i ? ' aria-current="step"' : ""}><span class="node">${k < s.i ? svg("check") : `<span class="fxl">${k + 1}</span>`}</span><div class="pbody"><b>${p.t}</b><p>${p.d}</p></div></li>`).join("")}</ol>
    <div class="panel" aria-live="polite">${done ? okMsg(fin) + B("reset", "", "Ver de nuevo", "mk-btn ghost") : `<span class="label">Paso ${s.i + 1} de ${pasos.length}</span><h4>${cur.t}</h4>${cur.panel}${B("next", "", cur.btn)}`}</div></div>`;
  },
  on: (s, a) => { a === "next" ? s.i++ : s.i = 0; },
  guia: s => s.i < pasos.length ? { t: `${pasos[s.i].t}. ${pasos[s.i].d}`, sel: "[data-a=next]" } : { t: fin, fin: 1 }
});
const sem = (k, t) => `<div class="sem"><div class="luz" aria-hidden="true"><i class="r ${k === "r" ? "on" : ""}"></i><i class="a ${k === "a" ? "on" : ""}"></i><i class="v ${k === "v" ? "on" : ""}"></i></div><div><span class="label">Estatus</span><p><b>${t}</b></p></div></div>`;
const archivos = l => `<div class="mk-list">${l.map(f => `<div class="mk-row">${svg("file")}<span class="grow mono">${f}</span></div>`).join("")}</div>`;

/* ── SMS Files ── */
const HABS = ["B-204", "B-207", "B-210"], CHK = ["Ventanas", "Tendido de cama", "Barrido", "Baño", "Basura"];
const cuarto = limpio => `<svg class="illus" viewBox="0 0 160 90" aria-hidden="true"><rect width="160" height="90" fill="currentColor" opacity=".08"/><rect x="104" y="10" width="40" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M124 10v30M104 25h40" stroke="currentColor" stroke-width="2"/><rect x="14" y="48" width="84" height="26" rx="5" fill="currentColor" opacity=".35"/><rect x="14" y="40" width="26" height="14" rx="5" fill="currentColor" opacity=".7"/>${limpio
  ? '<path d="M44 56h50M44 64h50" stroke="currentColor" stroke-width="2" opacity=".5" fill="none"/><path d="M120 54l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM140 66l1.500 3.500 3.500 1.500-3.500 1.500-1.500 3.500-1.500-3.500-3.500-1.500 3.500-1.500z" fill="currentColor"/>'
  : '<path d="M44 52c10 8 16-6 26 4s14-4 24 6M48 68c8-6 14 4 22-2" stroke="currentColor" stroke-width="2.500" fill="none"/><circle cx="116" cy="74" r="5" fill="currentColor" opacity=".6"/><circle cx="128" cy="70" r="3.500" fill="currentColor" opacity=".6"/><path d="M134 78l8-6M110 60l6 4" stroke="currentColor" stroke-width="2"/>'}<path d="M0 80h160" stroke="currentColor" stroke-width="2" opacity=".4"/></svg>`;

const DEMOS = {
  "sms-files": {
    state: () => ({ step: 0, hab: "", antes: false, chk: [], tipo: "Tendido", despues: false, busy: false, sent: false, hechas: [], limpias: 6, tend: 4, camb: 2, evid: ["B-201", "B-202"] }),
    view: s => {
      const foto = (k, ok) => B(k, "", ok ? cuarto(k === "despues") : `<span>${svg("camera")}<br>Toca para tomar la foto</span>`, `mk-photo ${ok ? "has" : ""}`, `aria-label="Tomar foto de ${k === "antes" ? "cómo estaba" : "cómo quedó"}${ok ? " (tomada)" : ""}"`);
      const sig = ok => B("next", "", "Continuar", "mk-btn", ok ? "" : "disabled");
      const scr = s.sent ? okMsg("Enviado. El cliente ya lo ve.") + '<p class="mk-note" style="text-align:center">Mira cómo cambió el tablero del cliente.</p>' + B("otra", "", "Otra habitación", "mk-btn ghost") : [
        () => `<div class="mk-h">Módulo B · elige habitación</div><div class="mk-list">${HABS.map(h => s.hechas.includes(h) ? row("Hab. " + h, "2 camas", pill("Limpia", "ok")) : B("hab", h, `<div class="grow"><b>Hab. ${h}</b><small>2 camas</small></div>${pill("Pendiente", "warn")}`, "mk-row click")).join("")}</div>${s.hechas.length === HABS.length ? '<p class="mk-note">Módulo terminado.</p>' : ""}`,
        () => `<div class="mk-h">Foto: cómo estaba</div>${foto("antes", s.antes)}${sig(s.antes)}`,
        () => `<div class="mk-h">Checklist</div><div class="mk-list">${CHK.map(c => B("chk", c, `<span class="mk-check ${s.chk.includes(c) ? "on" : ""}"></span><span class="grow">${c}</span>`, "mk-row click", `role="checkbox" aria-checked="${s.chk.includes(c)}"`)).join("")}</div><div class="mk-h">Tipo de servicio</div><div class="mk-chips">${["Tendido", "Cambio de blanco"].map(t => B("tipo", t, t, "mk-chip", `aria-pressed="${s.tipo === t}"`)).join("")}</div>${sig(s.chk.length === CHK.length)}`,
        () => `<div class="mk-h">Foto: cómo quedó</div>${foto("despues", s.despues)}${sig(s.despues)}`,
        () => `<div class="mk-h">Resumen · Hab. ${s.hab}</div><div class="mk-grid2"><div><div class="mk-photo has">${cuarto(false)}</div><p class="mk-note">Antes</p></div><div><div class="mk-photo has">${cuarto(true)}</div><p class="mk-note">Después</p></div></div>${row("Checklist", CHK.length + " de " + CHK.length + " puntos", pill("Completo", "ok"))}${row("Servicio", s.tipo)}${B("enviar", "", "Enviar evidencia", "mk-btn" + (s.busy ? " busy" : ""))}`
      ][s.step]();
      const pct = Math.round(s.limpias / 12 * 100);
      return `<div class="demo-grid">${phone("SMS Files", "Operario de limpieza", `<div class="stp" role="img" aria-label="Paso ${s.step + 1} de 5">${[0, 1, 2, 3, 4].map(k => `<i class="${k <= s.step ? "on" : ""}"></i>`).join("")}</div>${scr}`)}
      <div class="panel ${s.sent ? "hl" : ""}" aria-live="polite"><span class="label">Lo que ve el cliente · en tiempo real</span>
        <div class="mk-ring"><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="bg" cx="60" cy="60" r="50"/><circle class="fg" cx="60" cy="60" r="50" stroke-dasharray="314" stroke-dashoffset="${314 * (1 - pct / 100)}"/></svg><div><b>${pct}%</b>camas limpiadas</div></div>
        ${hbar("Tendidos", s.tend, 12)}${hbar("Cambios de blanco", s.camb, 12, "s-b2")}
        <p class="mk-note">Hoy debían limpiarse 12 de 40 camas (30%). Van ${s.limpias}.</p>
        <span class="label">Evidencia reciente</span><div class="mk-list">${s.evid.slice(0, 4).map((h, i) => `<div class="mk-row ${s.sent && !i ? "hl" : ""}"><div class="grow"><b>Hab. ${h}</b><small>Foto antes · foto después · checklist</small></div>${pill("Con evidencia", "ok")}</div>`).join("")}</div></div></div>`;
    },
    on: (s, a, v, api) => {
      if (a === "hab") { s.hab = v; s.step = 1; }
      else if (a === "antes") s.antes = true;
      else if (a === "despues") s.despues = true;
      else if (a === "chk") s.chk = s.chk.includes(v) ? s.chk.filter(c => c !== v) : [...s.chk, v];
      else if (a === "tipo") s.tipo = v;
      else if (a === "next") s.step++;
      else if (a === "enviar" && !s.busy) { s.busy = true; api.later(900, () => { s.busy = false; s.sent = true; s.hechas.push(s.hab); s.limpias += 2; s.tipo === "Tendido" ? s.tend += 2 : s.camb += 2; s.evid.unshift(s.hab); }); }
      else if (a === "otra") Object.assign(s, { step: 0, hab: "", antes: false, chk: [], despues: false, sent: false });
    },
    guia: s => s.sent ? { t: "Listo: el cliente ya ve la evidencia en su tablero. Así se acabaron las multas por habitaciones mal reportadas.", fin: 1 }
      : s.busy ? { t: "Enviando la evidencia…" }
      : s.step === 0 ? { t: "El operario elige la habitación que va a limpiar.", sel: "[data-a=hab]" }
      : s.step === 1 ? (s.antes ? { t: "Foto guardada. Continúa al checklist.", sel: "[data-a=next]" } : { t: "Antes de limpiar, toma una foto de cómo encontró la habitación.", sel: "[data-a=antes]" })
      : s.step === 2 ? (s.chk.length < CHK.length ? { t: "Marca cada punto del checklist (" + s.chk.length + " de " + CHK.length + ").", sel: "[data-a=chk][aria-checked=false]" } : { t: "Checklist completo. Continúa.", sel: "[data-a=next]" })
      : s.step === 3 ? (s.despues ? { t: "Foto guardada. Revisa el resumen.", sel: "[data-a=next]" } : { t: "Al terminar, toma la foto de cómo quedó.", sel: "[data-a=despues]" })
      : { t: "Envía la evidencia. El cliente la ve al instante.", sel: "[data-a=enviar]" }
  },

  minelaundry: (() => {
    const PRENDAS = [["Camisa", 25], ["Pantalón", 30], ["Overol", 45], ["Chamarra", 60]];
    return {
      state: () => ({ ticket: [], ordenes: [{ n: 1041, pz: 3, lista: false }], correo: 0 }),
      view: s => `<div class="dg"><div class="panel"><h4>Caja</h4><div class="mk-grid2">${PRENDAS.map((p, i) => B("add", i, `<b>${p[0]}</b><small>${money(p[1])}</small>`, "mk-prod")).join("")}</div>
        ${s.ticket.length ? `<div class="mk-list">${s.ticket.map(i => row(PRENDAS[i][0], "", `<b>${money(PRENDAS[i][1])}</b>`)).join("")}</div>` : '<p class="mk-note">Toca una prenda para agregarla a la orden.</p>'}
        <div class="mk-total"><b>Total</b><b>${money(s.ticket.reduce((a, i) => a + PRENDAS[i][1], 0))}</b></div>${B("cobrar", "", "Cobrar y crear orden", "mk-btn", s.ticket.length ? "" : "disabled")}</div>
        <div class="panel" aria-live="polite"><h4>Órdenes</h4><div class="mk-list">${s.ordenes.map(o => row("Orden #" + o.n, o.pz + " prendas", o.lista ? pill("Lista · cliente avisado", "ok") : B("lista", o.n, "Marcar lista", "mk-btn sm"))).join("")}</div>
        ${s.correo ? `<div class="email"><div class="hd">${svg("mail")} Correo automático · para el cliente de la orden #${s.correo}</div><b>Tu ropa está lista</b><span>Hola. Tu orden #${s.correo} ya está lista. Puedes pasar por ella cuando gustes.</span></div>` : '<p class="mk-note">Al marcar una orden como lista, el cliente recibe un correo.</p>'}</div></div>`,
      on: (s, a, v) => {
        if (a === "add") s.ticket.push(+v);
        else if (a === "cobrar" && s.ticket.length) { s.ordenes.unshift({ n: s.ordenes[0].n + 1, pz: s.ticket.length, lista: false }); s.ticket = []; }
        else if (a === "lista") { s.ordenes.find(o => o.n === +v).lista = true; s.correo = +v; }
      },
      guia: s => s.correo ? { t: "Listo: el cliente recibió su correo y cada prenda quedó registrada en su orden.", fin: 1 }
        : s.ordenes.length > 1 && !s.ticket.length ? { t: "La ropa ya está lavada. Marca la orden como lista.", sel: "[data-a=lista]" }
        : s.ticket.length === 0 ? { t: "Llega un cliente. Agrega su primera prenda a la orden.", sel: "[data-a=add]" }
        : s.ticket.length === 1 ? { t: "Agrega otra prenda.", sel: "[data-a=add][data-v='1']" }
        : { t: "Cobra y crea la orden. Cada prenda queda registrada.", sel: "[data-a=cobrar]" }
    };
  })(),

  minerh: flujo([
    { t: "Requisición de la vacante", d: "El área pide la vacante.", panel: row("Auxiliar de limpieza", "2 plazas · Sitio A", pill("Nueva", "info")), btn: "Abrir vacante" },
    { t: "Vacante abierta", d: "RH recibe candidatos.", panel: row("Auxiliar de limpieza", "2 plazas · Sitio A", pill("Abierta", "ok")), btn: "Recibir candidato" },
    { t: "El candidato envía sus documentos", d: "Por un formulario, desde su celular.", panel: '<p class="mk-note">Así llegan los archivos:</p>' + archivos(["IMG_2231.jpg", "scan0003.pdf", "documento final (2).pdf", "foto.png"]), btn: "Ordenar expediente" },
    { t: "El expediente se ordena solo", d: "Cada archivo queda con nombre y lugar.", panel: '<p class="mk-note">Expediente · Candidato 014</p>' + archivos(["01 Identificación.jpg", "02 Comprobante de domicilio.pdf", "03 CURP.pdf", "04 Fotografía.png"]), btn: "Contratar" }
  ], "Contratación completa, con expediente ordenado."),

  minelobby: {
    state: () => ({ dia: 12, llegan: 3, turno: "A", rooms: Array.from({ length: 12 }, (_, i) => ({ n: 101 + i, e: i < 9 ? "A" : "L" })) }),
    view: s => {
      const ocup = s.rooms.filter(r => r.e === "A" || r.e === "B").length, limp = s.rooms.some(r => r.e === "C");
      const txt = { A: "Ocupada · turno A", B: "Ocupada · turno B", L: "Libre", C: "En limpieza" };
      return `<div class="panel"><div class="demo-top"><h4>Día ${s.dia} de 14 · turno ${s.turno} en sitio</h4><span class="mk-pill info">${ocup} de 12 ocupadas</span></div>
        <div class="days" role="img" aria-label="Día ${s.dia} del ciclo de 14">${Array.from({ length: 14 }, (_, i) => `<i class="${i < s.dia ? "on" : ""}"></i>`).join("")}</div>
        <div class="rooms" aria-live="polite">${s.rooms.map(r => `<div class="room ${r.e}"><b>${r.n}</b><span>${txt[r.e]}</span></div>`).join("")}</div>
        <div class="btns">${limp ? B("entrar", "", `Asignar al turno ${s.turno} que entra`, "mk-btn sm") : B("acomodar", "", s.llegan ? `Acomodar a los ${s.llegan} que llegan` : "Sin llegadas hoy", "mk-btn sm", s.llegan ? "" : "disabled") + B("dia", "", s.dia < 14 ? "Avanzar un día" : "Cambio de turno", "mk-btn sm ghost")}</div>
        <p class="mk-note">${limp ? "Salió un turno. Las habitaciones pasan a limpieza antes de asignarse." : "Cada 14 días sale un turno y entra otro."}</p></div>`;
    },
    on: (s, a) => {
      if (a === "acomodar") { s.rooms.filter(r => r.e === "L").slice(0, s.llegan).forEach(r => r.e = s.turno); s.llegan = 0; }
      else if (a === "dia") { if (s.dia < 14) s.dia++; else { s.dia = 1; s.turno = s.turno === "A" ? "B" : "A"; s.rooms.forEach(r => { if (r.e !== "L") r.e = "C"; }); } }
      else if (a === "entrar") { s.rooms.forEach((r, i) => r.e = i < 9 ? s.turno : "L"); s.llegan = 0; s.fin = true; }
    },
    guia: s => s.fin ? { t: "Listo: entró el turno nuevo y el ciclo de 14 días vuelve a empezar.", fin: 1 }
      : s.rooms.some(r => r.e === "C") ? { t: "Salió un turno. Asigna las habitaciones al turno que entra.", sel: "[data-a=entrar]" }
      : s.llegan ? { t: "Hoy llegan " + s.llegan + " personas. Acomódalas en habitaciones libres.", sel: "[data-a=acomodar]" }
      : s.dia < 14 ? { t: "Avanza al siguiente día del ciclo.", sel: "[data-a=dia]" }
      : { t: "Día 14: toca cambio de turno.", sel: "[data-a=dia]" }
  },

  "rh-bot": (() => {
    const QA = [
      ["¿Cuántos días de vacaciones me quedan?", "Te quedan 6 días de vacaciones. ¿Quieres iniciar una solicitud?"],
      ["¿Cómo pido un permiso?", "Dime la fecha y el motivo. Yo envío la solicitud a tu supervisor y te aviso cuando responda."],
      ["¿Cuándo se paga la nómina?", "El próximo pago es el viernes 15. Tu recibo estará disponible ese mismo día."]
    ];
    return {
      state: () => ({ msgs: [[0, "Hola, soy RH Bot. Te ayudo con vacaciones, permisos, nómina, quejas y reportes."]], typing: false }),
      view: s => phone("RH Bot", "Asistente virtual de RH", `<div class="chat" role="log" aria-live="polite">${s.msgs.map(m => `<div class="bub ${m[0] ? "me" : ""}">${m[1]}</div>`).join("")}${s.typing ? '<div class="bub dots3" aria-label="Escribiendo"><i></i><i></i><i></i></div>' : ""}</div><div class="mk-h">Preguntas de ejemplo</div><div class="mk-chips">${QA.map((q, i) => B("ask", i, q[0], "mk-chip", s.typing ? "disabled" : "")).join("")}</div>`, "", "data-bottom"),
      on: (s, a, v, api) => { if (s.typing) return; s.msgs.push([1, QA[v][0]]); s.typing = true; api.later(1100, () => { s.typing = false; s.msgs.push([0, QA[v][1]]); }); },
      guia: s => { const n = (s.msgs.length - 1) >> 1; return s.typing ? { t: "El bot está respondiendo…" } : n < QA.length ? { t: "Un operador pregunta: «" + QA[n][0] + "»", sel: "[data-a=ask][data-v='" + n + "']" } : { t: "Listo: el operador resolvió sus dudas sin esperar a RH.", fin: 1 }; }
    };
  })(),

  "dashboard-rh": (() => {
    const D = { Todos: { o: [82, 85, 84, 88, 90, 91], rot: 4.2, vac: 9, exp: 96 }, "Sitio A": { o: [80, 84, 86, 90, 93, 94], rot: 3.1, vac: 4, exp: 98 }, "Sitio B": { o: [84, 86, 82, 86, 87, 88], rot: 5.3, vac: 5, exp: 94 } };
    const M = ["May", "Jun", "Jul", "Ago", "Sep", "Oct"];
    return {
      state: () => ({ sitio: "Todos", vis: {} }),
      view: s => {
        const d = D[s.sitio];
        return `<div class="panel printable"><div class="demo-top"><div class="mk-chips" role="group" aria-label="Sitio">${Object.keys(D).map(k => B("sitio", k, k, "mk-chip", `aria-pressed="${s.sitio === k}"`)).join("")}</div>${B("pdf", "", "Exportar a PDF", "mk-btn sm no-print")}</div>
          <div class="kpis">${[[d.o[5] + "%", "Ocupación · octubre"], [d.rot + "%", "Rotación mensual"], [d.vac, "Vacantes abiertas"], [d.exp + "%", "Expedientes completos"]].map(k => `<div class="fig"><b>${k[0]}</b><span>${k[1]}</span></div>`).join("")}</div>
          <div class="charts one"><div class="chart"><h4>Ocupación por mes<small>${s.sitio} · porcentaje de habitaciones ocupadas</small></h4>${bars(M.map((m, i) => ({ l: m, v: d.o[i] })), { unit: "%", max: 100, label: "Ocupación por mes, " + s.sitio })}${tabla(["Mes", "Ocupación"], M.map((m, i) => [m, d.o[i] + "%"]))}</div></div>
          <p class="mk-note">Datos de ejemplo. «Exportar a PDF» abre la impresión del navegador; elige «Guardar como PDF».</p></div>`;
      },
      on: (s, a, v) => {
        if (a === "sitio") { s.sitio = v; s.vis[v] = 1; }
        else if (a === "pdf") { document.body.classList.add("print-demo"); addEventListener("afterprint", () => document.body.classList.remove("print-demo"), { once: true }); print(); }
      },
      guia: s => !s.vis["Sitio A"] ? { t: "El gerente filtra por sitio. Mira el Sitio A.", sel: "[data-v='Sitio A']" } : !s.vis["Sitio B"] ? { t: "Ahora compara con el Sitio B.", sel: "[data-v='Sitio B']" } : { t: "Listo. Prueba «Exportar a PDF»: así lleva el tablero a su presentación semanal.", fin: 1 }
    };
  })(),

  "almacen-food": (() => {
    const STOCK = { Cerdo: 650, Res: 320, Pollo: 500, Verdura: 900 }, SUST = { Cerdo: "pollo", Res: "pollo", Pollo: "cerdo", Verdura: "verdura congelada" }, DIAS = { Cerdo: 2, Res: 2, Pollo: 1, Verdura: 1 };
    return {
      state: () => ({ prod: "Cerdo", kg: 400, res: null, lineas: [], aut: false, err: "" }),
      view: s => {
        const r = s.res;
        return `<div class="dg"><div class="panel"><h4>Pedido del planeador de Food</h4>
          <label class="mk-field"><span>Producto</span><select class="in" name="prod">${Object.keys(STOCK).map(p => `<option${p === s.prod ? " selected" : ""}>${p}</option>`).join("")}</select></label>
          <label class="mk-field"><span>Kilos</span><input class="in" name="kg" type="number" min="1" inputmode="numeric" value="${esc(s.kg)}"></label>
          ${s.err ? `<p class="txt-bad" role="alert">${s.err}</p>` : ""}${B("solicitar", "", "Solicitar")}
          <div aria-live="polite">${!r ? "" : r.ok ? `<div class="msg ok"><b>${svg("check")} Hay existencia</b><span>Pides ${fmt(r.kg)} kg de ${r.prod.toLowerCase()}. Hay ${fmt(STOCK[r.prod])} kg.</span></div>` : `<div class="msg warn"><b>${svg("x")} Faltan ${fmt(r.kg - STOCK[r.prod])} kg de ${r.prod.toLowerCase()}</b><span>Hay ${fmt(STOCK[r.prod])} kg. Se puede sustituir con ${SUST[r.prod]}. Se consigue en ${DIAS[r.prod]} ${DIAS[r.prod] > 1 ? "días" : "día"}.</span></div>`}</div></div>
          <div class="panel" aria-live="polite"><h4>Resumen para el jefe de almacén</h4>${s.lineas.length ? `<div class="mk-list">${s.lineas.map(l => row(l.prod, fmt(l.kg) + " kg", l.ok ? pill("Hay", "ok") : pill("Faltan " + fmt(l.kg - STOCK[l.prod]) + " kg", "warn"))).join("")}</div>${s.aut ? `<div class="msg ok"><b>${svg("check")} Autorizado</b><span>Se avisó al planeador. Sin cadena de correos.</span></div>` : B("aut", "", "Autorizar")}` : '<p class="mk-note">Aquí llega el resumen de cada pedido.</p>'}</div></div>`;
      },
      on: (s, a) => {
        if (a === "aut") { s.aut = true; return; }
        const kg = Math.floor(Number(s.kg));
        if (!(s.prod in STOCK) || !(kg > 0 && kg <= 100000)) { s.err = "Escribe los kilos: un número mayor a 0."; return; }
        s.err = ""; s.aut = false; s.res = { prod: s.prod, kg, ok: kg <= STOCK[s.prod] }; s.lineas.push(s.res);
      },
      guia: s => s.aut ? { t: "Listo: pedido autorizado con un resumen claro, sin cadena de correos.", fin: 1 }
        : s.lineas.length === 0 ? { t: "El planeador pide 400 kg de cerdo. El sistema revisa si hay.", set: { prod: "Cerdo", kg: 400 }, sel: "[data-a=solicitar]" }
        : s.lineas.length === 1 ? { t: "Ahora pide 500 kg de res. No alcanza: mira qué responde.", set: { prod: "Res", kg: 500 }, sel: "[data-a=solicitar]" }
        : { t: "El jefe de almacén recibe el resumen y autoriza.", sel: "[data-a=aut]" }
    };
  })(),

  minemenu: (() => {
    const MENU = [["🍳", "Huevo al gusto"], ["🌮", "Chilaquiles"], ["🥞", "Hot cakes"], ["🍉", "Fruta"]];
    return {
      state: () => ({ sel: -1, turno: false, listo: false }),
      view: s => phone("MineMenu", "Comedor · desayuno", s.turno
        ? `<div class="sent" aria-live="polite"><span class="label">Tu turno</span><div class="turno">A-27</div><b>${s.listo ? "¡Tu pedido está listo! Pasa por él." : "Siéntate. Te avisamos en la pantalla."}</b><span class="mk-note">${MENU[s.sel][1]}</span></div><div class="board"><div><span class="label">Preparando</span><span>A-26</span>${s.listo ? "" : '<span class="mine">A-27</span>'}</div><div><span class="label">Listos</span><span>A-25</span>${s.listo ? '<span class="mine">A-27</span>' : ""}</div></div>${B("nuevo", "", "Nuevo pedido", "mk-btn ghost")}`
        : `<div class="mk-h">Toca lo que quieres</div><div class="mk-grid2">${MENU.map((m, i) => B("sel", i, `<span class="ph emo" aria-hidden="true">${m[0]}</span><b>${m[1]}</b>`, "mk-prod", `aria-pressed="${s.sel === i}"`)).join("")}</div>${B("pedir", "", "Pedir", "mk-btn", s.sel < 0 ? "disabled" : "")}`, "tablet"),
      on: (s, a, v, api) => {
        if (a === "sel") s.sel = +v;
        else if (a === "pedir") { s.turno = true; api.later(2600, () => { s.listo = true; }); }
        else Object.assign(s, { sel: -1, turno: false, listo: false });
      },
      guia: s => s.listo ? { t: "Listo: el comensal recoge su pedido sin haber hecho fila.", fin: 1 } : s.turno ? { t: "Cocina prepara el pedido. El comensal espera sentado…" } : s.sel < 0 ? { t: "El comensal toca lo que quiere en la pantalla.", sel: "[data-a=sel]" } : { t: "Confirma el pedido y recibe su turno.", sel: "[data-a=pedir]" }
    };
  })(),

  "dashboard-bonos": (() => {
    /* [métrica, real, meta, unidad, 1 si menos es mejor] */
    const N = {
      Operarios: [["Asistencia", 98, 95, "%"]],
      Encargados: [["Asistencia del equipo", 96, 95, "%"], ["Rotación del equipo", 3, 5, "%", 1]],
      Supervisores: [["Rotación", 4, 5, "%", 1], ["Visitas a sitio", 6, 8, ""]],
      Coordinadores: [["Visitas a sitio", 10, 8, ""], ["Aumento de servicios con el cliente", 2, 1, ""]],
      Gerentes: [["Aumento de servicios con el cliente", 3, 2, ""], ["Rotación", 4, 5, "%", 1]]
    };
    return {
      state: () => ({ nivel: "Operarios", vis: { Operarios: 1 } }),
      view: s => {
        const ms = N[s.nivel].map(m => ({ m, ok: m[4] ? m[1] <= m[2] : m[1] >= m[2] })), aplica = ms.every(x => x.ok);
        return `<div class="panel"><div class="mk-chips" role="group" aria-label="Nivel">${Object.keys(N).map(k => B("nivel", k, k, "mk-chip", `aria-pressed="${s.nivel === k}"`)).join("")}</div>
          <div aria-live="polite" class="mk-list"><p class="mk-note">Persona de ejemplo · nivel ${s.nivel.toLowerCase()} · ${ms.length > 1 ? ms.length + " métricas" : "1 métrica"}</p>
          ${ms.map(({ m, ok }) => `<div class="mk-row" style="flex-wrap:wrap"><div class="grow"><b>${m[0]}</b><small>Meta: ${m[2]}${m[3]} ${m[4] ? "o menos" : "o más"}</small></div><b>${m[1]}${m[3]}</b><span class="${ok ? "txt-ok" : "txt-bad"}">${ok ? "✓ Cumple" : "✗ No cumple"}</span><div class="mk-bar-pp" style="flex-basis:100%"><i style="width:${Math.min(100, m[1] / (Math.max(m[1], m[2]) * 1.1) * 100)}%"></i></div></div>`).join("")}
          <div class="verdict ${aplica ? "si" : "no"}">${svg(aplica ? "check" : "x")}${aplica ? "Aplica bono" : "No aplica bono"}</div></div></div>`;
      },
      on: (s, a, v) => { if (v in N) { s.nivel = v; s.vis[v] = 1; } },
      guia: s => { const k = Object.keys(N).find(k => !s.vis[k]); return k ? { t: "Cada nivel se mide distinto. Mira el de " + k.toLowerCase() + ".", sel: "[data-v='" + k + "']" } : { t: "Listo: cada nivel tiene su métrica y un resultado claro.", fin: 1 }; }
    };
  })(),

  viaticos: (() => {
    const CON = ["Gasolina", "Comida", "Hotel", "Casetas"];
    return {
      state: () => ({ gastos: [["Gasolina", 850]], concepto: "Comida", monto: 320, est: 0, err: "" }),
      view: s => {
        const total = s.gastos.reduce((a, g) => a + g[1], 0), off = s.est ? "disabled" : "";
        return `<div class="dg"><div class="panel"><h4>Coordinador · captura</h4><div class="mk-chips" role="group" aria-label="Concepto">${CON.map(c => B("con", c, c, "mk-chip", `aria-pressed="${s.concepto === c}" ${off}`)).join("")}</div>
          <label class="mk-field"><span>Monto</span><input class="in" name="monto" type="number" min="1" inputmode="decimal" value="${esc(s.monto)}" ${off}></label>
          ${s.err ? `<p class="txt-bad" role="alert">${s.err}</p>` : ""}${B("add", "", "Agregar gasto", "mk-btn ghost", off)}
          <div class="mk-list">${s.gastos.map(g => row(g[0], "", `<b>${money(g[1])}</b>`)).join("")}</div><div class="mk-total"><b>Total</b><b>${money(total)}</b></div>${B("enviar", "", "Enviar a aprobación", "mk-btn", off)}</div>
          <div class="panel" aria-live="polite"><h4>Persona encargada</h4>${s.est === 0 ? '<p class="mk-note">Aún no llega ninguna solicitud.</p>' : s.est === 1 ? `<div class="msg warn"><b>Solicitud de viáticos</b><span>${s.gastos.length} gastos · ${money(total)}</span></div>${B("aprobar", "", "Aprobar")}` : `<div class="msg ok"><b>${svg("check")} Aprobado</b><span>Se avisó al coordinador. Sin Excel ni correos.</span></div>`}
          <ul class="mk-tl">${["Capturado", "Enviado a la persona encargada", "Aprobado"].map((t, i) => `<li class="${s.est >= i && (i < 2 || s.est === 2) ? "on" : ""}"><span>${t}</span></li>`).join("")}</ul></div></div>`;
      },
      on: (s, a, v) => {
        if (a === "con") s.concepto = v;
        else if (a === "add") { const m = Math.round(Number(s.monto) * 100) / 100; if (!(m > 0 && m <= 1e6)) { s.err = "Escribe un monto mayor a 0."; return; } s.err = ""; s.gastos.push([s.concepto, m]); }
        else if (a === "enviar") s.est = 1;
        else if (a === "aprobar") s.est = 2;
      },
      guia: s => s.est === 2 ? { t: "Listo: gasto aprobado sin Excel ni correos. El coordinador gana tiempo para sus visitas.", fin: 1 } : s.est === 1 ? { t: "La solicitud llega a una sola persona. Apruébala.", sel: "[data-a=aprobar]" } : s.gastos.length < 2 ? { t: "El coordinador captura un gasto de comida.", sel: "[data-a=add]" } : { t: "Envía sus gastos a aprobación.", sel: "[data-a=enviar]" }
    };
  })(),

  "sap-compras": flujo([
    { t: "Solicitud de compra", d: "El almacén registra lo que necesita.", panel: row("Guantes de nitrilo", "Cantidad: 200 cajas", pill("Nueva", "info")), btn: "Pedir cotizaciones" },
    { t: "Cotizaciones comparadas", d: "Los proveedores, lado a lado.", panel: `<table class="tblx"><thead><tr><th>Proveedor</th><th class="num">Precio por caja</th><th class="num">Entrega</th></tr></thead><tbody><tr><td>Proveedor A</td><td class="num">$118</td><td class="num">5 días</td></tr><tr class="best"><td>Proveedor B · ✓ mejor opción</td><td class="num">$112</td><td class="num">3 días</td></tr><tr><td>Proveedor C</td><td class="num">$125</td><td class="num">2 días</td></tr></tbody></table>`, btn: "Enviar a autorización" },
    { t: "Autorización", d: "Se aprueba antes de comprar.", panel: row("Orden de compra", "200 cajas · Proveedor B · $22,400", pill("Por autorizar", "warn")), btn: "Autorizar" },
    { t: "Recepción de mercancía", d: "La entrada se registra contra la orden.", panel: row("Llegaron 200 de 200 cajas", "Coincide con la orden", pill("Completa", "ok")), btn: "Registrar entrada" }
  ], "Compra cerrada: solicitada, autorizada y recibida."),

  "sap-requisiciones": flujo([
    { t: "Solicitud del área", d: "El área pide la vacante.", panel: sem("r", "Sin autorizar") + row("Supervisor de limpieza", "1 plaza · Sitio A"), btn: "Enviar a presupuesto" },
    { t: "Autorización de presupuesto", d: "Se confirma que hay presupuesto.", panel: sem("a", "En autorización · presupuesto"), btn: "Autorizar presupuesto" },
    { t: "Autorización de RH", d: "RH valida la vacante.", panel: sem("a", "En autorización · RH"), btn: "Autorizar en RH" },
    { t: "Lista para reclutar", d: "Con registro de quién autorizó.", panel: sem("v", "Autorizada · lista para reclutar") + `<ul class="mk-tl"><li class="on"><span>Área solicitante<small>Solicitó la vacante</small></span></li><li class="on"><span>Presupuesto<small>Autorizó</small></span></li><li class="on"><span>RH<small>Autorizó</small></span></li></ul>`, btn: "Pasar a reclutamiento" }
  ], "Requisición lista. RH ya puede reclutar."),

  "sap-equipos": flujo([
    { t: "Ticket", d: "Se pide equipo o soporte.", panel: row("Solicitud de equipo", "Usuario nuevo · laptop", pill("Nueva", "info")), btn: "Enviar a autorización" },
    { t: "Autorización", d: "Quien corresponde da el visto bueno.", panel: row("Solicitud de equipo", "Usuario nuevo · laptop", pill("Por autorizar", "warn")), btn: "Autorizar" },
    { t: "Asignación de equipo", d: "Se elige un equipo disponible.", panel: row("Laptop LT-0231", "Asignada al usuario nuevo", pill("Asignada", "ok")), btn: "Preparar equipo" },
    { t: "Entrega", d: "El usuario recibe su equipo listo.", panel: row("Equipo configurado", "Con accesos y programas", pill("Por entregar", "info")), btn: "Entregar" }
  ], "Equipo entregado. Usuario listo."),

  "soporte-ti": flujo([
    { t: "Solicitud de alta", d: "El área pide un usuario nuevo.", panel: row("Alta de usuario", "Auxiliar administrativo · Sitio A", pill("Nueva", "info")), btn: "Enviar a autorización" },
    { t: "Autorización", d: "Se aprueba con un clic.", panel: row("Alta de usuario", "Auxiliar administrativo · Sitio A", pill("Por autorizar", "warn")), btn: "Autorizar" },
    { t: "Preparación", d: "Correo, licencia y equipo.", panel: ["Correo creado", "Licencia asignada", "Equipo asignado"].map(t => row(t, "", pill("✓ Hecho", "ok"))).join(""), btn: "Avisar al usuario" }
  ], "Listo. El usuario ya puede trabajar."),

  "dashboards-codigo": (() => {
    const D = {
      Semana: { t: "día", b: [["Lun", 42], ["Mar", 55], ["Mié", 48], ["Jue", 61], ["Vie", 58], ["Sáb", 30]], l: [12, 25, 37, 52, 66, 74], d: [["Hotelería", 46], ["Comedor", 28], ["Almacén", 16], ["RH", 10]] },
      Mes: { t: "semana", b: [["S1", 260], ["S2", 294], ["S3", 281], ["S4", 318]], l: [20, 44, 69, 92], d: [["Hotelería", 182], ["Comedor", 120], ["Almacén", 71], ["RH", 39]] }
    };
    return {
      state: () => ({ rango: "Semana", carga: false, v: 0 }),
      view: s => {
        const d = D[s.rango], j = (n, i) => s.v ? Math.round(n * (1 + ((i * 7 + s.v * 3) % 5 - 2) / 20)) : n; /* variación fija para simular datos nuevos */
        const b = d.b.map((x, i) => ({ l: x[0], v: j(x[1], i) })), l = d.b.map((x, i) => ({ l: x[0], v: d.l[i] })), dn = d.d.map((x, i) => ({ l: x[0], v: j(x[1], i + 1) }));
        return `<div class="panel"><div class="demo-top"><div class="mk-chips" role="group" aria-label="Periodo">${Object.keys(D).map(k => B("rango", k, k, "mk-chip", `aria-pressed="${s.rango === k}"`)).join("")}</div>${B("api", "", "Actualizar datos", "mk-btn sm" + (s.carga ? " busy" : ""))}</div>
          <div class="charts"><div class="chart"><h4>Servicios por ${d.t}<small>Gráfica de barras</small></h4>${bars(b, { label: "Servicios por " + d.t })}</div>
          <div class="chart"><h4>Avance acumulado<small>Gráfica de línea · porcentaje</small></h4>${line(l, { unit: "%", label: "Avance acumulado" })}</div>
          <div class="chart"><h4>Solicitudes por área<small>Gráfica de dona</small></h4>${donut(dn, { label: "Solicitudes por área" })}</div></div>
          ${tabla([d.t[0].toUpperCase() + d.t.slice(1), "Servicios", "Avance"], b.map((x, i) => [x.l, fmt(x.v), l[i].v + "%"]))}
          <p class="mk-note" aria-live="polite">${s.carga ? "Consultando la API…" : "Datos de ejemplo. En un tablero real llegan de una API (una conexión que entrega los datos de otro sistema)."}</p></div>`;
      },
      on: (s, a, v, api) => {
        if (a === "rango") s.rango = v;
        else if (a === "api" && !s.carga) { s.carga = true; api.later(800, () => { s.carga = false; s.v++; }); }
      },
      guia: s => s.carga ? { t: "Consultando la API…" } : s.v ? { t: "Listo: tres gráficas dibujadas con código, sin licencias de Power BI.", fin: 1 } : s.rango === "Semana" ? { t: "Cambia el periodo: las gráficas se redibujan.", sel: "[data-v='Mes']" } : { t: "Actualiza los datos, como si llegaran de una API.", sel: "[data-a=api]" }
    };
  })()
};

/* ── motor: dibuja la demo y una barra de guía. La persona avanza con «Siguiente» o tocando la demo directamente. ── */
function mountDemo(root) {
  const d = DEMOS[root.dataset.demo]; if (!d) return;
  let s, vida = 0, timers = [];
  const bar = document.createElement("div"); bar.className = "guia"; bar.setAttribute("aria-live", "polite"); root.before(bar);
  const draw = () => {
    const f = document.activeElement, k = root.contains(f) && f.dataset.a ? f.dataset : null, enBarra = bar.contains(f);
    root.innerHTML = d.view(s);
    root.querySelectorAll("[data-bottom]").forEach(e => e.scrollTop = e.scrollHeight);
    const g = d.guia(s);
    bar.innerHTML = `<p>${g.fin ? svg("check") : ""}<span>${g.t}</span></p>` + (g.fin ? `<button type="button" class="btn ghost" data-g="re">${svg("redo")}Ver de nuevo</button>` : `<button type="button" class="btn" data-g="next" aria-disabled="${!g.sel}">Siguiente ${svg("arrow")}</button>`);
    bar.classList.toggle("fin", !!g.fin);
    if (g.sel && !g.set) root.querySelector(g.sel + ":not(:disabled)")?.classList.add("hint");
    // al redibujar se pierde el foco del teclado: se devuelve al mismo botón
    if (enBarra) bar.querySelector("button").focus({ preventScroll: true });
    else if (k) ([...root.querySelectorAll("[data-a]")].find(e => e.dataset.a === k.a && e.dataset.v === k.v && !e.disabled) || root.querySelector("[data-a]:not(:disabled)") || root).focus({ preventScroll: true });
  };
  const api = { later(ms, fn) { const v = vida; timers.push(setTimeout(() => { if (v === vida && root.isConnected) { fn(); draw(); } }, reduce ? Math.min(ms, 80) : ms)); } };
  const start = () => { vida++; timers.forEach(clearTimeout); timers = []; s = d.state(); draw(); };
  root.onclick = e => { const el = e.target.closest("[data-a]"); if (el && root.contains(el) && !el.disabled) { d.on(s, el.dataset.a, el.dataset.v, api); draw(); } };
  root.oninput = e => { if (e.target.name) s[e.target.name] = e.target.value; };
  bar.onclick = e => {
    const b = e.target.closest("[data-g]"); if (!b) return;
    if (b.dataset.g === "re") return start();
    const g = d.guia(s); if (!g.sel) return;
    if (g.set) { Object.assign(s, g.set); draw(); }
    root.querySelector(g.sel + ":not(:disabled)")?.click();
  };
  root._restart = start;
  start();
}
