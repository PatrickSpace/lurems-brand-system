(function () {
  const BUSINESS_CARD_SRC = "./assets/lurems-business-card-haz-luz.png";
  const MARK_SRC = "./assets/lurems-isotipo-transparent-CGVbIjAh.png";
  const WEB_APPS_TAB_LABEL = "16 — Web Apps";
  const WEB_APPS_CONTENT_VERSION = "20260709-webapps-13";

  function textOf(node) {
    return (node.textContent || "").trim();
  }

  function findTextElement(text) {
    return Array.from(document.querySelectorAll("p, h1, span, code")).find((node) => textOf(node) === text);
  }

  function enhanceUrls() {
    Array.from(document.querySelectorAll("span, code")).forEach((node) => {
      const text = textOf(node).toLowerCase();
      if ((text === "lurems.com" || text === "lurems.lat") && !node.classList.contains("lurems-light-link")) {
        node.classList.add("lurems-light-link");
      }
    });
  }

  function addBusinessCard() {
    const label = findTextElement("Business Cards");
    if (!label || document.querySelector(".lurems-static-card-application")) return;

    const section = label.parentElement;
    if (!section) return;

    const card = document.createElement("div");
    card.className = "lurems-static-card-application";
    card.innerHTML = `
      <img src="${BUSINESS_CARD_SRC}" alt="Tarjeta de presentación Lurems con haz de luz" />
      <div class="lurems-static-card-caption">
        <div>
          <strong>Tarjeta institucional — Haz de luz</strong><br />
          <span>Aplicación extendida del faro, el camino terapéutico y la URL con luz creciente.</span>
        </div>
        <code>lurems.lat</code>
      </div>
    `;

    section.appendChild(card);
  }

  function addLightPattern() {
    const label = findTextElement("Patterns");
    const title = Array.from(document.querySelectorAll("h1")).find((node) => textOf(node) === "Patterns");
    if (!label && !title) return;
    if (document.querySelector(".lurems-light-pattern-card")) return;

    const cards = Array.from(document.querySelectorAll("div")).find((node) => {
      const style = node.getAttribute("style") || "";
      return style.includes("grid") && node.textContent && node.textContent.includes("Uso del Faro") && node.textContent.includes("Color por Rol");
    });
    if (!cards) return;

    const card = document.createElement("div");
    card.className = "lurems-light-pattern-card";
    card.innerHTML = `
      <div class="lurems-light-pattern-demo">
        <span class="lurems-light-pattern-url lurems-light-link">lurems.lat</span>
      </div>
      <div class="lurems-light-pattern-body">
        <p class="lurems-light-pattern-title">Haz de luz bajo URL</p>
        <p class="lurems-light-pattern-copy">La URL puede emitir una luz horizontal cálida que crece desde la izquierda, conectando la navegación digital con el concepto del faro.</p>
      </div>
    `;

    cards.appendChild(card);
  }

  function findNavList() {
    return Array.from(document.querySelectorAll("nav > div")).find((node) => {
      const text = textOf(node);
      return text.includes("01 — Cover") && text.includes("15 — Design Tokens");
    });
  }

  function setWebAppsNavState(active) {
    const navList = findNavList();
    if (!navList) return;

    Array.from(navList.querySelectorAll("button")).forEach((button) => {
      const isWebApps = textOf(button) === WEB_APPS_TAB_LABEL;
      if (isWebApps && active) {
        button.style.background = "#45A99A";
        button.style.color = "#ffffff";
        button.style.fontWeight = "600";
      } else if (isWebApps) {
        button.style.background = "transparent";
        button.style.color = "#7BADA8";
        button.style.fontWeight = "400";
      } else if (active) {
        button.style.background = "transparent";
        button.style.color = "#7BADA8";
        button.style.fontWeight = "400";
      }
    });
  }

  function ensureWebAppsHost() {
    let host = document.querySelector(".lurems-webapps-host");
    if (!host) {
      host = document.createElement("div");
      host.className = "lurems-webapps-host";
      const root = document.querySelector("#root");
      if (root && root.parentNode) {
        root.parentNode.insertBefore(host, root.nextSibling);
      } else {
        document.body.appendChild(host);
      }
    }
    return host;
  }

  function deactivateWebAppsPage(clearHash) {
    document.body.classList.remove("lurems-webapps-active");
    setWebAppsNavState(false);
    if (clearHash && window.location.hash === "#web-apps") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  function addWebAppsTab() {
    const navList = findNavList();
    if (!navList) return;
    navList.classList.add("lurems-nav-tabs");
    if (navList.querySelector("[data-lurems-tab='web-apps']")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.luremsTab = "web-apps";
    button.textContent = WEB_APPS_TAB_LABEL;
    button.style.cssText = [
      "padding: 5px 10px",
      "border-radius: 8px",
      "font-size: 10.5px",
      "font-family: 'DM Mono', monospace",
      "font-weight: 400",
      "color: #7BADA8",
      "background: transparent",
      "border: none",
      "cursor: pointer",
      "white-space: nowrap",
      "transition: all 0.15s"
    ].join("; ");

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.location.hash = "web-apps";
      renderWebAppsPage();
    });

    navList.appendChild(button);
  }

  function metricCard(label, value, note) {
    return `
      <div class="lurems-info-card">
        <span>${label}</span>
        <strong>${value}</strong>
        <small>${note}</small>
      </div>
    `;
  }

  function sidebarItem(icon, label, active) {
    return `
      <div class="lurems-sidebar-item${active ? " is-active" : ""}">
        <span class="lurems-sidebar-icon">${icon}</span>
        <span>${label}</span>
      </div>
    `;
  }

  function listRow(initials, title, subtitle, status) {
    return `
      <div class="lurems-list-row">
        <div class="lurems-avatar">${initials}</div>
        <div>
          <strong>${title}</strong>
          <span>${subtitle}</span>
        </div>
        <span class="lurems-status-pill">${status}</span>
      </div>
    `;
  }

  function chartBars(values) {
    return values.map((height) => `<div class="lurems-chart-bar" style="height: ${height}%"></div>`).join("");
  }

  function appExample({ modifier, eyebrow, title, button, menu, noteTitle, note, metrics, chartTitle, bars, rows, captionTitle, captionText, token }) {
    return `
      <section class="lurems-app-example ${modifier || ""}">
        <div class="lurems-app-chrome">
          <aside class="lurems-app-sidebar">
            <div class="lurems-sidebar-brand">
              <img src="${MARK_SRC}" alt="" />
              <span>lurems</span>
            </div>
            <div class="lurems-sidebar-menu">
              ${menu.map((item, index) => sidebarItem(item[0], item[1], index === 0)).join("")}
            </div>
            <div class="lurems-sidebar-note">
              <strong>${noteTitle}</strong>
              <span>${note}</span>
            </div>
          </aside>
          <div class="lurems-app-main">
            <div class="lurems-app-topbar">
              <div>
                <div class="lurems-app-eyebrow">${eyebrow}</div>
                <div class="lurems-app-title">${title}</div>
              </div>
              <div class="lurems-app-actions">
                <button class="lurems-icon-button" type="button">⌕</button>
                <button class="lurems-icon-button" type="button">◎</button>
                <button class="lurems-primary-button" type="button">${button}</button>
              </div>
            </div>
            <div class="lurems-dashboard-cards">
              ${metrics.map((item) => metricCard(item[0], item[1], item[2])).join("")}
            </div>
            <div class="lurems-dashboard-body">
              <div class="lurems-panel">
                <h3>${chartTitle}</h3>
                <div class="lurems-chart">${chartBars(bars)}</div>
              </div>
              <div class="lurems-panel">
                <h3>Actividad reciente</h3>
                <div class="lurems-list">
                  ${rows.map((item) => listRow(item[0], item[1], item[2], item[3])).join("")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lurems-example-caption">
          <div>
            <strong>${captionTitle}</strong><br />
            <span>${captionText}</span>
          </div>
          <code>${token}</code>
        </div>
      </section>
    `;
  }

  function webAppsContent() {
    return `
      <div class="lurems-webapps-page">
        <header class="lurems-webapps-header">
          <div class="lurems-webapps-number">16</div>
          <div>
            <h1>Web Apps</h1>
            <p>Ejemplos de interfaces SaaS para Lurems con menú lateral, dashboards y cards informativas.</p>
          </div>
        </header>
        <div class="lurems-webapps-grid">
          ${appExample({
            modifier: "is-patient",
            eyebrow: "Paciente",
            title: "Panel de bienestar",
            button: "Nueva sesión",
            menu: [["IN", "Inicio"], ["SE", "Sesiones"], ["PL", "Plan"], ["MS", "Mensajes"], ["PR", "Perfil"]],
            noteTitle: "Próxima sesión",
            note: "Hoy 16:00 con la Dra. Sofía Martínez.",
            metrics: [["Sesiones", "4", "este mes"], ["Check-ins", "12", "racha activa"], ["Objetivos", "68%", "avance"], ["Mensajes", "3", "sin leer"]],
            chartTitle: "Estado semanal",
            bars: [48, 58, 44, 72, 68, 82, 76],
            rows: [["SM", "Dra. Sofía Martínez", "Sesión individual", "16:00"], ["AI", "Asistente Lurems", "Resumen disponible", "nuevo"], ["PL", "Plan terapéutico", "2 tareas pendientes", "hoy"]],
            captionTitle: "Portal del paciente",
            captionText: "Dashboard sereno, cards de progreso y navegación enfocada en acompañamiento.",
            token: "patient.dashboard"
          })}
          ${appExample({
            modifier: "is-psychologist",
            eyebrow: "Psicólogo",
            title: "Workspace profesional",
            button: "Agregar nota",
            menu: [["AG", "Agenda"], ["PA", "Pacientes"], ["NT", "Notas"], ["FI", "Finanzas"], ["RE", "Recursos"]],
            noteTitle: "Bloque clínico",
            note: "5 sesiones confirmadas y 2 notas por cerrar.",
            metrics: [["Agenda", "5", "hoy"], ["Pacientes", "38", "activos"], ["Notas", "2", "pendientes"], ["Rating", "4.9", "promedio"]],
            chartTitle: "Carga de sesiones",
            bars: [62, 76, 84, 58, 72, 38, 24],
            rows: [["AG", "Ana García", "Seguimiento TCC", "10:30"], ["JV", "Jorge Vera", "Primera sesión", "12:00"], ["LC", "Lucía Campos", "Nota clínica", "draft"]],
            captionTitle: "Panel para psicólogos",
            captionText: "El morado separa la experiencia profesional y organiza agenda, pacientes y notas.",
            token: "psychologist.workspace"
          })}
          ${appExample({
            modifier: "is-ops",
            eyebrow: "Operaciones",
            title: "Dashboard de matching",
            button: "Revisar cola",
            menu: [["OV", "Overview"], ["MT", "Matching"], ["QA", "Calidad"], ["CO", "Contenido"], ["SU", "Soporte"]],
            noteTitle: "Calidad clínica",
            note: "Indicadores estables dentro del rango definido.",
            metrics: [["Matches", "128", "semana"], ["Tiempo", "7m", "promedio"], ["NPS", "72", "salud"], ["Alertas", "4", "prioridad"]],
            chartTitle: "Demanda por canal",
            bars: [38, 52, 48, 66, 78, 86, 64],
            rows: [["MX", "Match pendiente", "Ansiedad / disponibilidad", "alta"], ["QA", "Revisión de perfil", "Documento vencido", "medio"], ["CS", "Caso soporte", "Cambio de profesional", "nuevo"]],
            captionTitle: "Panel operativo",
            captionText: "Vista densa para equipos internos con métricas, colas y señales de calidad.",
            token: "ops.dashboard"
          })}
          ${appExample({
            modifier: "is-patient",
            eyebrow: "Paciente",
            title: "Onboarding terapéutico",
            button: "Continuar",
            menu: [["BI", "Bienvenida"], ["MO", "Motivos"], ["PR", "Preferencias"], ["HO", "Horarios"], ["RE", "Resumen"]],
            noteTitle: "Progreso inicial",
            note: "El paciente completa preferencias antes del primer match.",
            metrics: [["Pasos", "3/5", "completados"], ["Afinidad", "82%", "pre-match"], ["Tiempo", "6m", "promedio"], ["Privacidad", "100%", "activo"]],
            chartTitle: "Necesidades declaradas",
            bars: [74, 62, 48, 68, 42, 56, 38],
            rows: [["AN", "Ansiedad", "Motivo principal", "alto"], ["HO", "Horario tarde", "Preferencia activa", "ok"], ["MO", "Modalidad online", "Sesión remota", "ok"]],
            captionTitle: "Flujo de onboarding",
            captionText: "Pantalla para capturar contexto, preferencias y señales de compatibilidad del paciente.",
            token: "patient.onboarding"
          })}
          ${appExample({
            modifier: "is-patient",
            eyebrow: "Paciente",
            title: "Explorar psicólogos",
            button: "Filtrar",
            menu: [["EX", "Explorar"], ["FI", "Filtros"], ["FA", "Favoritos"], ["CO", "Comparar"], ["AG", "Agendar"]],
            noteTitle: "Match sugerido",
            note: "3 profesionales recomendados según necesidad y disponibilidad.",
            metrics: [["Matches", "9", "compatibles"], ["Disponibles", "6", "esta semana"], ["Especialidad", "TCC", "principal"], ["Favoritos", "2", "guardados"]],
            chartTitle: "Compatibilidad por criterio",
            bars: [88, 76, 64, 82, 58, 70, 74],
            rows: [["SM", "Sofía Martínez", "Ansiedad y autoestima", "94%"], ["JV", "Javier Vega", "Estrés laboral", "89%"], ["LC", "Lucía Campos", "Duelo y cambios", "86%"]],
            captionTitle: "Marketplace de psicólogos",
            captionText: "Vista de descubrimiento con cards, filtros y señales claras de compatibilidad.",
            token: "patient.marketplace"
          })}
          ${appExample({
            modifier: "is-patient",
            eyebrow: "Paciente",
            title: "Agenda de sesiones",
            button: "Reservar",
            menu: [["CA", "Calendario"], ["SE", "Sesiones"], ["PA", "Pagos"], ["RE", "Recordatorios"], ["HI", "Historial"]],
            noteTitle: "Recordatorio",
            note: "Próxima sesión mañana a las 18:30.",
            metrics: [["Próxima", "18:30", "mañana"], ["Sesiones", "8", "total"], ["Reagendas", "1", "mes"], ["Pagos", "0", "pendientes"]],
            chartTitle: "Frecuencia mensual",
            bars: [38, 52, 52, 66, 52, 66, 80],
            rows: [["SM", "Sesión individual", "Dra. Sofía Martínez", "mañana"], ["PG", "Pago confirmado", "Tarjeta terminada 0921", "ok"], ["RE", "Recordatorio SMS", "Activado", "on"]],
            captionTitle: "Calendario del paciente",
            captionText: "Agenda simple para reservar, reagendar y recordar sesiones sin fricción.",
            token: "patient.schedule"
          })}
          ${appExample({
            modifier: "is-patient",
            eyebrow: "Paciente",
            title: "Diario emocional",
            button: "Registrar",
            menu: [["HO", "Hoy"], ["DI", "Diario"], ["ES", "Estado"], ["PA", "Patrones"], ["CO", "Compartir"]],
            noteTitle: "Insight semanal",
            note: "El estado mejora cuando se completan tareas de respiración.",
            metrics: [["Ánimo", "7.8", "promedio"], ["Registros", "18", "mes"], ["Patrones", "3", "detectados"], ["Compartido", "5", "con terapeuta"]],
            chartTitle: "Evolución emocional",
            bars: [46, 52, 58, 49, 64, 72, 78],
            rows: [["AN", "Ansiedad baja", "Después de respiración", "nuevo"], ["SU", "Sueño estable", "7 horas promedio", "ok"], ["GR", "Gratitud", "3 notas positivas", "hoy"]],
            captionTitle: "Registro emocional",
            captionText: "Herramienta para seguimiento de ánimo y conversación informada en sesión.",
            token: "patient.journal"
          })}
          ${appExample({
            modifier: "is-patient",
            eyebrow: "Paciente",
            title: "Plan terapéutico",
            button: "Completar tarea",
            menu: [["PL", "Plan"], ["TA", "Tareas"], ["ME", "Metas"], ["RE", "Recursos"], ["AV", "Avance"]],
            noteTitle: "Meta activa",
            note: "Practicar exposición gradual 3 veces esta semana.",
            metrics: [["Avance", "64%", "plan"], ["Tareas", "5", "activas"], ["Recursos", "12", "asignados"], ["Racha", "9d", "constante"]],
            chartTitle: "Cumplimiento de tareas",
            bars: [28, 44, 58, 54, 68, 76, 84],
            rows: [["EX", "Exposición gradual", "2 de 3 completadas", "hoy"], ["RE", "Audio respiración", "Recurso asignado", "nuevo"], ["ME", "Meta semanal", "Revisar en sesión", "vie"]],
            captionTitle: "Plan de tratamiento del paciente",
            captionText: "Cards de tareas y progreso para mantener continuidad entre sesiones.",
            token: "patient.treatment-plan"
          })}
          ${appExample({
            modifier: "is-psychologist",
            eyebrow: "Psicólogo",
            title: "Ficha clínica",
            button: "Nueva nota",
            menu: [["FI", "Ficha"], ["EV", "Evolución"], ["SE", "Sesiones"], ["DO", "Documentos"], ["RI", "Riesgo"]],
            noteTitle: "Resumen clínico",
            note: "Paciente en semana 6, adherencia estable y riesgo bajo.",
            metrics: [["Sesiones", "6", "proceso"], ["Adherencia", "82%", "alta"], ["Riesgo", "Bajo", "actual"], ["Notas", "14", "historial"]],
            chartTitle: "Indicadores clínicos",
            bars: [58, 62, 66, 72, 70, 76, 82],
            rows: [["AG", "Ana García", "Plan TCC activo", "estable"], ["NT", "Nota evolutiva", "Pendiente de firma", "draft"], ["DO", "Consentimiento", "Documento vigente", "ok"]],
            captionTitle: "Ficha del paciente",
            captionText: "Vista clínica con historial, riesgo, documentos y evolución del proceso.",
            token: "psychologist.patient-record"
          })}
          ${appExample({
            modifier: "is-psychologist",
            eyebrow: "Psicólogo",
            title: "Agenda clínica",
            button: "Bloquear horario",
            menu: [["HO", "Horarios"], ["AG", "Agenda"], ["DI", "Disponibilidad"], ["RE", "Reservas"], ["AU", "Ausencias"]],
            noteTitle: "Día productivo",
            note: "7 espacios reservados, 1 bloque administrativo y 2 disponibles.",
            metrics: [["Reservas", "7", "hoy"], ["Disponibles", "2", "slots"], ["Canceladas", "0", "hoy"], ["Ocupación", "78%", "semana"]],
            chartTitle: "Ocupación semanal",
            bars: [72, 88, 78, 84, 68, 42, 28],
            rows: [["10", "10:30 Ana García", "Seguimiento", "online"], ["12", "12:00 Jorge Vera", "Primera sesión", "online"], ["16", "16:00 Bloque admin", "Notas clínicas", "focus"]],
            captionTitle: "Gestión de agenda profesional",
            captionText: "Calendario operativo para controlar disponibilidad, reservas y bloques clínicos.",
            token: "psychologist.schedule"
          })}
          ${appExample({
            modifier: "is-psychologist",
            eyebrow: "Psicólogo",
            title: "Notas de sesión",
            button: "Firmar",
            menu: [["NO", "Notas"], ["PL", "Plantillas"], ["OB", "Objetivos"], ["TA", "Tareas"], ["EX", "Exportar"]],
            noteTitle: "Nota en edición",
            note: "La plantilla SOAP está lista para revisión final.",
            metrics: [["Borradores", "3", "abiertos"], ["Firmadas", "21", "mes"], ["Plantillas", "8", "uso"], ["Tareas", "5", "asignadas"]],
            chartTitle: "Notas completadas",
            bars: [42, 56, 62, 74, 68, 80, 88],
            rows: [["SO", "SOAP ansiedad", "Borrador guardado", "draft"], ["TA", "Tarea asignada", "Respiración 4-7-8", "nuevo"], ["EX", "Exportación PDF", "Lista para descarga", "ok"]],
            captionTitle: "Editor clínico",
            captionText: "Interfaz densa para documentar sesiones, usar plantillas y firmar notas.",
            token: "psychologist.session-notes"
          })}
          ${appExample({
            modifier: "is-psychologist",
            eyebrow: "Psicólogo",
            title: "Biblioteca terapéutica",
            button: "Asignar recurso",
            menu: [["BI", "Biblioteca"], ["GU", "Guías"], ["AU", "Audios"], ["VI", "Videos"], ["FA", "Favoritos"]],
            noteTitle: "Recurso destacado",
            note: "Guía de psicoeducación sobre ansiedad lista para compartir.",
            metrics: [["Recursos", "148", "total"], ["Asignados", "32", "mes"], ["Favoritos", "18", "guardados"], ["Uso", "71%", "pacientes"]],
            chartTitle: "Uso por categoría",
            bars: [80, 64, 52, 70, 46, 58, 62],
            rows: [["AU", "Audio respiración", "Ansiedad aguda", "popular"], ["GU", "Guía TCC", "Reestructuración", "nuevo"], ["VI", "Video sueño", "Higiene del sueño", "top"]],
            captionTitle: "Recursos para terapeutas",
            captionText: "Biblioteca para asignar material psicoeducativo y tareas entre sesiones.",
            token: "psychologist.resources"
          })}
          ${appExample({
            modifier: "is-psychologist",
            eyebrow: "Psicólogo",
            title: "Facturación profesional",
            button: "Emitir recibo",
            menu: [["IN", "Ingresos"], ["FA", "Facturas"], ["PA", "Pagos"], ["CO", "Comisiones"], ["RE", "Reportes"]],
            noteTitle: "Corte semanal",
            note: "Los pagos liquidados estarán disponibles el viernes.",
            metrics: [["Ingresos", "S/ 4.8k", "mes"], ["Pendiente", "S/ 620", "liquidar"], ["Sesiones", "42", "pagadas"], ["Comisión", "12%", "promedio"]],
            chartTitle: "Ingresos por semana",
            bars: [44, 58, 72, 66, 84, 78, 92],
            rows: [["PG", "Pago confirmado", "Ana García", "S/180"], ["RC", "Recibo emitido", "Jorge Vera", "ok"], ["CO", "Corte semanal", "Viernes 18:00", "pend"]],
            captionTitle: "Panel financiero del psicólogo",
            captionText: "Vista profesional para ingresos, recibos, liquidaciones y control de sesiones pagadas.",
            token: "psychologist.billing"
          })}
        </div>
      </div>
    `;
  }

  function renderWebAppsPage() {
    const host = ensureWebAppsHost();

    if (!host.querySelector(".lurems-webapps-page") || host.dataset.version !== WEB_APPS_CONTENT_VERSION) {
      host.innerHTML = webAppsContent();
      host.dataset.version = WEB_APPS_CONTENT_VERSION;
    }
    document.body.classList.add("lurems-webapps-active");
    setWebAppsNavState(true);
    const webAppsButton = document.querySelector("[data-lurems-tab='web-apps']");
    if (webAppsButton && typeof webAppsButton.scrollIntoView === "function") {
      webAppsButton.scrollIntoView({ inline: "end", block: "nearest" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    enhanceUrls();
  }

  function enhance() {
    addWebAppsTab();
    enhanceUrls();
    addBusinessCard();
    addLightPattern();
    if (window.location.hash === "#web-apps" && !document.body.classList.contains("lurems-webapps-active")) {
      renderWebAppsPage();
    }
  }

  const observer = new MutationObserver(enhance);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("load", enhance);
  window.addEventListener("hashchange", () => {
    if (window.location.hash === "#web-apps") {
      renderWebAppsPage();
    } else {
      deactivateWebAppsPage(false);
    }
  });
  document.addEventListener("click", (event) => {
    const button = event.target && event.target.closest ? event.target.closest("button") : null;
    if (button && button.closest("nav") && button.dataset.luremsTab !== "web-apps") {
      deactivateWebAppsPage(true);
    }
    window.setTimeout(enhance, 60);
  }, true);
  enhance();
})();
