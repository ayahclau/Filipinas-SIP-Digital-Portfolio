const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let isDarkSection = false;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (window.scrollY + window.innerHeight / 2 >= top && window.scrollY < top + height) {
      const bg = window.getComputedStyle(section).backgroundColor;

      // Check if it's a dark section (assumes #1a1c1a)
      if (bg === 'rgb(26, 28, 26)') {
        isDarkSection = true;
      }
    }
  });

  navLinks.forEach(link => {
    link.classList.add('dynamic');
    link.style.color = isDarkSection ? '#f6dfbc' : '#1a1c1a';
  });
});

let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.style.top = '-100px'; // move out of view
  } else {
    // Scrolling up
    navbar.style.top = '-100px';
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Smooth scroll on wheel
document.querySelectorAll('section').forEach((section) => {
    section.addEventListener('wheel', (e) => {
      if (e.deltaY > 0) {
        // Scroll down
        const nextSection = section.nextElementSibling;
        if (nextSection && nextSection.tagName === 'SECTION') {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Scroll up
        const prevSection = section.previousElementSibling;
        if (prevSection && prevSection.tagName === 'SECTION') {
          prevSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  
  // Smooth scroll for nav links
  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Show navbar again after snapping to a new section
let currentSectionInView = '';

const showNavbarAfterSnap = () => {
  const scrollY = window.scrollY;
  let visibleSection = '';

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollY >= top - 50 && scrollY < top + height - 50) {
      visibleSection = section.getAttribute('id');
    }
  });

  // If we’ve moved to a new section, reset navbar visibility
  if (visibleSection !== currentSectionInView) {
    navbar.style.top = '0'; // Force show navbar
    currentSectionInView = visibleSection;
  }
};

// Add scroll listener with slight delay to catch snap
window.addEventListener('scroll', () => {
  clearTimeout(window.snapScrollTimeout);
  window.snapScrollTimeout = setTimeout(showNavbarAfterSnap, 20);
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('reveal');
      }, index * 150);
    } else {
      entry.target.classList.remove('reveal');
    }
  });
}, { threshold: 0.1 });

function applyAnimation(tag) {
  document.querySelectorAll(tag).forEach(el => {
    if (!el.closest('.scrolling-text-container')) {
      el.classList.add('animate-up');
      observer.observe(el);
    }
  });
}

['h1', 'h2', 'h3', 'p', 'img'].forEach(applyAnimation);