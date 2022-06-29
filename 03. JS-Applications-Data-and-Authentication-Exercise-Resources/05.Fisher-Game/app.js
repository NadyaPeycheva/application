let userData = null;

window.addEventListener("DOMContentLoaded", () => {
  userData = JSON.parse(sessionStorage("userData")); //вземаме данните от сесъш сториджа с името с което сме ги създали
  //и след това правим проверка дали има данни/логнат потребител
  if (userData !== null) {
    document.getElementById("guest").style.display = "none";
    document.querySelector("#addForm .add").disabled = "false";
  } else {
    document.getElementById("user").style.display = "none";
  }

  document.querySelector(".load").addEventListener("click", loadData);
  document.getElementById("addForm").addEventListener("click", onCreateSubmit);
});

async function onCreateSubmit(event) {
  event.preventDefault();

  if (!userData) {
    window.location = "./login.html";
    return;
  }

  let formData = new FormData(event.target);
  let data = [...formData.entries()].reduce(
    (a, [k, v]) => Object.assign(a, { [k]: v }),
    {}
  );

  try {
    let res = await fetch("http://localhost:3030/data/catches/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": userData.token,
      },
      body: JSON.stringify(data),
    });

    if (res.ok !== true) {
      let error = await res.json();
      throw new Error(error.message);
    }
    loadData();
    event.target.reset();
  } catch (e) {
    alert(e.message);
  }
}

async function loadData() {
  let res = await fetch("http://localhost:3030/data/catches/");
  let data = await res.json();

  document
    .getElementById("catches")
    .replaceChildren(...data.map(createPreview));
}

function createPreview(item) {
  let isOwner = userData && item._ownerID === userData.id;

  let element = document.createElement("div");
  element.className = "catch";
  element.innerHTML = `
    <label>Angler</label>
    <input type="text" class="angler" value="${item.angler}"${
    !isOwner ? "disabled" : ""
  }>
    <label>Weight</label>
    <input type="text" class="weight" value="${item.weight}"${
    !isOwner ? "disabled" : ""
  }>
    <label>Species</label>
    <input type="text" class="species" value="${item.species}"${
    !isOwner ? "disabled" : ""
  }>
    <label>Location</label>
    <input type="text" class="location" value="${item.location}"${
    !isOwner ? "disabled" : ""
  }>
    <label>Bait</label>
    <input type="text" class="bait" value="${item.bait}"${
    !isOwner ? "disabled" : ""
  }>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${item.captureTime}"${
    !isOwner ? "disabled" : ""
  }>
    <button class="update" data-id="${item._id}"${
    !isOwner ? "disabled" : ""
  }>Update</button>
    <button class="delete" data-id="${item._id}"${
    !isOwner ? "disabled" : ""
  }>Delete</button>`;

  return element;
}
