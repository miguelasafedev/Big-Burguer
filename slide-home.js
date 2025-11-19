// hero-rotator.js
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  if (!hero) return console.warn("hero img não encontrada");

  const images = [
    "./img/home-slide1.png",
    "./img/home-slide2.png",
    "./img/home-slide3.png"
    // adicione mais caminhos se quiser
  ];

  // preload (melhora troca sem flash)
  const preloaded = [];
  images.forEach(src => {
    const i = new Image();
    i.src = src;
    preloaded.push(i);
  });

  let current = images.indexOf(hero.src.split('/').pop()) >= 0
    ? images.indexOf("./img/" + hero.src.split('/').pop()) // fallback
    : 0;

  // garantir índice inicial coerente (procura pela parte final do src)
  const heroFilename = hero.getAttribute("src").split("/").pop();
  const found = images.findIndex(s => s.endsWith(heroFilename));
  if (found >= 0) current = found;

  const intervalMs = 5000; // 7 segundos

  // função que troca com fade
  function nextSlide() {
    // fade out
    hero.style.opacity = 0;

    // quando o fade out terminar, trocar src e fazer fade in
    function onTransitionEnd(e) {
      // só reagir à opacity (protege contra outras transições)
      if (e.propertyName !== "opacity") return;

      hero.removeEventListener("transitionend", onTransitionEnd);

      // define próximo índice
      current = (current + 1) % images.length;
      hero.src = images[current];

      // small timeout para garantir que o browser aplique o novo src antes do fade in
      requestAnimationFrame(() => {
        // forçar reflow leve, garantindo transição (às vezes necessário)
        void hero.offsetWidth;
        hero.style.opacity = 1;
      });
    }

    hero.addEventListener("transitionend", onTransitionEnd);
  }

  // iniciar ciclo, mas aguardar o primeiro intervalo (preserva imagem inicial)
  let timer = setInterval(nextSlide, intervalMs);

  // opcional: pausar quando usuário passa o mouse / toca (melhora UX)
  hero.addEventListener("mouseenter", () => clearInterval(timer));
  hero.addEventListener("mouseleave", () => {
    clearInterval(timer);
    timer = setInterval(nextSlide, intervalMs);
  });
  // mobile: pause on touchstart
  hero.addEventListener("touchstart", () => clearInterval(timer), {passive: true});
  hero.addEventListener("touchend", () => {
    clearInterval(timer);
    timer = setInterval(nextSlide, intervalMs);
  }, {passive: true});
});
