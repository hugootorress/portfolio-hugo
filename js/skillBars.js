export function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');

  skillBars.forEach((bar) => {
    const originalWidth = bar.style.width;
    bar.style.width = '0';

    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              bar.style.width = originalWidth;
            }, 300);
          }
        });
      },
      { threshold: 0.5 }
    );

    barObserver.observe(bar);
  });
}
