
document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // 1. PRELOADER
  // =====================================

  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader?.classList.add("hidden");
    }, 500);
  });

  // Защита на случай медленной загрузки
  setTimeout(() => {
    preloader?.classList.add("hidden");
  }, 3000);


  // =====================================
  // 2. MOBILE MENU
  // =====================================

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-links a");

  function closeMenu() {
    menuToggle?.classList.remove("active");
    navLinks?.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("open");

    menuToggle.classList.toggle("active", Boolean(isOpen));
    document.body.classList.toggle("menu-open", Boolean(isOpen));
    menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  navItems.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });


  // =====================================
  // 3. HEADER SCROLL EFFECT
  // =====================================

  const header = document.getElementById("header");

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 40) {
      header.style.background = "rgba(16, 16, 27, 0.94)";
      header.style.backdropFilter = "blur(16px)";
      header.style.borderBottomColor = "rgba(255,255,255,0.12)";
    } else {
      header.style.background = "transparent";
      header.style.backdropFilter = "none";
      header.style.borderBottomColor = "rgba(255,255,255,0.07)";
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();


  // =====================================
  // 4. REVEAL ANIMATIONS
  // =====================================

  const revealElements = document.querySelectorAll(
    ".section-label, .about-heading, .about-content, .about-strip, " +
    ".section-heading, .course-card, .advantage-item, " +
    ".cta-content > h2, .cta-content > p, .contact-form"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }


  // =====================================
  // 5. COURSE BUTTONS
  // =====================================

  const courseButtons = document.querySelectorAll(".course-button");
  const courseSelect = document.getElementById("studentCourse");

  courseButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (courseSelect) {
        const values = [
          "START — 1 месяц",
          "PRO — 3 месяца",
          "EXPERT — 6 месяцев"
        ];

        courseSelect.value = values[index] || "";
      }
    });
  });


  // =====================================
  // 6. WHATSAPP FORM
  // =====================================

  const contactForm = document.getElementById("contactForm");

  // ВАЖНО:
  // Здесь нужно будет указать официальный номер
  // конкретного учебного центра.
  // Пока используется демонстрационный номер.
  const WHATSAPP_NUMBER = "77000000000";

  contactForm?.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const phone = document.getElementById("studentPhone").value.trim();
    const course = document.getElementById("studentCourse").value;

    if (!name || !phone || !course) {
      alert("Пожалуйста, заполни все поля.");
      return;
    }

    if (WHATSAPP_NUMBER === "77000000000") {
      alert(
        "Это демонстрационная версия сайта. " +
        "Для отправки заявок необходимо подключить WhatsApp учебного центра."
      );
      return;
    }

    const message =
      "Здравствуйте! Хочу записаться на обучение.\n\n" +
      "Имя: " + name + "\n" +
      "Телефон: " + phone + "\n" +
      "Программа: " + course;

    const whatsappURL =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });


  // =====================================
  // 7. CURRENT YEAR
  // =====================================

  const yearElement = document.querySelector(".footer-bottom span");

  if (yearElement) {
    yearElement.textContent =
      "© " + new Date().getFullYear() + " UPGRADE. DEMO PROJECT.";
  }


  console.log("UPGRADE website initialized successfully.");

});
