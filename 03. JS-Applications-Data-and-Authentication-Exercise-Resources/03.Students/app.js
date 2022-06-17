let urlForStudents="http://localhost:3030/jsonstore/collections/students";
let tableBody=document.querySelector("#results tbody");

async function students(){
    let requestStudents=await fetch(urlForStudents);
    let responseStudents = await requestStudents.json();
    let allStudents=Object.values(responseStudents);


    allStudents.forEach((student)=>createNewRow(student));

    document.getElementById("submit").addEventListener("click",creatNewStudent)
    

    
}
students()

async function creatNewStudent(event){
    event.preventDefault();
    let form=document.getElementById("form");
    let formData=new FormData(form);

    let firstName=formData.get("firstName");
    let lastName=formData.get("lastName");
    let facultyNumber=formData.get("facultyNumber");
    let grade=formData.get("grade");

    let student={firstName,lastName,facultyNumber,grade};
    let options={
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }
    let postRequest=await fetch(urlForStudents,options);
    createNewRow(student);

}

function createNewRow(student){
    let row=document.createElement("tr");
    let col1=document.createElement("td");
    let col2=document.createElement("td");
    let col3=document.createElement("td");
    let col4=document.createElement("td");

    col1.textContent = student.firstName;
    col2.textContent = student.lastName;
    col3.textContent = student.facultyNumber;
    col4.textContent = student.grade;

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);

    tableBody.appendChild(row);
}