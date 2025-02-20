"use strict";

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
