/**
 * HITHIGH WEB CREATION — MAIN JAVASCRIPT
 * Streamlined, Clean Controller for Navigation, Contact Actions, and vCard
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Company Configuration
  const CONFIG = {
    name: 'HITHIGH WEB CREATION',
    phone: '918639179957',
    displayPhone: '+91 86391 79957',
    email: 'hithighwebcreation@gmail.com',
    tagline: 'YOUR VISION | OUR CODE',
    website: window.location.origin
  };

  // 2. Set dynamic copyright year
  const yrEl = document.getElementById('current-year');
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  // 3. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 4. Mobile Menu Navigation
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });

    // Close when clicking nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      });
    });
  }

  // 5. Active Nav Link on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
      
      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  }, { passive: true });

  // 6. Service Card "Request This" button pre-selects service in inquiry form
  const serviceActionLinks = document.querySelectorAll('.service-action-link');
  const serviceSelect = document.querySelector('select[name="service_type"]');

  serviceActionLinks.forEach(link => {
    link.addEventListener('click', () => {
      const serviceName = link.getAttribute('data-service-name');
      if (serviceName && serviceSelect) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // 7. One-Tap vCard (.vcf) Generator for Saving Contact
  const saveContactBtns = document.querySelectorAll('[data-action="save-vcard"]');
  saveContactBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const vcardData = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Creation;HITHIGH Web;;;',
        'FN:HITHIGH Web Creation',
        'ORG:HITHIGH Web Creation',
        'TITLE:Custom Software & Web Development',
        `TEL;TYPE=CELL,VOICE,PREF:+${CONFIG.phone}`,
        `EMAIL;TYPE=WORK,INTERNET:${CONFIG.email}`,
        `URL:${CONFIG.website}`,
        'NOTE:Your Vision | Our Code. Custom websites, web applications, Android apps, and billing software.',
        'END:VCARD'
      ].join('\r\n');

      const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.setAttribute('download', 'HITHIGH-Web-Creation.vcf');
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(url);
    });
  });

  // 8. Digital Card & QR Code Modal
  const modalBackdrop = document.getElementById('digital-card-modal');
  const openModalBtns = document.querySelectorAll('[data-open-modal="digital-card"]');
  const closeModalBtns = document.querySelectorAll('[data-close-modal]');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalBackdrop) {
        modalBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalBackdrop) {
        modalBackdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // 9. Consultation & Inquiry Form Handling
  const inquiryForm = document.getElementById('project-inquiry-form');
  const formStatus = document.getElementById('form-status-note');
  const waDirectBtn = document.getElementById('send-wa-direct-btn');

  if (inquiryForm) {
    // Quick Send via WhatsApp button
    if (waDirectBtn) {
      waDirectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const f = inquiryForm;
        const name = f.elements['name'] ? f.elements['name'].value.trim() : '';
        const contact = f.elements['contact'] ? f.elements['contact'].value.trim() : '';
        const service = f.elements['service_type'] ? f.elements['service_type'].value : 'General Inquiry';
        const message = f.elements['message'] ? f.elements['message'].value.trim() : '';

        if (!name) {
          if (formStatus) {
            formStatus.className = 'form-status-msg error';
            formStatus.textContent = 'Please provide your name before opening WhatsApp.';
          }
          if (f.elements['name']) f.elements['name'].focus();
          return;
        }

        const msg = `Hi HITHIGH Web Creation! I'd like to consult on a project:\n` +
          `• Name: ${name}\n` +
          `• Contact info: ${contact || 'via WhatsApp'}\n` +
          `• Required Service: ${service}\n` +
          (message ? `• Project Details: ${message}` : '');

        const waUrl = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank', 'noopener');
      });
    }

    // Submit form via mailto
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = inquiryForm;
      const name = f.elements['name'] ? f.elements['name'].value.trim() : '';
      const contact = f.elements['contact'] ? f.elements['contact'].value.trim() : '';
      const service = f.elements['service_type'] ? f.elements['service_type'].value : 'General Inquiry';
      const message = f.elements['message'] ? f.elements['message'].value.trim() : '';

      if (!name || !contact || !message) {
        if (formStatus) {
          formStatus.className = 'form-status-msg error';
          formStatus.textContent = 'Please fill out your name, contact info, and a brief project note.';
        }
        return;
      }

      if (formStatus) {
        formStatus.className = 'form-status-msg';
        formStatus.textContent = 'Preparing your inquiry…';
      }

      // Generate mailto link
      const emailBody = `Name: ${name}\nContact: ${contact}\nService: ${service}\n\nProject Scope & Needs:\n${message}\n\n---\nSent from HITHIGH Web Creation Website`;
      const mailtoUrl = `mailto:${CONFIG.email}?subject=${encodeURIComponent('New Project Inquiry: ' + service + ' from ' + name)}&body=${encodeURIComponent(emailBody)}`;

      // Open mail client
      window.location.href = mailtoUrl;

      setTimeout(() => {
        if (formStatus) {
          formStatus.className = 'form-status-msg success';
          formStatus.textContent = 'Thank you! Your mail application has opened. You can also message us directly on WhatsApp for an immediate response.';
        }
        f.reset();
      }, 600);
    });
  }

  // 10. Direct WhatsApp hero links setup
  const defaultWaHero = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent('Hi HITHIGH Web Creation, I would like to discuss building custom software for my business.')}`;
  document.querySelectorAll('[data-role="wa-direct-link"]').forEach(el => {
    el.href = defaultWaHero;
  });
});
