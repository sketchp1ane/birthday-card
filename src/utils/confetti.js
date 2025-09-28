const defaultOptions = {
  count: 60,
  duration: 1400,
};

export function fireConfetti(options = {}) {
  const { count, duration } = { ...defaultOptions, ...options };
  const root = document.body;
  const frag = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.className = "confetti-dot fixed top-0 z-[60]";
    const x = Math.random() * 100;
    const size = 4 + Math.random() * 6;

    particle.style.left = `${x}vw`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.setProperty("--tx", `${Math.random() * 40 - 20}px`);
    particle.style.setProperty("--delay", `${Math.random() * 200}ms`);
    particle.style.setProperty("--dur", `${duration + Math.random() * 600}ms`);
    particle.style.background = `hsl(${Math.floor(210 + Math.random() * 90)}, 80%, ${60 + Math.random() * 20}%)`;

    frag.appendChild(particle);
  }

  root.appendChild(frag);

  window.setTimeout(() => {
    document.querySelectorAll('.confetti-dot').forEach(node => node.remove());
  }, duration + 1200);
}
