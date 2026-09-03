/*
 * La Villa de Sevirol
 * Edita los datos públicos y las rutas de imagen únicamente en este objeto.
 * Datos de contacto y horario contrastados con la web oficial el 04/09/2026.
 */
const restaurantData = {
  name: "La Villa de Sevirol",
  legalName: "Restaurante La Villa de Sevirol",
  city: "Sevilla",
  address: ["Calle Enramadilla 1, Local 9", "41018 Sevilla, España"],
  phone: {
    display: "635 95 75 53",
    href: "tel:+34635957553"
  },
  hours: [
    { days: "Lunes a jueves", time: "8:00-00:00" },
    { days: "Viernes", time: "8:00-01:00" },
    { days: "Sábado", time: "9:00-01:00" },
    { days: "Domingo", time: "9:00-00:00" }
  ],
  service: "Cocina ininterrumpida",
  instagram: "https://www.instagram.com/restaurantelavilladesevirol/",
  menuUrl: "https://www.numier.com/carta-digital/carta/abaceriaelaprisco",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Calle+Enramadilla+1+Local+9+Sevilla",
  canonicalUrl: "https://www.lavilladesevirol.com/",
  legalUrl: "",
  privacyUrl: "",
  assets: {
    hero: "img/hero-la-villa-sevirol.jpg",
    interior: "img/interior-salon-01.jpg",
    breakfast: "img/desayuno-01.jpg",
    lunch: "img/almuerzo-01.jpg",
    dinner: "img/cena-01.jpg",
    dishOne: "img/plato-01.jpg",
    dishTwo: "img/plato-02.jpg",
    dishThree: "img/plato-03.jpg",
    instagramOne: "img/instagram-01.jpg",
    instagramTwo: "img/instagram-02.jpg",
    instagramThree: "img/instagram-03.jpg"
  }
};

const select = (selector, scope = document) => scope.querySelector(selector);
const selectAll = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function replaceAddress(node) {
  const parts = restaurantData.address;
  node.replaceChildren();
  parts.forEach((part, index) => {
    if (index > 0) node.append(document.createElement("br"));
    node.append(document.createTextNode(part));
  });
}

function setConfiguredLink(selector, url, options = {}) {
  selectAll(selector).forEach((link) => {
    if (!url || url.includes("PENDIENTE")) {
      link.setAttribute("aria-disabled", "true");
      link.setAttribute("title", "Enlace pendiente de confirmar");
      link.addEventListener("click", (event) => event.preventDefault());
      return;
    }

    link.href = url;
    link.removeAttribute("aria-disabled");
    link.removeAttribute("title");

    if (options.external) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
  });
}

function applyRestaurantData() {
  selectAll("[data-address]").forEach(replaceAddress);

  selectAll("[data-phone-link]").forEach((link) => {
    link.href = restaurantData.phone.href;
  });

  selectAll("[data-phone-text]").forEach((node) => {
    node.textContent = restaurantData.phone.display;
  });

  selectAll("[data-service]").forEach((node) => {
    node.textContent = restaurantData.service;
  });

  selectAll("[data-hours]").forEach((container) => {
    container.replaceChildren(
      ...restaurantData.hours.map(({ days, time }) => {
        const row = document.createElement("div");
        const day = document.createElement("span");
        const hours = document.createElement("span");
        row.className = "hours-row";
        day.textContent = days;
        hours.textContent = time;
        row.append(day, hours);
        return row;
      })
    );
  });

  setConfiguredLink("[data-menu-link]", restaurantData.menuUrl, { external: true });
  setConfiguredLink("[data-instagram-link]", restaurantData.instagram, { external: true });
  setConfiguredLink("[data-maps-link]", restaurantData.mapsUrl, { external: true });
  setConfiguredLink("[data-legal-link]", restaurantData.legalUrl);
  setConfiguredLink("[data-privacy-link]", restaurantData.privacyUrl);

  selectAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

function applyStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurantData.legalName,
    url: restaurantData.canonicalUrl,
    telephone: "+34 635 95 75 53",
    servesCuisine: ["Española", "Mediterránea"],
    hasMenu: restaurantData.menuUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Enramadilla 1, Local 9",
      addressLocality: restaurantData.city,
      postalCode: "41018",
      addressCountry: "ES"
    },
    sameAs: [restaurantData.instagram],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "00:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "08:00",
        closes: "01:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "01:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "00:00"
      }
    ]
  };

  const schemaNode = select("#restaurant-schema");
  if (schemaNode) schemaNode.textContent = JSON.stringify(schema);
}

function initMediaSlots() {
  selectAll("img[data-asset]").forEach((image) => {
    const slot = image.closest("[data-media-slot]");
    const assetPath = restaurantData.assets[image.dataset.asset];

    if (!slot || !assetPath) return;

    slot.classList.add("is-loading");
    slot.setAttribute("aria-busy", "true");

    const markLoaded = () => {
      slot.classList.remove("is-loading", "is-missing");
      slot.classList.add("is-loaded");
      slot.setAttribute("aria-busy", "false");
    };

    const markMissing = () => {
      slot.classList.remove("is-loading", "is-loaded");
      slot.classList.add("is-missing");
      slot.setAttribute("aria-busy", "false");
      image.hidden = true;
    };

    image.addEventListener("load", markLoaded, { once: true });
    image.addEventListener("error", markMissing, { once: true });
    image.src = assetPath;

    if (image.complete) {
      if (image.naturalWidth > 0) markLoaded();
      else markMissing();
    }
  });
}

function initHeader() {
  const header = select("[data-header]");
  const sentinel = select("#header-sentinel");
  if (!header || !sentinel) return;

  if (!("IntersectionObserver" in window)) {
    header.classList.add("is-scrolled");
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle("is-scrolled", !entry.isIntersecting),
    { rootMargin: "0px", threshold: 0 }
  );
  observer.observe(sentinel);
}

function initMobileMenu() {
  const header = select("[data-header]");
  const toggle = select(".menu-toggle");
  const menu = select("#primary-menu");
  if (!header || !toggle || !menu) return;

  let previousFocus = null;

  const closeMenu = ({ restoreFocus = false } = {}) => {
    menu.classList.remove("is-open");
    header.classList.remove("is-menu-open");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    if (restoreFocus && previousFocus) previousFocus.focus();
  };

  const openMenu = () => {
    previousFocus = document.activeElement;
    menu.classList.add("is-open");
    header.classList.add("is-menu-open");
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar menú");
    select("a", menu)?.focus();
  };

  toggle.addEventListener("click", () => {
    if (toggle.getAttribute("aria-expanded") === "true") closeMenu({ restoreFocus: true });
    else openMenu();
  });

  selectAll("a", menu).forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", (event) => {
    if (toggle.getAttribute("aria-expanded") !== "true") return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu({ restoreFocus: true });
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = [toggle, ...selectAll("a", menu)];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.matchMedia("(min-width: 56.01rem)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}

function initReveals() {
  const elements = selectAll(".reveal");
  if (!elements.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  document.body.classList.add("reveal-ready");
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
}

function initSectionNavigation() {
  const links = selectAll(".primary-menu a[href^='#']");
  const sections = links
    .map((link) => select(link.getAttribute("href")))
    .filter(Boolean);

  if (!links.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          if (isCurrent) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-35% 0px -55%", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initLightbox() {
  const dialog = select("#lightbox");
  const galleryItems = selectAll("[data-gallery-item]");
  const image = select("#lightbox-image");
  const media = select(".lightbox-media");
  const placeholder = select("#lightbox-placeholder");
  const caption = select("#lightbox-caption");
  const count = select("#lightbox-count");
  const previousButton = select(".lightbox-prev");
  const nextButton = select(".lightbox-next");
  const closeButton = select(".lightbox-close");

  if (!dialog || !galleryItems.length || !image || !media) return;

  let currentIndex = 0;
  let trigger = null;

  const render = () => {
    const item = galleryItems[currentIndex];
    const assetPath = restaurantData.assets[item.dataset.assetKey];
    const itemCaption = item.dataset.caption || "Imagen de la galería";
    const sourceAlt = select("img", item)?.alt || itemCaption;

    media.classList.remove("is-loaded");
    image.removeAttribute("src");
    image.alt = sourceAlt;
    caption.textContent = itemCaption;
    count.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
    placeholder.querySelector("strong").textContent = "Imagen pendiente";

    image.onload = () => media.classList.add("is-loaded");
    image.onerror = () => {
      media.classList.remove("is-loaded");
      image.removeAttribute("src");
    };
    image.src = assetPath;
  };

  const open = (index, source) => {
    currentIndex = index;
    trigger = source;
    render();
    dialog.showModal();
    closeButton.focus();
  };

  const close = () => {
    dialog.close();
    trigger?.focus();
  };

  const move = (direction) => {
    currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    render();
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => open(index, item));
  });

  previousButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));
  closeButton.addEventListener("click", close);

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });
}

function init() {
  applyRestaurantData();
  applyStructuredData();
  initMediaSlots();
  initHeader();
  initMobileMenu();
  initReveals();
  initSectionNavigation();
  initLightbox();
}

document.addEventListener("DOMContentLoaded", init);
