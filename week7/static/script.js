"use strict";

const getNameInput = document.getElementById("input-get-name");
const formGetName = document.getElementById("form-get-name");
const renderNameEl = document.getElementById("render-name");

const deleteMessage = async function (id) {
  const confirmation = confirm("確定刪除？");
  if (!confirmation) return;
  let response = await fetch("/deleteMessage", {
    method: "POST",
    body: id,
  });
  let data = await response.json();
  if (data.result) return window.location.replace(`/member`);
};

const getNameAndRender = async function (username) {
  let response = await fetch(`/api/member?username=${username}`);
  let data = await response.json();
  if (data.data === null) return (renderNameEl.textContent = "查無資料！");
  renderNameEl.textContent = `${data.data.name} (${username})`;
};

formGetName.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = getNameInput.value;
  getNameAndRender(username);
});
