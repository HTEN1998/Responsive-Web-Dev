// set current year
const copyrightYearElement = document.querySelector(".copyright-year");
const currentYear = new Date().getFullYear();
copyrightYearElement.textContent = currentYear;

// make mobile navigation work
const btnNavElement = document.querySelector(".btn-mobile-nav");
const headerElement = document.querySelector(".header");

btnNavElement.addEventListener("click", () => {
  headerElement.classList.toggle("nav-open");
});

// smooth scrolling animation
const allLinkElements = document.querySelectorAll("a:link");
allLinkElements.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#") {
      // scroll back to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href !== "#" && href.startsWith("#")) {
      // scroll to particular section
      const sectionElement = document.querySelector(href);
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }

    // close mobile nav onclicking links
    if (link.classList.contains("main-nav-link")) {
      headerElement.classList.toggle("nav-open");
    }
  });
});

// Sticky navigation
const heroSectionElement = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(heroSectionElement);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
