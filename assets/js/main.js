document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // --- Medición (Google Tag Manager) ---
  // Envía eventos al dataLayer; GTM los reenvía a GA4.
  window.dataLayer = window.dataLayer || [];

  const hotmartLinks = Array.from(document.querySelectorAll('a[href*="pay.hotmart.com"]'));
  const hotmartPositions = ['video', 'precio', 'cierre'];

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.href;

    if (href.includes('subscribepage.io')) {
      window.dataLayer.push({ event: 'cuadernillo_click' });
    } else if (href.toLowerCase().endsWith('.pdf')) {
      // Descarga de un recurso: el nombre del archivo identifica cuál.
      const archivo = href.split('/').pop().replace(/\.pdf$/i, '');
      window.dataLayer.push({ event: 'recurso_descarga', recurso: archivo });
    } else if (href.includes('pay.hotmart.com')) {
      const i = hotmartLinks.indexOf(link);
      window.dataLayer.push({
        event: 'hotmart_click',
        button_position: hotmartPositions[i] || 'boton_' + (i + 1)
      });
    } else if (href.includes('instagram.com') || href.includes('facebook.com')) {
      window.dataLayer.push({
        event: 'social_click',
        social_network: href.includes('instagram.com') ? 'instagram' : 'facebook'
      });
    }
  });
});
