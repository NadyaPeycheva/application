function attachEvents() {
  document.getElementById("btnLoad").addEventListener("click", loadPhones);
  document.getElementById("btnCreate").addEventListener("click", createPhone);
}
let ul = document.getElementById("phonebook");
let inputName=document.getElementById("person");
let inputNumber = document.getElementById("phone");

let urlForGetNumbers = "http://localhost:3030/jsonstore/phonebook";
let urlForDelete = "http://localhost:3030/jsonstore/phonebook/";
let urlForPost="http://localhost:3030/jsonstore/phonebook";

attachEvents();

async function loadPhones() {
    ul.innerHTML='';
  let requestForPhonesNumers = await fetch(urlForGetNumbers);
  let responseNumbers = await requestForPhonesNumers.json();
  let allNumbers = Object.values(responseNumbers);
  allNumbers.forEach((n) => {
    let liElement = document.createElement("li");
    liElement.innerHTML = `${n.person}:${n.phone}
    <button data-id="${n._id}">[Delete]</button>`;
    ul.appendChild(liElement);
  });
  document
    .querySelectorAll("#phonebook button")
    .forEach((b) => b.addEventListener("click", deleteElement));
}

async function deleteElement(event) {
  let options = {
    method: "delete",
    headers: {
      "Content-type": "application/json",
    },
  };
  let deletElement = await fetch(
    urlForDelete + event.target.dataset.id,
    options
  );
  event.target.parentNode.remove();
}

async function createPhone(){
    let person=inputName.value;
    let phone=inputNumber.value;
    let options={
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({person,phone})
    }

    let requestForPost=await fetch(urlForPost,options);
    inputName.value='';
    inputNumber.value='';

loadPhones();
}