"use srtict";

const agreeCheckboxEl = document.getElementById("agree");
const btnSignin = document.getElementById("signin");
const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");

btnSignin.addEventListener("click", function (e) {
  //   e.preventDefault();
  if (agreeCheckboxEl.checked == false) return alert("請勾選「同意條款」！");

  //   usernameEl.value = "";
  //   passwordEl.value = "";
  //   agreeCheckboxEl.checked = false;
});
