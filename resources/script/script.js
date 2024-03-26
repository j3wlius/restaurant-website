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