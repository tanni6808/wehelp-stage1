"use strict";

const navIcon = document.querySelector(".nav-burger-menu");
const navClose = document.querySelector(".nav-close");
const navContainer = document.querySelector(".nav-container");
const mainContentGrid = document.querySelector(".main-grid");
const btnLoadMore = document.querySelector(".btn-load");

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
let spotList = [];

const initSpotInfo = async function () {
  try {
    const data = await fetch(
      "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1"
    )
      .then((response) => response.json())
      .then((data) => data.data.results);

    let figureNum = 0;
    for (let i = 0; i < data.length; i++) {
      if (i < 3) {
        const promo = document.createElement("div");
        promo.classList.add("promo", `promo-${i + 1}`);
        const promoImg = document.createElement("div");
        promoImg.classList.add("promo-img");
        promoImg.style.backgroundImage = `url(${firstImgUrl(
          data[i].filelist
        )})`;
        const promoText = document.createElement("div");
        promoText.classList.add("promo-text", "text");
        promoText.innerText = data[i].stitle;
        promo.append(promoImg, promoText);
        spotList.push(promo);
      } else {
        if (figureNum == 10) figureNum = 0;
        figureNum++;
        const figure = document.createElement("div");
        figure.classList.add("figure", `figure-${figureNum}`);
        figure.style.backgroundImage = `url(${firstImgUrl(data[i].filelist)})`;
        const figureStar = document.createElement("img");
        figureStar.classList.add("star-icon");
        figureStar.src = "star.png";
        const figureText = document.createElement("div");
        figureText.classList.add("figure-text", "text");
        figureText.innerText = data[i].stitle;
        figure.append(figureStar, figureText);
        spotList.push(figure);
      }
    }
    for (let i = 0; i < 13; i++) {
      mainContentGrid.appendChild(spotList[i]);
    }
  } catch (err) {
    btnLoadMore.disabled = true;
    alert("無法讀取景點資料，請稍後再試。");
  }
};

const loadMore = function () {
  // get last rendered spot in main-grid
  const lastSpotEl = mainContentGrid.lastChild;
  const startSpotNum = spotList.indexOf(lastSpotEl) + 1;
  // load 10 more spots
  for (let i = startSpotNum; i < startSpotNum + 10; i++) {
    // TODO disable button if there's no more to load
    if (i == spotList.length) {
      btnLoadMore.disabled = true;
      break;
    }
    mainContentGrid.appendChild(spotList[i]);
  }
};

window.addEventListener("load", initSpotInfo);
btnLoadMore.addEventListener("click", loadMore);
