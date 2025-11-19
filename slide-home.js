// hero-rotator.js
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  if (!hero) return console.warn("hero img não encontrada");

  const images = [
    "./img/home-slide1.png",
    "./img/home-slide2.png",
    "./img/home-slide3.png"
  ];

  const preloaded = [];
  images.forEach(src => {
    const i = new Image();
    i.src = src;
    preloaded.push(i);
  });

  let current = images.indexOf(hero.src.split('/').pop()) >= 0
    ? images.indexOf("./img/" + hero.src.split('/').pop()) 
    : 0;

  const heroFilename = hero.getAttribute("src").split("/").pop();
  const found = images.findIndex(s => s.endsWith(heroFilename));
  if (found >= 0) current = found;

  const intervalMs = 5000; 

  function nextSlide() {
    hero.style.opacity = 0;

    function onTransitionEnd(e) {
      if (e.propertyName !== "opacity") return;

      hero.removeEventListener("transitionend", onTransitionEnd);

      current = (current + 1) % images.length;
      hero.src = images[current];

      requestAnimationFrame(() => {
        void hero.offsetWidth;
        hero.style.opacity = 1;
      });
    }

    hero.addEventListener("transitionend", onTransitionEnd);
  }

  let timer = setInterval(nextSlide, intervalMs);

  hero.addEventListener("mouseenter", () => clearInterval(timer));
  hero.addEventListener("mouseleave", () => {
    clearInterval(timer);
    timer = setInterval(nextSlide, intervalMs);
  });

  hero.addEventListener("touchstart", () => clearInterval(timer), {passive: true});
  hero.addEventListener("touchend", () => {
    clearInterval(timer);
    timer = setInterval(nextSlide, intervalMs);
  }, {passive: true});
});
