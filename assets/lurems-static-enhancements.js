(function () {
  const BUSINESS_CARD_SRC = "./assets/lurems-business-card-haz-luz.png";
  const MARK_SRC = "./assets/lurems-isotipo-transparent-CGVbIjAh.png";
  const WEB_APPS_TAB_LABEL = "16 — Web Apps";

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
        </div>
      </div>
    `;
  }

  function renderWebAppsPage() {
    const main = document.querySelector("main");
    if (!main) return;

    main.innerHTML = webAppsContent();
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
    if (window.location.hash === "#web-apps" && !document.querySelector(".lurems-webapps-page")) {
      renderWebAppsPage();
    }
  }

  const observer = new MutationObserver(enhance);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("load", enhance);
  document.addEventListener("click", () => window.setTimeout(enhance, 60));
  enhance();
})();
