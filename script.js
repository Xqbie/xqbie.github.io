document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const reveals = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll(".counter");
  const form = document.getElementById("contactForm");
  const year = document.getElementById("year");
  const cursorGlow = document.querySelector(".cursor-glow");

  /* Tahun otomatis */
  year.textContent = new Date().getFullYear();

  /* Navbar saat scroll */
  const handleScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);

    let current = "";
    sections.forEach(section => {
      const top = section.offsetTop - 130;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* Mobile menu */
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuToggle.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove("open");
    }
  });

  /* Scroll reveal */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach(el => revealObserver.observe(el));

  /* Counter animation */
  const animateCounter = (element) => {
    const target = Number(element.dataset.target);
    const duration = 1400;
    const start = performance.now();

    const update = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(counter => counterObserver.observe(counter));

  /* Form -> WhatsApp */
  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const phone = "6281234567890";
    const text =
      `Halo BieTech,%0A%0A` +
      `Nama: ${encodeURIComponent(name)}%0A` +
      `Email: ${encodeURIComponent(email)}%0A` +
      `Subjek: ${encodeURIComponent(subject)}%0A%0A` +
      `${encodeURIComponent(message)}`;

    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    form.reset();
  });

  /* Download CV - ubah href ke file CV Anda */
  document.getElementById("downloadCv").addEventListener("click", e => {
    e.preventDefault();
    alert("Tambahkan file CV Anda, lalu ubah link tombol Download CV di index.html.");
  });

  /* Cursor glow desktop */
  if (window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", e => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  } else {
    cursorGlow.style.display = "none";
  }
});
