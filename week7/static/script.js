"use strict";

const nameEl = document.querySelectorAll(".user-name");

const inputGetName = document.getElementById("input-get-name");
const renderNameEl = document.getElementById("render-get-name");
const formGetName = document.getElementById("form-get-name");

const inputChangeName = document.getElementById("input-change-name");
const renderChangeNameEl = document.getElementById("render-change-name");
const formChangeName = document.getElementById("form-change-name");

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

const changeNameAndRender = async function (newName) {
  let response = await fetch("/api/member", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName }),
  });
  let data = await response.json();
  if (data.ok) {
    nameEl.forEach(
      (name, i) => (name.textContent = i === 0 ? newName : newName + "：")
    );
    inputChangeName.value = "";
    renderChangeNameEl.textContent = "更新成功！";
  } else {
    renderChangeNameEl.textContent = "更新失敗！";
  }
};

const getNameAndRender = async function (username) {
  let response = await fetch(`/api/member?username=${username}`);
  let data = await response.json();
  const userdata = data.data;
  if (userdata === null) return (renderNameEl.textContent = "查無資料！");
  return (renderNameEl.textContent = `${userdata.name} (${username})`);
};

if (formGetName) {
  formGetName.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = inputGetName.value;
    getNameAndRender(username);
  });
}

if (formChangeName) {
  formChangeName.addEventListener("submit", function (e) {
    e.preventDefault();
    const changedName = inputChangeName.value;
    changeNameAndRender(changedName);
  });
}
