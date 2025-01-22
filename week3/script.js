"use strict";

const navIcon = document.querySelector(".nav-burger-menu");
const navClose = document.querySelector(".nav-close");
const navContainer = document.querySelector(".nav-container");
const mainContentGrid = document.querySelector(".main-grid");

///////////////// navigation ///////////////////
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

///////////////// content ///////////////////
// load & render
const firstImgUrl = function (filelist) {
  const lowerFilelist = filelist.toLowerCase();
  const i = lowerFilelist.indexOf(".jpg");
  return filelist.slice(0, i + 4);
};

const initLoadSpotInfo = async function () {
  const data = await fetch(
    "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1"
  )
    .then((response) => response.json())
    .then((data) => data.data.results);
  console.log(data);
  console.log(data[0].stitle, firstImgUrl(data[0].filelist));
  const promo = document.createElement("div");
  promo.classList.add("promo", "promo-1");
  const promoImg = document.createElement("div");
  promoImg.classList.add("promo-img");
  promoImg.style.backgroundImage = `url(${firstImgUrl(data[0].filelist)})`;
  const promoText = document.createElement("div");
  promoText.classList.add("promo-text", "text");
  promoText.innerText = data[0].stitle;
  promo.append(promoImg, promoText);
  mainContentGrid.appendChild(promo);
};

window.addEventListener("load", initLoadSpotInfo);
