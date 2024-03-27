'use strict';

/*
  === PRELOAD === 
  - loading stops once document is loaded
*/

const preload = document.querySelector('[data-preaload]');

window.addEventListener('load', function () {
  preload.classList.add('loaded');
  document.body.classList.add('loaded');
});

/*
  MULTIPLE EVENT LISTENERS ON ELEMENTS
*/
const addEventOnElements = (elements, eventType, callback) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const navBar = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('[data-overlay]');

const toggleNavbar = () => {
  navBar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('nav-active');
};

addEventOnElements(navTogglers, 'click', toggleNavbar);

/* === HEADER === */
const header = document.querySelector('[data-header]');

let lastScrollPos = 0;

const hideHeader = () => {
  const isScrollBottom = lastScrollPos < window.scrollY;

  if (isScrollBottom) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener('scroll', () => {
  if (window.scrollY >= 50) {
    header.classList.add('active');
    hideHeader();
  } else {
    header.classList.remove('active');
  }
});

/* === HERO SLIDER === */
const heroSlider = document.querySelector('[data-hero-slider]');
const heroSliderItems = document.querySelectorAll('[data-hero-slider-item]');
const heroSliderPrevBtn = document.querySelector('[data-prev-btn]');
const heroSliderNextBtn = document.querySelector('[data-next-btn]');

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove('active');
  heroSliderItems[currentSlidePos].classList.add('active');
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = () => {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
};

heroSliderNextBtn.addEventListener('click', slideNext);

const slidePrev = () => {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
};

heroSliderPrevBtn.addEventListener('click', slidePrev);

let autoSlideInterval;

const autoSlide = () => {
  autoSlideInterval = setInterval(() => {
    slideNext();
  }, 7000);
};

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], 'mouseover', () => {
  clearInterval(autoSlideInterval);
});

addEventOnElements(
  [heroSliderNextBtn, heroSliderPrevBtn],
  'mouseout',
  autoSlide
);

window.addEventListener('load', autoSlide);

/* === PARALLAX EFFECT === */
const prallaxItems = document.querySelectorAll('[data-parallax-item]');

let x, y;

window.addEventListener('mousemove', (event) => {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  // flip the numbers e.g 20 to -20, 5 to -5
  x = x - x * 2;
  y = x - y * 2;

  for (let i = 0; i < prallaxItems.length; i++) {
    x = x * Number(prallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(prallaxItems[i].dataset.parallaxSpeed);
    prallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});
