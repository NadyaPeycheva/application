//логване на потребител--->

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("click", onLogin); //слагаме евент лисънър на цялата форма
});
//подсигурява,че кодът ще се изпълни, само когато страницата е заредена

async function onLogin(event) {
  event.preventDefault();
  let formData = new FormData(event.target); //евенът е самата форма/ще вземе всички инпут полета от формата

  let email = formData.get("email");
  let password = formData.get("password");

  let res = await fetch("http://localhost:3030/users/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = e;
    alert(data)
  }
  let userData={email:data.email, password:data.password,token:data.accessToken};//запазвам токена в сесън сторидж
  sessionStorage.setItem('userData',JSON.stringify(userData));
  window.location='./index.html'//пренасочва към зададената старница в скобите(в случая това е първоначалната)
}
