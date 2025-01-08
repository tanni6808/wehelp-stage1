"use strict";

const navIcon = document.querySelector(".nav-burger-menu");
const navClose = document.querySelector(".nav-close");
const navContainer = document.querySelector(".nav-container");

// console.log(navContainer);
let mql = window.matchMedia("(max-width: 600px)");

// Init
if (mql.matches) {
  navIcon.classList.remove("hidden");
  navContainer.classList.add("hidden");
  navClose.classList.remove("hidden");
}

// Change when screen size changed
mql.addEventListener("change", function () {
  if (!mql.matches && !navContainer.classList.contains("hidden")) {
    navIcon.classList.add("hidden");
    navClose.classList.add("hidden");
    return;
  }
  navIcon.classList.toggle("hidden");
  navContainer.classList.toggle("hidden");
  navClose.classList.toggle("hidden");
});

// Open pop-up nav
navIcon.addEventListener("click", function () {
  navContainer.classList.remove("hidden");
});

// Close pop-up nav
navClose.addEventListener("click", function () {
  navContainer.classList.add("hidden");
});
