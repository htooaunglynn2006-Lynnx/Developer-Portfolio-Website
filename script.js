/* =============================================
   HTOO AUNG LYNN — PORTFOLIO SCRIPTS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAVBAR SCROLL ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- HAMBURGER ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- ACTIVE NAV LINK ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link[href^="#"]');
  if (sections.length && navItems.length) {
    const highlightNav = () => {
      const scrollY = window.scrollY + 120;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          navItems.forEach(a => a.classList.remove('active'));
          const match = document.querySelector(`.nav-link[href="#${id}"]`);
          if (match) match.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
  }

  /* ---------- SCROLL REVEAL ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  }

  /* ---------- TYPING ANIMATION ---------- */
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    const words = ['modern websites.', 'clean UIs.', 'responsive designs.', 'digital experiences.'];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const word = words[wordIndex];
      if (!deleting) {
        typedEl.textContent = word.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === word.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
        setTimeout(type, 85);
      } else {
        typedEl.textContent = word.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 45);
      }
    };
    setTimeout(type, 800);
  }

  /* ---------- STAT COUNTER ---------- */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          let current = 0;
          const increment = Math.max(1, Math.ceil(target / 30));
          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = target + '+';
              clearInterval(counter);
            } else {
              el.textContent = current;
            }
          }, 60);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => counterObserver.observe(el));
  }

  /* ---------- CONTACT FORM ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    const submitBtn = document.getElementById('submitBtn');
    const toast = document.getElementById('toast');

    const validate = () => {
      let valid = true;

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');

      // Name
      if (!name.value.trim()) {
        name.classList.add('error');
        document.getElementById('nameError').textContent = 'Please enter your name';
        valid = false;
      } else {
        name.classList.remove('error');
        document.getElementById('nameError').textContent = '';
      }

      // Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.classList.add('error');
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        valid = false;
      } else {
        email.classList.remove('error');
        document.getElementById('emailError').textContent = '';
      }

      // Subject
      if (!subject.value.trim()) {
        subject.classList.add('error');
        document.getElementById('subjectError').textContent = 'Please enter a subject';
        valid = false;
      } else {
        subject.classList.remove('error');
        document.getElementById('subjectError').textContent = '';
      }

      // Message
      if (!message.value.trim()) {
        message.classList.add('error');
        document.getElementById('messageError').textContent = 'Please enter a message';
        valid = false;
      } else {
        message.classList.remove('error');
        document.getElementById('messageError').textContent = '';
      }

      return valid;
    };

    // Remove error on input
    form.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('input', () => {
        el.classList.remove('error');
        const errId = el.id + 'Error';
        const errEl = document.getElementById(errId);
        if (errEl) errEl.textContent = '';
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;

      // Simulate sending
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');

        // Show toast
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4000);
        }

        // Reset after delay
        setTimeout(() => {
          submitBtn.classList.remove('success');
          submitBtn.disabled = false;
          form.reset();
        }, 2500);
      }, 1500);
    });
  }

  /* ---------- FLOATING PARTICLES (subtle) ---------- */
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    for (let i = 0; i < 30; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position:absolute;
        width:${Math.random() * 3 + 1}px;
        height:${Math.random() * 3 + 1}px;
        background:rgba(56,189,248,${Math.random() * .15 + .04});
        border-radius:50%;
        top:${Math.random() * 100}%;
        left:${Math.random() * 100}%;
        animation: float ${Math.random() * 6 + 4}s ease-in-out ${Math.random() * 4}s infinite alternate;
      `;
      particleContainer.appendChild(dot);
    }
  }

});