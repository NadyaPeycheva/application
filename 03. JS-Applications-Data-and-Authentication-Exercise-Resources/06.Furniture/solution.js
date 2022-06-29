let urlForRegister = "http://localhost:3030/users/register";
let urlForLogin = "http://localhost:3030/users/login";
let urlForAllFurnitures = "http://localhost:3030/data/furniture";

let catalogBtn = document.querySelector(".active");
let loadBtn=document.getElementById("guest")

let tableWithFurnitures = document.querySelector(".table");

function solve() {
  catalogBtn.addEventListener("click",loadAllFurniture);
  loadBtn.addEventListener("click",login)


}

solve();

async function loadAllFurniture() {
  let requestForAllFurnitures = await fetch(urlForAllFurnitures);
  let response;

  try {
    response = await requestForAllFurn.json();
  } catch (e) {
    response = e;
  }
  let allFurniture = Object.entries(response);
  console.log(allFurniture);
}


function login(){
  let registerForm = document.querySelector('[action="/register"]');
registerForm.addEventListener("submit", registerUser);
  async function registerUser(event) {
    event.preventDefault();
  
    let dataForm = new FormData(event.target);
    let email = dataForm.get("email").trim();
    let password = dataForm.get("password").trim();
    let repeatPassword = dataForm.get("rePass").trim();
  
    if (email && password && password === repeatPassword) {
      let user = { email, password };
      let options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
  
      let requestForRegister = await fetch(urlForRegister, options);
      let response;
      try {
        response = await requestForRegister.json();
      } catch (err) {
        response = err;
      }
    }
    registerForm.reset();
  }

let loginForm = document.querySelector('[action="/login"]');
loginForm.addEventListener("submit", loginUser);
  async function loginUser(event) {
    event.preventDefault();
  
    let dataForm = new FormData(event.target);
    let email = dataForm.get("email").trim();
    let password = dataForm.get("password").trim();
  
    if (email && password) {
      let user = { email, password };
      let options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
  
      let requestForLogin = await fetch(urlForLogin, options);
      let response;
      try {
        response = await requestForLogin.json();
        let token = response.accessToken;
        sessionStorage.setItem("user", token);
      } catch (err) {
        response = err;
      }
      window.location = "./homeLogged.html";
    }
    loginForm.reset();
  }

let createFurnitureForm = document.querySelector(".col-md-12 form");
createFurnitureForm.addEventListener("submit", createFurniture);
async function createFurniture(event) {
  event.preventDefault();

  let dataForm = new FormData(event.target);
  let name = dataForm.get("name").trim();
  let price = dataForm.get("price").trim();
  let factor = dataForm.get("factor").trim();
  let img = dataForm.get("img").trim();

  if (name && price && factor && img) {
    // let row=document.createElement("tr");
    // row.innerHTML=`<td><img src=${img}></td>
    // <td>${name}</td>
    // <td>${factor}</td>
    // <td>${price}</td>
    // <td><input type="checkbox"></td>`
    // tableWithFurnitures.appendChild(row);
    let options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
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


}