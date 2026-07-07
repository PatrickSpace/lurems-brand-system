(function () {
  const BUSINESS_CARD_SRC = "./assets/lurems-business-card-haz-luz.png";

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

  function enhance() {
    enhanceUrls();
    addBusinessCard();
    addLightPattern();
  }

  const observer = new MutationObserver(enhance);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("load", enhance);
  document.addEventListener("click", () => window.setTimeout(enhance, 60));
  enhance();
})();
