"use srtict";

const agreeCheckboxEl = document.getElementById("agree");
const btnSignin = document.getElementById("signin");
const numberInputEl = document.getElementById("positive-number");
const btnCalc = document.getElementById("calc");

if (btnSignin) {
  btnSignin.addEventListener("click", function (e) {
    if (agreeCheckboxEl.checked == false) {
      e.preventDefault();
      return alert("請勾選「同意條款」！");
    }
  });
}

if (btnCalc) {
  btnCalc.addEventListener("click", function (e) {
    e.preventDefault();
    const n = numberInputEl.value;
    if (!(n > 0 && Math.floor(n) === +n)) {
      return alert("請輸入正整數！");
    }
    console.log(n);
    window.location.replace(`/square/${n}`);
  });
}
