"use srtict";

const agreeCheckboxEl = document.getElementById("agree");
const btnSignin = document.getElementById("signin");

if (btnSignin) {
  btnSignin.addEventListener("click", function (e) {
    if (agreeCheckboxEl.checked == false) {
      e.preventDefault();
      return alert("請勾選「同意條款」！");
    }
  });
}
