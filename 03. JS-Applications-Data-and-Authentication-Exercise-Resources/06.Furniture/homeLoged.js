let tableWithFurnitures = document.querySelector(".table tbody");
let urlForAllFurnitures = "http://localhost:3030/data/furniture";
let createFurnitureForm = document.querySelector(".col-md-12 form");
createFurnitureForm.addEventListener("submit", createFurniture);
let buyBtn = document.getElementById("buyBtn");
buyBtn.addEventListener("click", selectedFurnitures);
let allOrderBtn = document.getElementById("allOrdersBtn");
allOrderBtn.addEventListener("click", allOrders);
let logOutBtn= document.getElementById("logoutBtn");
logOutBtn.addEventListener("click", logOut);

let spanItems=document.querySelector(".orders #items");
let spanPrice=document.querySelector(".orders #price");



async function createFurniture(event) {
  event.preventDefault();

  let dataForm = new FormData(event.target);
  let name = dataForm.get("name").trim();
  let price = dataForm.get("price").trim();
  let factor = dataForm.get("factor").trim();
  let img = dataForm.get("img").trim();

  if (name && price && factor && img) {
    let row = document.createElement("tr");
    row.innerHTML = `<td><img src=${img}></td>
      <td><p id="name">${name}</p></td>
      <td>${factor}</td>
      <td><p id="price">${price}</td>
      <td><input type="checkbox"></td>`;
    tableWithFurnitures.appendChild(row);
    let  token  = sessionStorage.getItem("token");

    let options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({ name, price, factor, img }),
    };
    let postRequest = await fetch(urlForAllFurnitures, options);
    let res;

    try {
      res = await postRequest.json();
    } catch (e) {
      res = e;
    }
  }

  event.target.reset();
}

async function selectedFurnitures() {
  let urlForOrders = "http://localhost:3030/data/orders";
  let checkedProduct = document.querySelectorAll(".table tbody input:checked");
  let token = sessionStorage.getItem("token");

  for (let p of checkedProduct) {
    let parentRow = p.parentNode.parentNode;
    let name = parentRow.querySelector("#name").textContent;
    let price = parentRow.querySelector("#price").textContent;
    let options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({ name, price }),
    };
    let request = await fetch(urlForOrders, options);
    let res;

    try {
      res = await request.json();
    } catch (e) {
      res = e;
    }
  }
}


async function allOrders() {
  let  id  = sessionStorage.getItem("id");
  let url = "http://localhost:3030/data/orders?userId=" + id;
  let items='';
  let totalPrice=0;

  let allOrdersRequest = await fetch(url);
  let allOrdersResponse;

  try {
    allOrdersResponse = await allOrdersRequest.json();
  } catch (e) {
    allOrdersResponse = e;
  }

  allOrdersResponse.forEach(item => {
    items+=item.name+" ";
    totalPrice+=Number(item.price);
  });
  spanItems.textContent=items;
  spanPrice.textContent=totalPrice;
}

async function logOut(){
sessionStorage.removeItem('token');
sessionStorage.removeItem('id');
}
