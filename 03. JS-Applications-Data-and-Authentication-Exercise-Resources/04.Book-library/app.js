document.getElementById("loadBooks").addEventListener("click",loadAllBooks);
let urlForAllBooks="http://localhost:3030/jsonstore/collections/books/";

document.getElementById("submit").addEventListener("click",createNewBook);
let form=document.getElementById("form");
let tbody=document.querySelector('tbody');





async function loadAllBooks() {
    let requestBooks=await fetch(urlForAllBooks);
    let responseBooks=await requestBooks.json();
    let allBooks=Object.entries(responseBooks);
    allBooks.forEach((b)=>createNewRow(b));
}

function createNewRow(data){
    let[id,book]=data;
    let newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td id="title">${book.title}</td>
    <td id="author">${book.author}</td>
    <td data-id="${id}">
        <button  id="edit">Edit</button>
        <button id="delete">Delete</button>
    </td>`
    tbody.appendChild(newRow);
    
    document.getElementById("edit").addEventListener("click",editBook);
    document.getElementById("delete").addEventListener("click",deleteBook);

}

async function createNewBook(event){
    event.preventDefault();
    let formData=new FormData(form);

    let author=formData.get("author");
    let title=formData.get("title");
let newBook={author,title};
    let options={
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    };

    let requestForBook=await fetch(urlForAllBooks,options);
    let responseForBook= await requestForBook.json();
    let id=responseForBook._id;
   
    createNewRow([id,newBook]);
    document.querySelectorAll("#form input").forEach(i=>i.value="");
}

async function deleteBook(event){
    let parent=event.target.parentNode
    let id=parent.dataset.id;
    let currentRow=parent.parentNode;

    let deleteBook=await fetch(urlForAllBooks+id,{method:"delete"});
    currentRow.remove();

}

async function editBook(event){
    let parent=event.target.parentNode
    let id=parent.dataset.id;
    let currentRow=parent.parentNode;

    let formData=new FormData(form);

    let author=formData.get("author");
    let title=formData.get("title");
    let newBook={title,author};
    let options={
        method: "put",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    };

    let requestEditBook=await fetch(urlForAllBooks+id,options);
currentRow.querySelector("#author").textContent =author;
currentRow.querySelector("#title").textContent =title;
document.querySelectorAll("#form input").forEach(i=>i.value="")
}