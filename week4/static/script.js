"use srtict";

const agreeCheckboxEl = document.getElementById("agree");
const btnSignin = document.getElementById("signin");
const accountEl = document.getElementById("account");
const passwordEl = document.getElementById("password");

btnSignin.addEventListener("click", function (e) {
  e.preventDefault();
  if (agreeCheckboxEl.checked == false)
    return alert("Please check the checkbox first!");

  accountEl.value = "";
  passwordEl.value = "";
  agreeCheckboxEl.checked = false;
});
