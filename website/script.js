document.addEventListener('DOMContentLoaded', function () {

  // ---- LEAD FORM ----
  const leadForm = document.getElementById('leadForm');
  const formSuccess = document.getElementById('formSuccess');
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = {
        name:          leadForm.querySelector('[name="name"]').value,
        phone:         leadForm.querySelector('[name="phone"]').value,
        address:       leadForm.querySelector('[name="address"]')?.value || '',
        damage_type:   leadForm.querySelector('[name="damage_type"]')?.value || '',
        when_started:  leadForm.querySelector('[name="when_started"]')?.value || '',
        water_present: leadForm.querySelector('[name="water_present"]')?.value || '',
        callback_time: leadForm.querySelector('[name="callback_time"]')?.value || '',
        timestamp:     new Date().toISOString(),
        source:        window.location.pathname,
        referrer:      document.referrer || 'direct'
      };
      console.log('🚨 NEW LEAD:', formData);
      // TODO: Replace with your Google Sheets webhook URL:
      // fetch('YOUR_APPS_SCRIPT_URL', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(formData) });
      leadForm.style.display = 'none';
      if (formSuccess) formSuccess.classList.remove('hidden');
      if (typeof gtag !== 'undefined') gtag('event', 'form_lead', { event_category: 'lead', event_label: formData.damage_type });
    });
  }

  // ---- PHONE CLICK TRACKING ----
  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      console.log('📞 Call click:', this.getAttribute('href'));
      if (typeof gtag !== 'undefined') gtag('event', 'phone_call_click', { event_category: 'lead' });
    });
  });

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ---- SCROLL REVEAL ----
  if ('IntersectionObserver' in window) {
    const els = document.querySelectorAll('.service-card, .process-step, .tl-item');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      obs.observe(el);
    });
  }

});
