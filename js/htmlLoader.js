export async function loadPartials(partials = []) {
  if (!partials || partials.length === 0) {
    const nodes = document.querySelectorAll('[data-partial]');
    nodes.forEach(n => partials.push(n.getAttribute('data-partial')));
  }

  const promises = partials.map(async (name) => {
    try {
      const res = await fetch(`partials/${name}.html`);
      if (!res.ok) throw new Error(`No se pudo cargar partial: ${name}`);
      const html = await res.text();
      const container = document.querySelector(`[data-partial="${name}"]`);
      if (container) container.innerHTML = html;
    } catch (err) {
      console.error(err);
    }
  });

  await Promise.all(promises);
}
