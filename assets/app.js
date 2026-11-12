/* Navegación por hash, vistas, búsqueda y filtros. Los datos están en proyectos.js y las demos en demos.js. */
const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };
const S = { q: "", area: "", herr: "" };
const byId = Object.fromEntries(PROYECTOS.map(p => [p.id, p]));
const HERR = [...new Set(PROYECTOS.flatMap(p => p.herramientas))];
const NAV = [["inicio", "Inicio", "home"], ["proyectos", "Proyectos", "grid"], ["dashboards", "Dashboards", "chart"], ["soporte", "Soporte TI", "laptop"], ["web", "Web", "globe"], ["sobre-mi", "Sobre mí", "user"]];
const href = k => k === "inicio" ? "#/" : "#/" + k;

// autocomprobación de datos: avisa en consola si un proyecto nuevo quedó mal definido
PROYECTOS.forEach(p => {
  console.assert(p.id && p.nombre && p.problema && p.antes && Array.isArray(p.construi) && Array.isArray(p.cambio), "Proyecto incompleto:", p.id);
  console.assert(!p.demo || DEMOS[p.demo], "Demo inexistente:", p.demo);
  console.assert(p.areas.every(a => AREAS.includes(a)), "Área fuera de la lista:", p.id);
  p._h = norm([p.nombre, p.sub, p.resumen, p.problema, p.antes, p.construi.join(" "), p.areas.join(" "), p.herramientas.join(" ")].join(" "));
});

function route() {
  const h = decodeURIComponent(location.hash).replace(/^#\/?/, "").split("/").filter(Boolean);
  if (h[0] === "proyecto" && byId[h[1]]) return { v: "proyecto", p: byId[h[1]] };
  return { v: NAV.some(n => n[0] === h[0]) ? h[0] : "inicio" };
}

/* ── piezas ── */
const chipsHerr = p => p.herramientas.map(h => `<span>${esc(h)}</span>`).join("");
const chipsArea = p => p.areas.map(a => `<span class="area">${esc(a)}</span>`).join("");
const card = (p, i) => `<a class="card appcard rv" href="#/proyecto/${p.id}" style="--i:${Math.min(i, 8)}"><div class="head"><span class="ico">${svg(p.icono)}</span><span><b>${esc(p.nombre)}</b><small>${esc(p.sub)}</small></span></div><p>${esc(p.resumen)}</p><div class="chips-s">${chipsArea(p)}${chipsHerr(p)}</div><div class="foot"><span>${p.cifras ? `<b>${esc(p.cifras[0][0])}</b> ${esc(p.cifras[0][1])}` : p.demo ? "Con demo interactiva" : "Propuesta conceptual"}</span><span class="dots-btn">${svg("arrow")}</span></div></a>`;
const filtro = (k, v, n) => `<button type="button" class="chip" data-f="${k}" data-v="${esc(v)}" aria-pressed="${S[k] === v}">${esc(v || "Todas")}<span class="n">${n}</span></button>`;
const contacto = () => `<div class="btns"><a class="btn" href="mailto:${PERFIL.correo}">${svg("mail")}${PERFIL.correo}</a><a class="btn ghost" href="${PERFIL.wa}" target="_blank" rel="noopener">${svg("phone")}WhatsApp ${PERFIL.whatsapp}</a></div>`;

function homeHTML() {
  const star = PROYECTOS.find(p => p.estrella), resto = PROYECTOS.filter(p => !p.estrella).slice(0, 6);
  return `<div class="stats intro-cards">${PERFIL.cifras.map((c, i) => `<${c.ir ? `a href="${c.ir}"` : "div"} class="card stat" style="--i:${i}"><div class="top"><span class="ico">${svg(c.icono)}</span></div><div><div class="num"><span>${c.pre}<span data-count="${c.n}">${fmt(c.n)}</span>${c.suf}</span></div><div class="lbl">${esc(c.lbl)}</div></div></${c.ir ? "a" : "div"}>`).join("")}</div>
  <section class="card pad lead rv" id="h-quien"><span class="label">Quién soy</span><p class="big">${esc(PERFIL.frase)}</p><p>Soy ${PERFIL.marca}, ${PERFIL.puesto}. En cada proyecto muestro el antes manual y el después digital, con una demo que puedes probar.</p><div class="btns"><a class="btn" href="#/proyectos">Ver proyectos ${svg("arrow")}</a><a class="btn ghost" href="#/sobre-mi">Contacto</a></div></section>
  <section class="sec" id="h-estrella"><h2>Proyecto estrella</h2><a class="card star rv" href="#/proyecto/${star.id}"><div class="eyebrow" style="display:flex;gap:10px;align-items:center"><span class="ico">${svg(star.icono)}</span><span class="pill star-p">${star.areas[0]}</span></div><h3>${esc(star.nombre)}</h3><p>${esc(star.resumen)}</p>
    <div class="ba"><div><b>Antes</b>${esc(star.antes)}</div><div class="now"><b>Después</b>${esc(star.construi[0])}</div></div>
    <div class="figs">${star.cifras.map(c => `<div class="fig"><b>${esc(c[0])}</b><span>${esc(c[1])}</span></div>`).join("")}</div><span class="btn" style="justify-self:start">Ver cómo funciona ${svg("arrow")}</span></a></section>
  <div class="grid g2" id="h-herr"><div class="card pad rv"><div class="card-title"><h3>Herramientas que uso</h3></div><ul class="legend">${PERFIL.herramientas.map(h => `<li style="display:block"><b style="margin:0">${esc(h[0])}</b><br><span style="color:var(--muted);font-size:13.5px">${esc(h[1])}</span></li>`).join("")}</ul></div>
    <div class="card pad rv"><div class="card-title"><h3>Áreas con las que he trabajado</h3></div><p style="margin:0 0 12px;color:var(--muted)">Toca un área para ver sus proyectos.</p><div class="chips-s">${AREAS.map(a => `<button type="button" data-f="area" data-v="${a}">${a} · ${PROYECTOS.filter(p => p.areas.includes(a)).length}</button>`).join("")}</div>
    <p style="margin:14px 0 8px;color:var(--muted)">O por herramienta:</p><div class="chips-s">${HERR.map(h => `<button type="button" data-f="herr" data-v="${h}">${h}</button>`).join("")}</div></div></div>
  <section class="sec" id="h-proy"><h2>Proyectos <small>el antes manual y el después digital</small></h2><div class="grid g2 g3">${resto.map(card).join("")}</div><a class="btn ghost" href="#/proyectos" style="justify-self:start">Ver los ${PROYECTOS.length} proyectos ${svg("arrow")}</a></section>
  <section class="card pad lead rv" id="h-contacto"><span class="label">Contacto</span><p class="big">¿Tienes un proceso manual que quieras digitalizar?</p>${contacto()}</section>`;
}

const listaFiltrada = () => {
  const w = norm(S.q.trim()).split(/\s+/).filter(Boolean);
  return PROYECTOS.filter(p => (!S.area || p.areas.includes(S.area)) && (!S.herr || p.herramientas.includes(S.herr)) && w.every(x => p._h.includes(x)));
};
function proyectosHTML() {
  return `<div class="filters"><div class="frow"><span class="label" id="l-area">Área</span><div class="chips" role="group" aria-labelledby="l-area">${["", ...AREAS].map(a => filtro("area", a, a ? PROYECTOS.filter(p => p.areas.includes(a)).length : PROYECTOS.length)).join("")}</div></div>
    <div class="frow"><span class="label" id="l-herr">Herramienta</span><div class="chips" role="group" aria-labelledby="l-herr">${["", ...HERR].map(h => filtro("herr", h, h ? PROYECTOS.filter(p => p.herramientas.includes(h)).length : PROYECTOS.length)).join("")}</div></div></div>
    <p class="count" id="count" role="status"></p><div class="grid g2 g3" id="lista"></div>`;
}
function drawList() {
  const l = listaFiltrada(), el = $("#lista"); if (!el) return;
  document.querySelectorAll("[data-f].chip").forEach(b => b.setAttribute("aria-pressed", S[b.dataset.f] === b.dataset.v));
  $("#count").textContent = l.length + (l.length === 1 ? " proyecto" : " proyectos") + (S.q.trim() ? ` para «${S.q.trim()}»` : "");
  el.innerHTML = l.map(card).join("") || `<div class="card empty" style="grid-column:1/-1"><b>Nada coincide</b>Prueba con otra palabra (por ejemplo «fotos», «bono» o «almacén») o quita un filtro.</div>`;
  $("#side").innerHTML = `<h3>Proyectos</h3>${l.map(p => `<a href="#/proyecto/${p.id}">${esc(p.nombre)}</a>`).join("")}`;
  reveal();
}

const DET = [["d-problema", "Problema"], ["d-antes", "Cómo se hacía antes"], ["d-construi", "Qué construí"], ["d-cambio", "Qué cambió"], ["d-herr", "Herramientas"], ["d-areas", "Áreas"], ["d-demo", "Demo interactiva"]];
function detailHTML(p) {
  const i = PROYECTOS.indexOf(p), prev = PROYECTOS[i - 1], next = PROYECTOS[i + 1];
  const sec = (id, label, body) => `<div class="sec" id="${id}"><h3 class="label" style="margin:0">${label}</h3>${body}</div>`;
  return `<article class="card hero-app">
    <div class="eyebrow"><span class="ico">${svg(p.icono)}</span><span>${esc(p.sub)}</span></div>
    ${sec("d-problema", "Problema", `<p>${esc(p.problema)}</p>`)}
    ${sec("d-antes", "Cómo se hacía antes", `<p>${esc(p.antes)}</p>`)}
    ${sec("d-construi", "Qué construí", `<ul class="built">${p.construi.map(c => `<li>${svg("check")}<span>${esc(c)}</span></li>`).join("")}</ul>`)}
    ${sec("d-cambio", "Qué cambió", `${p.cifras ? `<div class="figs">${p.cifras.map(c => `<div class="fig"><b>${esc(c[0])}</b><span>${esc(c[1])}</span></div>`).join("")}</div>` : ""}<ul class="built">${p.cambio.map(c => `<li>${svg("check")}<span>${esc(c)}</span></li>`).join("")}</ul>`)}
    ${sec("d-herr", "Herramientas", `<div class="chips-s">${chipsHerr(p)}</div>`)}
    ${p.areas.length ? sec("d-areas", "Áreas con las que trabajé", `<div class="chips-s">${chipsArea(p)}</div>`) : ""}
    ${p.nota ? `<p class="nota">${esc(p.nota)}</p>` : ""}
  </article>
  ${p.demo ? `<section class="card demo" id="d-demo" aria-labelledby="t-demo-${p.id}"><div class="demo-top"><div><span class="label">Demo interactiva</span><h3 id="t-demo-${p.id}">${esc(p.demoTitulo)}</h3></div><div class="demo-actions"><span class="badge b-warn">Datos de ejemplo</span><button type="button" class="chip" data-restart>${svg("redo")} Reiniciar</button></div></div><div class="demo-root" data-demo="${p.demo}" tabindex="-1"></div></section>` : ""}
  ${p.enlace ? `<section class="card demo" id="d-demo"><div class="demo-top"><div><span class="label">Vista previa</span><h3>Propuesta conceptual, navegable</h3></div><a class="btn" href="${p.enlace.href}">${esc(p.enlace.texto)} ${svg("arrow")}</a></div><div class="browser"><div class="barra" aria-hidden="true"><i></i><i></i><i></i><span>${p.enlace.href}</span></div><iframe src="${p.enlace.href}" title="Vista previa: ${esc(p.nombre)}" loading="lazy"></iframe></div><p class="nota">Propuesta conceptual. No es el sitio oficial.</p></section>` : ""}
  <nav class="pager" aria-label="Otros proyectos">${prev ? `<a class="btn ghost" href="#/proyecto/${prev.id}">${svg("back")}${esc(prev.nombre)}</a>` : "<span></span>"}${next ? `<a class="btn ghost" href="#/proyecto/${next.id}">${esc(next.nombre)}${svg("arrow")}</a>` : ""}</nav>`;
}

function sobreHTML() {
  return `<section class="card pad lead" id="s-yo"><span class="label">Sobre mí</span><p class="big">${PERFIL.marca} · ${PERFIL.puesto}</p><p>${esc(PERFIL.frase)}</p><p>Trabajo con las áreas para entender cómo hacen las cosas hoy. Después construyo la herramienta, la documento y doy soporte a quienes la usan.</p></section>
  <div class="grid g2"><div class="card pad" id="s-herr"><div class="card-title"><h3>Herramientas</h3></div><ul class="legend">${PERFIL.herramientas.map(h => `<li style="display:block"><b style="margin:0">${esc(h[0])}</b><br><span style="color:var(--muted);font-size:13.5px">${esc(h[1])}</span></li>`).join("")}</ul></div>
  <div class="card pad" id="s-areas"><div class="card-title"><h3>Áreas con las que he trabajado</h3></div><div class="chips-s">${AREAS.map(a => `<button type="button" data-f="area" data-v="${a}">${a}</button>`).join("")}</div><p style="color:var(--muted);margin:12px 0 0">También preparo reportes para las gerencias.</p></div></div>
  <section class="card pad lead" id="s-contacto"><span class="label">Contacto</span><p class="big">Escríbeme</p><p>Respondo por correo o por WhatsApp.</p>${contacto()}</section>`;
}

/* ── render ── */
function head(r) {
  const h = new Date().getHours();
  if (r.v === "inicio") return [(h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches") + ", soy", PERFIL.marca, PERFIL.puesto + ". " + PERFIL.frase];
  if (r.v === "proyectos") return ["Proyectos", "Antes manual, después digital", "Busca o filtra por área y por herramienta. Cada tarjeta abre su detalle con una demo."];
  if (r.v === "sobre-mi") return ["Sobre mí", "Contacto", PERFIL.puesto + "."];
  if (r.v === "proyecto") return [r.p.areas.join(" · ") || "Web", r.p.nombre, r.p.resumen];
  return ["Sección", SECCIONES[r.v].titulo, SECCIONES[r.v].sub];
}
const sideBtns = l => l.map(([id, t]) => `<button type="button" data-scroll="${id}">${t}</button>`).join("");
let lastKey = null;
function render() {
  const r = route(), key = r.v + (r.p ? r.p.id : ""), [g, t, sub] = head(r);
  const navKey = r.v === "proyecto" ? r.p.seccion : r.v, sec = SECCIONES[r.v];
  $("#greet").textContent = g; $("#vTitle").textContent = t; $("#vSub").textContent = sub;
  document.title = r.v === "inicio" ? "EberNar · Sistemas y Transformación Digital" : t + " · EberNar";
  const hl = $(".hello"); hl.classList.remove("swap"); void hl.offsetWidth; hl.classList.add("swap");
  let html, side = "";
  if (r.v === "inicio") { html = homeHTML(); side = `<h3>Inicio</h3>${sideBtns([["h-quien", "Quién soy"], ["h-estrella", "Proyecto estrella"], ["h-herr", "Herramientas y áreas"], ["h-proy", "Proyectos"], ["h-contacto", "Contacto"]])}`; }
  else if (r.v === "proyectos") html = proyectosHTML();
  else if (r.v === "sobre-mi") { html = sobreHTML(); side = `<h3>Sobre mí</h3>${sideBtns([["s-yo", "Quién soy"], ["s-herr", "Herramientas"], ["s-areas", "Áreas"], ["s-contacto", "Contacto"]])}`; }
  else if (sec && sec.ids.length > 1) { html = `<div class="grid g2">${sec.ids.map((id, i) => card(byId[id], i)).join("")}</div>`; side = `<h3>${sec.titulo}</h3>${sec.ids.map(id => `<a href="#/proyecto/${id}">${esc(byId[id].nombre)}</a>`).join("")}`; }
  else {
    const p = r.p || byId[sec.ids[0]];
    html = detailHTML(p);
    side = `<h3>${esc(p.nombre)}</h3>${sideBtns(DET.filter(d => d[0] !== "d-areas" || p.areas.length))}<h3>Más proyectos</h3>${PROYECTOS.filter(x => x.seccion === p.seccion && x !== p).map(x => `<a href="#/proyecto/${x.id}">${esc(x.nombre)}</a>`).join("")}`;
  }
  $("#view").innerHTML = html; $("#side").innerHTML = side;
  if (r.v === "proyectos") drawList();
  updateNav(navKey);
  document.querySelectorAll("[data-demo]").forEach(mountDemo);
  reveal(); if (r.v === "inicio") countUp();
  if (lastKey !== null && lastKey !== key) { scrollTo({ top: 0, behavior: "auto" }); $("#vTitle").focus({ preventScroll: true }); }
  lastKey = key;
}
// Sin startViewTransition: si la pestaña no está pintando, su callback no corre y la página se queda en la vista anterior.
const update = render;

/* aparición al entrar a la vista */
const io = "IntersectionObserver" in window ? new IntersectionObserver(en => en.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" }) : null;
function reveal() { document.querySelectorAll(".rv:not(.in)").forEach(e => io ? io.observe(e) : e.classList.add("in")); }

function countUp() {
  if (reduce) return;
  document.querySelectorAll("[data-count]").forEach(el => {
    const end = +el.dataset.count, t0 = performance.now();
    const step = t => { const k = Math.min(1, (t - t0) / 1100), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(Math.round(end * e)); if (k < 1 && el.isConnected) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
}

/* menú con indicador deslizante */
$("#nav").innerHTML = `<span class="nav-ind" aria-hidden="true"></span>` + NAV.map(([k, l, i]) => `<a href="${href(k)}" data-view="${k}">${svg(i)}${l}</a>`).join("");
function updateNav(v) {
  const nav = $("#nav"), ind = nav.querySelector(".nav-ind"); let cur = null;
  nav.querySelectorAll("[data-view]").forEach(b => { const on = b.dataset.view === v; on ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current"); if (on) cur = b; });
  if (!cur) { ind.style.opacity = 0; return; }
  ind.style.opacity = 1; ind.style.left = cur.offsetLeft + "px"; ind.style.width = cur.offsetWidth + "px";
  if (nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: cur.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
}
const navNow = () => { const r = route(); updateNav(r.v === "proyecto" ? r.p.seccion : r.v); };
addEventListener("resize", navNow);
document.fonts?.ready.then(navNow);

/* tema claro / oscuro */
const mqDark = matchMedia("(prefers-color-scheme: dark)");
const effTheme = () => document.documentElement.getAttribute("data-theme") || (mqDark.matches ? "dark" : "light");
function syncTheme() { const v = effTheme(), seg = $("#segTheme"); [...seg.querySelectorAll("button")].forEach((b, k) => { const on = b.dataset.v === v; b.setAttribute("aria-pressed", on); if (on) seg.dataset.pos = k; }); }
$("#segTheme").addEventListener("click", ev => {
  const b = ev.target.closest("button"); if (!b || b.dataset.v === effTheme()) return;
  store.set("ebr-theme", b.dataset.v);
  document.documentElement.setAttribute("data-theme", b.dataset.v); syncTheme();
});
mqDark.addEventListener?.("change", syncTheme);
syncTheme();

/* eventos */
addEventListener("hashchange", update);
$("#q").addEventListener("input", e => { S.q = e.target.value; route().v === "proyectos" ? drawList() : location.hash = "#/proyectos"; });
addEventListener("keydown", e => {
  if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) { e.preventDefault(); $("#q").focus(); }
  if (e.key === "Escape" && document.activeElement === $("#q")) { S.q = $("#q").value = ""; drawList(); }
});
document.addEventListener("click", e => {
  const f = e.target.closest("[data-f]"), sc = e.target.closest("[data-scroll]"), rs = e.target.closest("[data-restart]");
  if (f) { S[f.dataset.f] = f.classList.contains("chip") && S[f.dataset.f] === f.dataset.v ? "" : f.dataset.v; route().v === "proyectos" ? drawList() : location.hash = "#/proyectos"; }
  else if (sc) document.getElementById(sc.dataset.scroll)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  else if (rs) rs.closest(".demo").querySelector("[data-demo]")._restart();
  else if (e.target.closest(".skip")) { e.preventDefault(); $("#view").focus(); $("#view").scrollIntoView(); }
});
render();
