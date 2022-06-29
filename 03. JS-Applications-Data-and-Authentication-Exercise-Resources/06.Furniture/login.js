let urlForRegister = "http://localhost:3030/users/register";
let urlForLogin = "http://localhost:3030/users/login";

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
    } catch (err) {
      response = err;
    }
    let token = response.accessToken;
    let id=response._id;
    sessionStorage.setItem("token",token);
    sessionStorage.setItem("id",id);
    window.location = "./homeLogged.html";
  }
  loginForm.reset();
}

