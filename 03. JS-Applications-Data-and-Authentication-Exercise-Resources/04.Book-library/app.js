let url = "http://localhost:3030/jsonstore/collections/books/";
let tableBody=document.querySelector("tbody");

async function getAllBooks() {
  let response;
  let requestForAllBooks = await fetch(url);
  try {
    response = await requestForAllBooks.json();
  } catch (err) {
    response = err;
  }
  return response;
}
document.getElementById("loadBooks").addEventListener("click",loadAllBooks);

async function loadAllBooks() {
    tableBody.replaceChildren();
   let objAllBooks= await getAllBooks();
   let arrAllBooks=Object.entries(objAllBooks);
   arrAllBooks.forEach((b)=>createNewTableRow(b));
   //
}

function createNewTableRow(book){
    let[id,dataBook]=book;

    let row=document.createElement("tr");
    row.innerHTML=` <td>${dataBook.title}</td>
    <td>${dataBook.author}</td>
    <td data-id="${id}">
        <button id="editBtn${id}">Edit</button>
        <button id="deleteBtn${id}">Delete</button>
    </td>`;
    tableBody.appendChild(row);
document.getElementById(`editBtn${id}`).addEventListener('click',editBook);
document.getElementById(`deleteBtn${id}`).addEventListener('click',deleteBook);
}

document.getElementById("submit").addEventListener("click",addNewBook);

async function addNewBook(event) {
    event.preventDefault();

    let form=document.getElementById("form");
    let dataForm=new FormData(form);
    let title=dataForm.get("title").trim();
    let author=dataForm.get("author").trim();

    if(title&&author){
        let newBook={author,title};
        let options={
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newBook)
        }

        let requestToCreateNewBook=await fetch(url,options);
        let responseForNewBook=await requestToCreateNewBook;
        let id=responseForNewBook._id;

        createNewTableRow([id,newBook]);
    }
    document.querySelectorAll("input").forEach(i=>i.value='');
    
}
async function editBook(event){
    let parent=event.target.parentNode;
    let parentOfRow=parent.parentNode;
    let currentId=parent.dataset.id;

    let form=document.getElementById("form");
    let dataForm=new FormData(form);
    let title=dataForm.get("title").trim();
    let author=dataForm.get("author").trim();

    if(title&&author){
        let newBook={author,title};
        let options={
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newBook)
        }
    
        let requestToCreateNewBook=await fetch(url+currentId,options);
        
        parentOfRow.querySelector("tr td").textContent=title;
        parentOfRow.querySelector("tr td:nth-child(2)").textContent=author;
    }
    document.querySelectorAll("input").forEach(i=>i.value='');

}
async function deleteBook(event){
    let parent=event.target.parentNode;
    let id=parent.dataset.id;

    let requestToDeleteBook=await fetch(url+id,{method:"delete"});
    loadAllBooks();
}
