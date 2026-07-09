(function () {
  const BUSINESS_CARD_SRC = "./assets/lurems-business-card-haz-luz.png";
  const MARK_SRC = "./assets/lurems-isotipo-transparent-CGVbIjAh.png";
  const WEB_APPS_TAB_LABEL = "16 — Web Apps";
  const WEB_APPS_CONTENT_VERSION = "20260709-webapps-varied-2";

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

  function actionButton(label, active) {
    return `<button class="${active ? "lurems-primary-button" : "lurems-soft-button"}" type="button">${label}</button>`;
  }

  function tag(label) {
    return `<span class="lurems-chip">${label}</span>`;
  }

  function field(label, value, type) {
    return `
      <label class="lurems-form-field ${type || ""}">
        <span>${label}</span>
        <strong>${value}</strong>
      </label>
    `;
  }

  function mockShell({ modifier, eyebrow, title, button, menu, noteTitle, note, body, captionTitle, captionText, token, canvasClass }) {
    return `
      <section class="lurems-app-example lurems-variant-mockup ${modifier || ""}" data-case="${token}">
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
            <div class="lurems-variant-canvas ${canvasClass || ""}">
              ${body}
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

  function variedWebAppsContent() {
    return `
      <div class="lurems-webapps-page">
        <header class="lurems-webapps-header">
          <div class="lurems-webapps-number">16</div>
          <div>
            <h1>Web Apps</h1>
            <p>Variantes de interfaces para Lurems: perfiles, agendas, modales, pagos, diarios emocionales y flujos clínicos con componentes distintos.</p>
          </div>
        </header>
        <div class="lurems-webapps-grid">
          ${mockShell({
            modifier: "is-patient",
            eyebrow: "Paciente",
            title: "Perfil de acompañamiento",
            button: "Guardar cambios",
            menu: [["PR", "Perfil"], ["CO", "Contacto"], ["PV", "Privacidad"], ["SE", "Sesiones"], ["AY", "Ayuda"]],
            noteTitle: "Perfil verificado",
            note: "Los datos sensibles se editan con confirmación antes de compartirse.",
            canvasClass: "profile-layout",
            body: `
              <div class="lurems-profile-hero">
                <div class="lurems-profile-avatar">MP</div>
                <div>
                  <span>Cuenta paciente</span>
                  <h3>Mariana Paredes</h3>
                  <p>Busca apoyo para ansiedad, sueño y adaptación a cambios laborales.</p>
                  <div class="lurems-chip-row">${tag("Terapia online")}${tag("TCC")}${tag("Tardes")}</div>
                </div>
              </div>
              <div class="lurems-form-grid">
                ${field("Nombre visible", "Mariana Paredes")}
                ${field("Correo", "mariana@lurems.lat")}
                ${field("Zona horaria", "Lima, GMT-5")}
                ${field("Contacto de emergencia", "Pendiente", "is-warning")}
              </div>
              <div class="lurems-privacy-panel">
                <strong>Control de privacidad</strong>
                <p>El paciente decide qué datos comparte con su psicólogo antes del primer encuentro.</p>
                <div class="lurems-toggle-row"><span>Compartir diario emocional</span><i></i></div>
                <div class="lurems-toggle-row is-off"><span>Compartir historial de pagos</span><i></i></div>
              </div>
            `,
            captionTitle: "Perfil de usuario",
            captionText: "Pantalla de identidad y preferencias con formularios, chips y controles de privacidad.",
            token: "patient.profile"
          })}
          ${mockShell({
            modifier: "is-psychologist",
            eyebrow: "Psicólogo",
            title: "Agenda clínica diaria",
            button: "Bloquear hora",
            menu: [["AG", "Agenda"], ["PA", "Pacientes"], ["NT", "Notas"], ["DI", "Disponibilidad"], ["RE", "Reportes"]],
            noteTitle: "Carga del día",
            note: "5 sesiones, 1 primera entrevista y 2 espacios administrativos.",
            canvasClass: "agenda-layout",
            body: `
              <div class="lurems-calendar-strip">
                <button>Lun<br><strong>06</strong></button><button class="is-selected">Mar<br><strong>07</strong></button><button>Mié<br><strong>08</strong></button><button>Jue<br><strong>09</strong></button><button>Vie<br><strong>10</strong></button>
              </div>
              <div class="lurems-agenda-board">
                <div class="lurems-time-rail"><span>09:00</span><span>10:00</span><span>11:00</span><span>12:00</span><span>13:00</span><span>14:00</span></div>
                <div class="lurems-agenda-column">
                  <div class="lurems-session-block is-purple" style="grid-row: 1 / span 2;"><strong>Ana García</strong><span>Seguimiento TCC · online</span></div>
                  <div class="lurems-session-block is-soft" style="grid-row: 3 / span 1;"><strong>Bloque administrativo</strong><span>Notas y firma clínica</span></div>
                  <div class="lurems-session-block is-purple" style="grid-row: 5 / span 2;"><strong>Jorge Vera</strong><span>Primera sesión · 60 min</span></div>
                </div>
                <aside class="lurems-agenda-summary">
                  <strong>Disponibilidad</strong>
                  <span>2 slots libres</span>
                  <div class="lurems-ring-progress"><b>78%</b></div>
                </aside>
              </div>
            `,
            captionTitle: "Agenda profesional",
            captionText: "Calendario por horas, bloques de sesión y resumen de disponibilidad para psicólogos.",
            token: "psychologist.agenda"
          })}
          ${mockShell({
            modifier: "is-ops",
            eyebrow: "Operaciones",
            title: "Cola de matching",
            button: "Asignar match",
            menu: [["MT", "Matching"], ["SE", "Señales"], ["QA", "Calidad"], ["AL", "Alertas"], ["SO", "Soporte"]],
            noteTitle: "Regla activa",
            note: "Priorizar especialidad, horario compatible y continuidad terapéutica.",
            canvasClass: "kanban-layout",
            body: `
              <div class="lurems-kanban-column">
                <h3>Nuevos</h3>
                <article><strong>Ansiedad social</strong><span>Paciente · tardes · online</span><b>92% match</b></article>
                <article><strong>Duelo reciente</strong><span>Paciente · fines de semana</span><b>84% match</b></article>
              </div>
              <div class="lurems-kanban-column">
                <h3>En revisión</h3>
                <article><strong>Estrés laboral</strong><span>Validar idioma y disponibilidad</span><b>3 opciones</b></article>
                <article><strong>Autoestima</strong><span>Psicóloga sugerida: Sofía M.</span><b>alta</b></article>
              </div>
              <div class="lurems-kanban-column">
                <h3>Confirmados</h3>
                <article><strong>Primera cita</strong><span>Viernes 18:00 · notificado</span><b>ok</b></article>
                <article><strong>Cambio de terapeuta</strong><span>Motivo: horario</span><b>cerrado</b></article>
              </div>
            `,
            captionTitle: "Panel operativo",
            captionText: "Kanban interno para colas de matching, reglas clínicas y resolución de casos.",
            token: "ops.matching"
          })}
          ${mockShell({
            modifier: "is-patient",
            eyebrow: "Paciente",
            title: "Actualizar motivo de consulta",
            button: "Abrir modal",
            menu: [["FO", "Formulario"], ["MO", "Motivos"], ["SI", "Síntomas"], ["PR", "Preferencias"], ["RE", "Resumen"]],
            noteTitle: "Edición segura",
            note: "El modal confirma cambios antes de actualizar el expediente del paciente.",
            canvasClass: "modal-layout",
            body: `
              <div class="lurems-page-underlay">
                <div class="lurems-question-row"><span>1</span><strong>¿Qué te trae a Lurems?</strong><small>Ansiedad, sueño, estrés</small></div>
                <div class="lurems-question-row"><span>2</span><strong>¿Qué esperas lograr?</strong><small>Mejorar hábitos y claridad</small></div>
                <div class="lurems-question-row"><span>3</span><strong>Preferencia de terapeuta</strong><small>Experiencia en TCC</small></div>
              </div>
              <div class="lurems-modal-card">
                <button type="button">x</button>
                <strong>Actualizar formulario</strong>
                <p>Indica si el motivo principal cambió para recalibrar tu match terapéutico.</p>
                ${field("Motivo principal", "Ansiedad y sueño")}
                <div class="lurems-range-field"><span>Intensidad esta semana</span><b>7/10</b><i style="width:70%"></i></div>
                <div class="lurems-modal-actions">${actionButton("Cancelar", false)}${actionButton("Actualizar", true)}</div>
              </div>
            `,
            captionTitle: "Modal de actualización",
            captionText: "Formulario emergente sobre una página existente para actualizar señales clínicas.",
            token: "patient.form-modal"
          })}
          ${mockShell({
            modifier: "is-patient",
            eyebrow: "Paciente",
            title: "Explorar psicólogos",
            button: "Ver perfil",
            menu: [["EX", "Explorar"], ["FI", "Filtros"], ["FA", "Favoritos"], ["CO", "Comparar"], ["AG", "Agendar"]],
            noteTitle: "Match sugerido",
            note: "3 profesionales recomendados según necesidad y disponibilidad.",
            canvasClass: "marketplace-layout",
            body: `
              <div class="lurems-filter-bar">${tag("Ansiedad")}${tag("Online")}${tag("Tardes")}${tag("TCC")}<button>Más filtros</button></div>
              <div class="lurems-therapist-grid">
                <article class="is-featured"><div class="lurems-profile-avatar">SM</div><strong>Sofía Martínez</strong><span>Ansiedad · autoestima</span><div class="lurems-score">94%</div><p>Disponible jueves 18:00</p></article>
                <article><div class="lurems-profile-avatar">JV</div><strong>Javier Vega</strong><span>Estrés laboral</span><div class="lurems-score">89%</div><p>Disponible viernes 09:30</p></article>
                <article><div class="lurems-profile-avatar">LC</div><strong>Lucía Campos</strong><span>Duelo y cambios</span><div class="lurems-score">86%</div><p>Disponible sábado 11:00</p></article>
              </div>
              <div class="lurems-compare-tray"><strong>Comparar favoritos</strong><span>Sofía M. vs Javier V.</span><button>Comparar</button></div>
            `,
            captionTitle: "Marketplace de psicólogos",
            captionText: "Exploración con filtros, cards de especialistas, match score y bandeja de comparación.",
            token: "patient.marketplace"
          })}
          ${mockShell({
            modifier: "is-patient",
            eyebrow: "Paciente",
            title: "Reagendar una cita",
            button: "Confirmar",
            menu: [["CA", "Calendario"], ["SE", "Sesiones"], ["PA", "Pagos"], ["RE", "Recordatorios"], ["HI", "Historial"]],
            noteTitle: "Recordatorio",
            note: "Próxima sesión mañana a las 18:30.",
            canvasClass: "reschedule-layout",
            body: `
              <div class="lurems-reschedule-current"><span>Cita actual</span><strong>Miércoles 10 · 18:30</strong><p>Dra. Sofía Martínez · videollamada</p></div>
              <div class="lurems-slot-picker">
                <h3>Elige nuevo horario</h3>
                <button>Jue 11 · 17:00</button><button class="is-selected">Jue 11 · 19:00</button><button>Vie 12 · 08:30</button><button>Sáb 13 · 11:00</button>
              </div>
              <div class="lurems-confirm-panel">
                <strong>Resumen</strong>
                <div><span>Nueva fecha</span><b>Jue 11, 19:00</b></div>
                <div><span>Política</span><b>Sin penalidad</b></div>
                <div><span>Recordatorio</span><b>1 hora antes</b></div>
              </div>
            `,
            captionTitle: "Flujo de reagenda",
            captionText: "Selector de horarios, cita actual y panel de confirmación para cambiar una sesión.",
            token: "patient.reschedule"
          })}
          ${mockShell({
            modifier: "is-patient",
            eyebrow: "Paciente",
            title: "Diario emocional",
            button: "Registrar",
            menu: [["HO", "Hoy"], ["DI", "Diario"], ["ES", "Estado"], ["PA", "Patrones"], ["CO", "Compartir"]],
            noteTitle: "Insight semanal",
            note: "El estado mejora cuando se completan tareas de respiración.",
            canvasClass: "journal-layout",
            body: `
              <div class="lurems-mood-selector"><button>Calma</button><button class="is-selected">Ansiedad</button><button>Energía</button><button>Sueño</button></div>
              <div class="lurems-journal-editor">
                <span>Entrada de hoy</span>
                <p>Me sentí más tranquilo después de caminar y hacer el ejercicio de respiración. Quiero hablar de la llamada del trabajo.</p>
              </div>
              <div class="lurems-mood-map">
                <strong>Mapa emocional</strong>
                <div>${["L", "M", "M", "J", "V", "S", "D"].map((day, index) => `<i style="height:${[42, 58, 36, 74, 66, 48, 82][index]}%">${day}</i>`).join("")}</div>
              </div>
            `,
            captionTitle: "Registro emocional",
            captionText: "Diario con selector de estado, editor narrativo y visualización de patrones semanales.",
            token: "patient.journal"
          })}
          ${mockShell({
            modifier: "is-patient",
            eyebrow: "Paciente",
            title: "Página de pagos",
            button: "Pagar sesión",
            menu: [["PA", "Pagos"], ["TA", "Tarjetas"], ["RE", "Recibos"], ["BO", "Bonos"], ["AY", "Ayuda"]],
            noteTitle: "Pago pendiente",
            note: "La sesión del jueves queda reservada al confirmar el pago.",
            canvasClass: "payment-layout",
            body: `
              <div class="lurems-payment-card"><span>Saldo a pagar</span><strong>S/ 180.00</strong><p>Sesión individual · 50 minutos</p>${actionButton("Usar tarjeta guardada", true)}</div>
              <div class="lurems-card-preview"><span>VISA</span><strong>•••• 0921</strong><small>Mariana Paredes</small></div>
              <div class="lurems-invoice-list">
                <div><span>Sesión</span><b>S/ 180.00</b></div>
                <div><span>Descuento Lurems</span><b>- S/ 20.00</b></div>
                <div><span>Total</span><b>S/ 160.00</b></div>
              </div>
            `,
            captionTitle: "Checkout del paciente",
            captionText: "Pantalla financiera con tarjeta, desglose de cobro y acción principal de pago.",
            token: "patient.payments"
          })}
          ${mockShell({
            modifier: "is-psychologist",
            eyebrow: "Psicólogo",
            title: "Ficha clínica",
            button: "Nueva nota",
            menu: [["FI", "Ficha"], ["EV", "Evolución"], ["SE", "Sesiones"], ["DO", "Documentos"], ["RI", "Riesgo"]],
            noteTitle: "Resumen clínico",
            note: "Paciente en semana 6, adherencia estable y riesgo bajo.",
            canvasClass: "clinical-layout",
            body: `
              <div class="lurems-clinical-summary">
                <div class="lurems-profile-avatar">AG</div><div><strong>Ana García</strong><span>Semana 6 · TCC · riesgo bajo</span></div>
              </div>
              <div class="lurems-clinical-tabs"><button class="is-selected">Evolución</button><button>Riesgo</button><button>Documentos</button></div>
              <div class="lurems-clinical-grid">
                <article><span>Objetivo activo</span><strong>Exposición gradual</strong><p>2 tareas completadas esta semana.</p></article>
                <article><span>Indicadores</span><strong>Adherencia 82%</strong><p>Asiste y registra diario con constancia.</p></article>
                <article><span>Alertas</span><strong>Sin señales críticas</strong><p>Revisar sueño y ansiedad anticipatoria.</p></article>
              </div>
            `,
            captionTitle: "Ficha del paciente",
            captionText: "Resumen clínico con tabs, estado del caso y tarjetas de evolución para terapeutas.",
            token: "psychologist.patient-record"
          })}
          ${mockShell({
            modifier: "is-psychologist",
            eyebrow: "Psicólogo",
            title: "Panel de videollamada",
            button: "Iniciar sesión",
            menu: [["VI", "Video"], ["CH", "Chat"], ["NO", "Notas"], ["RE", "Recursos"], ["SE", "Sesión"]],
            noteTitle: "Sala lista",
            note: "El paciente recibirá un recordatorio 10 minutos antes.",
            canvasClass: "session-room-layout",
            body: `
              <div class="lurems-video-room"><div class="lurems-video-person">Paciente</div><div class="lurems-video-person is-small">Psicólogo</div><div class="lurems-video-controls"><button>Mic</button><button>Cam</button><button>Salir</button></div></div>
              <aside class="lurems-session-notepad"><strong>Notas privadas</strong><p>Explorar ansiedad anticipatoria antes de reuniones. Preguntar por sueño.</p><span>Plantilla: TCC breve</span></aside>
            `,
            captionTitle: "Sala de sesión",
            captionText: "Contexto de videollamada con controles, ventana secundaria y notas privadas.",
            token: "psychologist.video-session"
          })}
          ${mockShell({
            modifier: "is-psychologist",
            eyebrow: "Psicólogo",
            title: "Notas de sesión",
            button: "Firmar",
            menu: [["NO", "Notas"], ["PL", "Plantillas"], ["OB", "Objetivos"], ["TA", "Tareas"], ["EX", "Exportar"]],
            noteTitle: "Nota en edición",
            note: "La plantilla SOAP está lista para revisión final.",
            canvasClass: "notes-layout",
            body: `
              <div class="lurems-note-editor">
                <div class="lurems-editor-toolbar"><button>B</button><button>I</button><button>Lista</button><button>Plantilla SOAP</button></div>
                <h3>Nota evolutiva · Ana García</h3>
                <p><strong>S:</strong> Reporta ansiedad moderada antes de exposición laboral.</p>
                <p><strong>O:</strong> Afecto congruente, participa en ejercicios.</p>
                <p><strong>P:</strong> Repetir respiración y registrar pensamientos automáticos.</p>
              </div>
              <div class="lurems-task-sidebar"><strong>Tareas asignadas</strong><label><input checked type="checkbox"> Diario 3 días</label><label><input type="checkbox"> Audio respiración</label><label><input checked type="checkbox"> Exposición gradual</label></div>
            `,
            captionTitle: "Editor clínico",
            captionText: "Editor tipo documento con toolbar, plantilla clínica y checklist de tareas.",
            token: "psychologist.session-notes"
          })}
          ${mockShell({
            modifier: "is-psychologist",
            eyebrow: "Psicólogo",
            title: "Biblioteca terapéutica",
            button: "Asignar recurso",
            menu: [["BI", "Biblioteca"], ["GU", "Guías"], ["AU", "Audios"], ["VI", "Videos"], ["FA", "Favoritos"]],
            noteTitle: "Recurso destacado",
            note: "Guía de psicoeducación sobre ansiedad lista para compartir.",
            canvasClass: "library-layout",
            body: `
              <div class="lurems-resource-search"><span>Buscar recursos</span><b>ansiedad, sueño, respiración</b></div>
              <div class="lurems-resource-grid">
                <article><i>Audio</i><strong>Respiración 4-7-8</strong><span>8 min · ansiedad aguda</span></article>
                <article><i>Guía</i><strong>Pensamientos automáticos</strong><span>PDF · TCC</span></article>
                <article><i>Video</i><strong>Higiene del sueño</strong><span>12 min · hábitos</span></article>
                <article><i>Ficha</i><strong>Escala de progreso</strong><span>Formulario · semanal</span></article>
              </div>
              <div class="lurems-assignment-bar"><strong>Asignar a</strong><span>Ana García</span><button>Enviar</button></div>
            `,
            captionTitle: "Recursos para terapeutas",
            captionText: "Biblioteca con buscador, tipos de contenido y barra de asignación a pacientes.",
            token: "psychologist.resources"
          })}
          ${mockShell({
            modifier: "is-psychologist",
            eyebrow: "Psicólogo",
            title: "Facturación profesional",
            button: "Emitir recibo",
            menu: [["IN", "Ingresos"], ["FA", "Facturas"], ["PA", "Pagos"], ["CO", "Comisiones"], ["RE", "Reportes"]],
            noteTitle: "Corte semanal",
            note: "Los pagos liquidados estarán disponibles el viernes.",
            canvasClass: "billing-layout",
            body: `
              <div class="lurems-billing-total"><span>Ingresos del mes</span><strong>S/ 4,820</strong><small>+18% vs mes anterior</small></div>
              <div class="lurems-payout-table">
                <div><b>Paciente</b><b>Estado</b><b>Monto</b></div>
                <div><span>Ana García</span><em>Pagado</em><strong>S/180</strong></div>
                <div><span>Jorge Vera</span><em>Pendiente</em><strong>S/180</strong></div>
                <div><span>Lucía Campos</span><em>Liquidado</em><strong>S/220</strong></div>
              </div>
              <div class="lurems-tax-card"><strong>Recibos por emitir</strong><span>3 comprobantes listos</span><button>Emitir lote</button></div>
            `,
            captionTitle: "Panel financiero del psicólogo",
            captionText: "Facturación con resumen, tabla de pagos y acciones para recibos profesionales.",
            token: "psychologist.billing"
          })}
        </div>
      </div>
    `;
  }

  function renderWebAppsPage() {
    const host = ensureWebAppsHost();

    if (!host.querySelector(".lurems-webapps-page") || host.dataset.version !== WEB_APPS_CONTENT_VERSION) {
      host.innerHTML = variedWebAppsContent();
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
    if (window.location.hash === "#web-apps") {
      if (!document.body.classList.contains("lurems-webapps-active")) {
        renderWebAppsPage();
      } else {
        setWebAppsNavState(true);
      }
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
