/* Único archivo de datos del sitio. Para agregar un proyecto, copia un bloque de PROYECTOS y cambia los textos.
   Campos: id (va en la URL), nombre, sub, icono, seccion ("proyectos" | "dashboards" | "soporte" | "web"),
   areas (de la lista AREAS), herramientas, resumen, problema, antes, construi[], cambio[],
   cifras [[valor, etiqueta]] (solo resultados reales), demo (id en demos.js, opcional), nota (opcional). */

const PERFIL = {
  marca: "EberNar",
  puesto: "Coordinador de Sistemas y Transformación Digital",
  frase: "Más de 4 años digitalizando procesos y automatizando información para que la administración tome decisiones con datos tangibles y KPIs.",
  correo: "eberconv@gmail.com",
  whatsapp: "844 360 0994",
  wa: "https://wa.me/528443600994",
  cifras: [
    { pre: "+", n: 4, suf: "", lbl: "años digitalizando procesos", icono: "clock" },
    { pre: "−", n: 90, suf: "%", lbl: "multas · SMS Files", icono: "camera", ir: "#/proyecto/sms-files" },
    { pre: "−", n: 95, suf: "%", lbl: "pérdida de prendas · MineLaundry", icono: "tag", ir: "#/proyecto/minelaundry" },
    { pre: "~", n: 3000, suf: "", lbl: "habitaciones al día", icono: "bed", ir: "#/proyecto/sms-files" },
    { pre: "", n: 14, suf: "+", lbl: "proyectos", icono: "grid", ir: "#/proyectos" }
  ],
  herramientas: [
    ["Power Platform", "Power Apps, Power Automate y Copilot Studio: apps, flujos automáticos y asistentes."],
    ["Power BI", "Tableros con indicadores para decidir."],
    ["SharePoint", "Dónde viven los archivos y las fotos."],
    ["JavaScript y HTML", "Dashboards propios que toman datos de APIs (conexiones entre sistemas)."],
    ["Soporte TI", "Usuarios, equipos de cómputo y servidores."]
  ]
};

const AREAS = ["Hotelería", "RH", "Almacén", "Comedor", "Finanzas/Operación", "Soporte TI", "Gerencia"];

const SECCIONES = {
  dashboards: { titulo: "Dashboards con código propio", sub: "Tableros hechos con JavaScript y HTML. No requieren licencias de Power BI.", ids: ["dashboards-codigo"] },
  soporte: { titulo: "Soporte TI", sub: "Equipos, servidores, licencias y correos. Usuarios listos en horas.", ids: ["soporte-ti", "sap-equipos"] },
  web: { titulo: "Web", sub: "Propuesta de rediseño para un desarrollador de vivienda.", ids: ["manter"] }
};

const PROYECTOS = [
  {
    id: "sms-files", nombre: "SMS Files", sub: "Evidencia de limpieza, habitación por habitación", icono: "camera", seccion: "proyectos", estrella: true,
    areas: ["Hotelería", "Gerencia"], herramientas: ["Power Apps", "Power Automate", "Power BI", "SharePoint"],
    resumen: "App móvil con foto de antes y después y un checklist por habitación. El cliente ve el avance en tiempo real, con evidencia.",
    problema: "En auditorías sorpresa, el cliente encontraba habitaciones sucias que en el reporte figuraban como limpias. Cada caso terminaba en multa para la empresa.",
    antes: "Los operarios de limpieza llenaban una comanda en papel con el módulo y la habitación. No había detalle ni evidencia de cómo quedó cada una.",
    construi: [
      "App móvil: el operario toma una foto de cómo encontró la habitación y otra de cómo la dejó.",
      "Checklist por habitación: ventanas, tendido de cama, barrido y más.",
      "El cliente ve el avance en tiempo real, con la evidencia a la mano.",
      "Dashboard para conciliar con el cliente: % de camas limpiadas, tendidos vs. cambios de blanco y % de camas que debían limpiarse ese día.",
      "Las fotos se guardan en SharePoint. Diseñado, construido y documentado por mí."
    ],
    cambio: ["Las multas bajaron 90%.", "Hoy cubre alrededor de 3,000 habitaciones al día.", "La conciliación con el cliente se hace con el dashboard, no con papeles."],
    cifras: [["−90%", "en multas"], ["~3,000", "habitaciones al día"]],
    demo: "sms-files", demoTitulo: "Limpia una habitación y mira lo que ve el cliente"
  },
  {
    id: "minelaundry", nombre: "MineLaundry", sub: "Punto de venta de lavandería", icono: "tag", seccion: "proyectos",
    areas: ["Finanzas/Operación"], herramientas: ["Power Apps", "Power Automate"],
    resumen: "Caja de lavandería con automatizaciones. El cliente recibe un correo cuando su ropa está lista.",
    problema: "Se perdían prendas y no había forma clara de saber en qué estado iba cada orden.",
    antes: "Todo era manual y en Excel.",
    construi: ["Punto de venta para registrar cada orden y sus prendas.", "Automatizaciones que siguen la orden de principio a fin.", "Correo automático al cliente cuando su ropa está lista."],
    cambio: ["La pérdida de prendas bajó 95%.", "Ahorro operativo: se dejó la captura manual en Excel."],
    cifras: [["−95%", "en pérdida de prendas"]],
    demo: "minelaundry", demoTitulo: "Cobra una orden y márcala como lista"
  },
  {
    id: "minerh", nombre: "MineRH", sub: "Reclutamiento y expedientes", icono: "users", seccion: "proyectos",
    areas: ["RH"], herramientas: ["Power Apps", "Power Automate", "SharePoint"],
    resumen: "Todo el proceso de RH en digital: desde la requisición de la vacante hasta la contratación.",
    problema: "El proceso de contratación y los expedientes no estaban digitalizados. Era difícil seguir cada vacante y encontrar los documentos.",
    antes: "Expedientes y trámites fuera de un sistema, sin un orden único.",
    construi: ["Flujo completo: requisición de la vacante, candidatos y contratación.", "Formulario donde el candidato envía sus documentos.", "Los archivos se ordenan solos en el expediente al recibirlos."],
    cambio: ["RH tiene sus expedientes digitales y ordenados.", "Cada vacante se sigue de principio a fin en un solo lugar."],
    demo: "minerh", demoTitulo: "De la vacante al expediente ordenado"
  },
  {
    id: "minelobby", nombre: "MineLobby", sub: "Asignación de habitaciones", icono: "bed", seccion: "proyectos",
    areas: ["Hotelería", "Finanzas/Operación"], herramientas: ["Power Apps"],
    resumen: "Módulo para acomodar al personal en habitaciones, como en un hotel, con rotación cada 14 días.",
    problema: "En la operación minera el personal entra y sale cada 14 días. Las habitaciones rotan todo el tiempo y hay que saber quién ocupa cuál.",
    antes: "La asignación se llevaba a mano.",
    construi: ["Tablero de habitaciones: ocupadas, libres y en limpieza.", "Asignación de quien llega a una habitación libre.", "Rotación por ciclo de 14 días."],
    cambio: ["Se sabe en todo momento quién ocupa cada habitación.", "El cambio de turno se prepara con el tablero."],
    demo: "minelobby", demoTitulo: "Tablero de habitaciones con ciclo de 14 días"
  },
  {
    id: "rh-bot", nombre: "RH Bot", sub: "Asistente virtual de RH", icono: "chat", seccion: "proyectos",
    areas: ["RH"], herramientas: ["Copilot Studio"],
    resumen: "Bot que responde las consultas de los operadores: vacaciones, permisos, nómina, quejas y reportes.",
    problema: "Los operadores tienen dudas frecuentes de RH y necesitan respuesta rápida.",
    antes: "Cada duda se resolvía preguntando directo a RH.",
    construi: ["Bot hecho con Copilot Studio (la herramienta de Microsoft para crear asistentes).", "Responde sobre vacaciones, permisos y nómina.", "Recibe quejas y reportes."],
    cambio: ["El operador consulta por su cuenta, a cualquier hora.", "RH atiende menos preguntas repetidas."],
    demo: "rh-bot", demoTitulo: "Pregúntale al bot"
  },
  {
    id: "dashboard-rh", nombre: "Dashboard de RH", sub: "Indicadores para la junta semanal", icono: "chart", seccion: "proyectos",
    areas: ["RH", "Gerencia"], herramientas: ["Power BI"],
    resumen: "Concentra los proyectos de RH en un tablero: ocupación, rotación y más. Se exporta a PDF.",
    problema: "La información de RH vivía en varios proyectos. Armar la presentación semanal tomaba tiempo.",
    antes: "Los datos se juntaban a mano para cada presentación.",
    construi: ["Un tablero que concentra los datos de los proyectos de RH.", "Indicadores de ocupación, rotación y más.", "Exportación a PDF para la presentación semanal del gerente de RH."],
    cambio: ["El gerente de RH exporta el tablero a PDF y lo presenta cada semana.", "Todos ven los mismos números."],
    demo: "dashboard-rh", demoTitulo: "Filtra y exporta a PDF"
  },
  {
    id: "almacen-food", nombre: "Almacén · Materia prima", sub: "Solicitudes de Food al almacén", icono: "box", seccion: "proyectos",
    areas: ["Almacén", "Comedor"], herramientas: ["Power Apps", "Power Automate"],
    resumen: "El planeador pide materia prima. El sistema revisa existencias y avisa al jefe de almacén con un resumen para autorizar.",
    problema: "Los pedidos de materia prima se perdían en cadenas de correos. Nadie tenía claro qué había y qué faltaba.",
    antes: "El planeador de Food pedía por correo, por ejemplo 400 kg de cerdo o 500 de res, y la información se perdía entre respuestas.",
    construi: ["Formulario de pedido para el planeador de Food.", "Revisión automática de existencias.", "Aviso al jefe de almacén con un resumen para que autorice.", "Si falta algo, dice qué falta, con qué se puede sustituir y en cuánto tiempo se consigue."],
    cambio: ["Se eliminó la cadena de correos.", "El jefe de almacén autoriza con un resumen claro."],
    demo: "almacen-food", demoTitulo: "Haz un pedido y mira la respuesta"
  },
  {
    id: "minemenu", nombre: "MineMenu", sub: "Kiosko digital del comedor", icono: "utensils", seccion: "proyectos",
    areas: ["Comedor"], herramientas: ["Power Apps"],
    resumen: "El comensal pide en una pantalla, se sienta y espera su turno. Sin filas.",
    problema: "Había filas enormes en el comedor, hasta para pedir un huevo.",
    antes: "Cada comensal hacía fila para pedir y esperaba de pie.",
    construi: ["Pantalla táctil para pedir.", "Número de turno para cada pedido.", "El comensal espera sentado."],
    cambio: ["El comensal ya no hace fila para pedir.", "Cocina recibe los pedidos en orden."],
    demo: "minemenu", demoTitulo: "Pide en el kiosko"
  },
  {
    id: "dashboard-bonos", nombre: "Dashboard de bonos", sub: "Quién recibe bono y por qué", icono: "award", seccion: "proyectos",
    areas: ["RH", "Finanzas/Operación", "Gerencia"], herramientas: ["Power BI"],
    resumen: "Define si una persona recibe bono, con una métrica distinta por nivel. Une datos de varias bases.",
    problema: "Cada nivel se mide distinto y los datos estaban en varias bases de datos. Decidir un bono era lento y discutible.",
    antes: "Los datos se revisaban por separado en cada base.",
    construi: ["Una métrica por nivel: operarios, encargados, supervisores, coordinadores y gerentes.", "Métricas como asistencia, rotación, aumento de servicios con el cliente y visitas a sitio.", "Unificación de datos de varias bases de datos.", "Resultado claro por persona: aplica o no aplica."],
    cambio: ["El bono se define con datos, no con opiniones.", "Cada nivel sabe con qué se le mide."],
    demo: "dashboard-bonos", demoTitulo: "Cambia de nivel y mira el resultado"
  },
  {
    id: "viaticos", nombre: "Viáticos de coordinadores", sub: "Captura y aprobación de gastos", icono: "receipt", seccion: "proyectos",
    areas: ["Finanzas/Operación"], herramientas: ["Power Apps", "Power Automate"],
    resumen: "Los coordinadores capturan sus gastos y el proceso llega solo a una persona encargada.",
    problema: "Reportar viáticos quitaba tiempo a los coordinadores y la información llegaba repartida en varios correos.",
    antes: "Los capturaban en Excel y enviaban varios correos.",
    construi: ["Captura de gastos sencilla.", "Flujo automático de aprobación.", "Todo llega a una sola persona encargada."],
    cambio: ["El proceso es automático.", "Los coordinadores ganan tiempo para hacer visitas."],
    demo: "viaticos", demoTitulo: "Captura un gasto y apruébalo"
  },
  {
    id: "sap-compras", nombre: "SAP · Compras de almacén", sub: "De la necesidad a la entrada de mercancía", icono: "cart", seccion: "proyectos",
    areas: ["Almacén", "Finanzas/Operación"], herramientas: ["SAP"],
    resumen: "El almacén genera la necesidad, se cotiza con proveedores, se autoriza y se registra la entrada contra la orden.",
    problema: "Las compras del almacén dependían de correos. Era difícil saber en qué paso iba cada pedido.",
    antes: "Pedidos por correo y seguimiento a mano.",
    construi: ["El almacén registra lo que necesita comprar.", "Se comparan cotizaciones de proveedores.", "La compra se autoriza antes de pedir.", "Al llegar la mercancía, la entrada se registra contra la orden."],
    cambio: ["Cada compra tiene un camino claro, de la solicitud a la recepción.", "Queda registro de quién autorizó y qué se recibió."],
    demo: "sap-compras", demoTitulo: "Solicitud, cotizaciones, autorización y recepción", nota: "Descripción general del flujo."
  },
  {
    id: "sap-requisiciones", nombre: "SAP · Requisiciones de vacantes", sub: "La vacante, con trazabilidad", icono: "clipboard", seccion: "proyectos",
    areas: ["RH"], herramientas: ["SAP"],
    resumen: "El área pide la vacante, pasa por autorización de presupuesto y de RH, y queda lista para reclutar.",
    problema: "Las vacantes se pedían sin un camino definido. No se sabía quién debía autorizar ni en qué paso estaban.",
    antes: "Formatos y correos sin seguimiento.",
    construi: ["El área solicitante registra la vacante.", "Autorización de presupuesto.", "Autorización de RH.", "La vacante queda lista para reclutar, con trazabilidad (se ve quién hizo qué y cuándo)."],
    cambio: ["Cada requisición muestra su estatus.", "RH recluta solo vacantes ya autorizadas."],
    demo: "sap-requisiciones", demoTitulo: "Semáforo de estatus de la requisición", nota: "Descripción general del flujo."
  },
  {
    id: "sap-equipos", nombre: "SAP · Soporte de equipos", sub: "Alta, asignación y seguimiento", icono: "laptop", seccion: "soporte",
    areas: ["Soporte TI"], herramientas: ["SAP"],
    resumen: "Alta, asignación y seguimiento de equipos de cómputo y solicitudes de soporte, con autorización.",
    problema: "Los equipos y las solicitudes de soporte se atendían sin un registro único. Un usuario nuevo podía esperar de más.",
    antes: "Solicitudes sueltas y control de equipos a mano.",
    construi: ["Alta de equipos de cómputo.", "Solicitudes de soporte con autorización.", "Asignación del equipo al usuario.", "Seguimiento hasta la entrega."],
    cambio: ["Cada equipo tiene responsable.", "El usuario queda listo en horas."],
    demo: "sap-equipos", demoTitulo: "Ticket, asignación y entrega", nota: "Descripción general del flujo."
  },
  {
    id: "soporte-ti", nombre: "Soporte TI y administración", sub: "Usuarios, equipos, servidores, licencias y correos", icono: "shield", seccion: "soporte",
    areas: ["Soporte TI"], herramientas: ["Power Automate"],
    resumen: "Soporte a usuarios, equipos y servidores. Solicitudes y autorizaciones automatizadas para dejar todo listo en horas.",
    problema: "Dar de alta a un usuario implica varias cosas: correo, licencia y equipo. Sin un proceso, se alarga.",
    antes: "Cada alta se pedía y se autorizaba por separado.",
    construi: ["Soporte a usuarios en mis propios desarrollos.", "Soporte a equipos de cómputo y servidores.", "Administración de licencias y correos.", "Solicitudes y autorizaciones automatizadas."],
    cambio: ["Usuarios y equipos quedan listos en algunas horas."],
    demo: "soporte-ti", demoTitulo: "Alta de usuario: solicitud, autorización y listo"
  },
  {
    id: "dashboards-codigo", nombre: "Dashboards con código propio", sub: "Sin licencias de Power BI", icono: "code", seccion: "dashboards",
    areas: ["Gerencia"], herramientas: ["JavaScript y HTML"],
    resumen: "Tableros hechos con JavaScript y HTML, publicados en una página web. Dibujan las gráficas con código y toman los datos de APIs.",
    problema: "No todas las personas que necesitan ver un tablero tienen licencia de Power BI.",
    antes: "Ver un tablero dependía de tener licencia.",
    construi: ["Dashboards publicados en una página web.", "Gráficas dibujadas con código, sin librerías de pago.", "Datos tomados de APIs (conexiones que entregan la información de otros sistemas)."],
    cambio: ["No requieren licencias de Power BI.", "Se abren desde cualquier navegador."],
    demo: "dashboards-codigo", demoTitulo: "Barras, línea y dona dibujadas con código"
  },
  {
    id: "manter", nombre: "Rediseño web de casas Manter", sub: "Propuesta conceptual", icono: "home", seccion: "web",
    areas: [], herramientas: ["JavaScript y HTML"],
    resumen: "Propuesta conceptual de rediseño para un desarrollador de vivienda del norte de Coahuila.",
    problema: "Quien busca casa quiere comparar modelos y saber cuánto pagaría, rápido y desde el celular.",
    antes: "Es una propuesta conceptual: muestra cómo podría verse y funcionar el sitio.",
    construi: ["Simulador de crédito.", "Catálogo de modelos.", "Filtros para encontrar casa.", "Animaciones suaves."],
    cambio: ["Propuesta conceptual: no hay resultados medidos."],
    enlace: { href: "manter/index.html", texto: "Abrir la propuesta completa" }
  }
];
