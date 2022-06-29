window.addEventListener("DOMContentLoaded", async () => {
  let table=document.querySelector(".table tbody");
  let urlForAllFurnitures = "http://localhost:3030/data/furniture";
  let requestForAllFurnitures = await fetch(urlForAllFurnitures);
  let response;
  document.querySelectorAll('[type="checkbox"]').forEach(btn=>{
    btn.disabled = false;
  })

  try {
    response = await requestForAllFurnitures.json();
  } catch (e) {
    response = e;
  }
  response.forEach(item => {
    let newRow=document.createElement('tr');
    newRow.innerHTML=`<td><img src=${item.img}></td>
    <td><p id="name">${item.name}</p></td>
    <td><p id="price">${item.price}</p></td>
    <td><p>${item.factor}</p></td>
    <td><input type="checkbox"></td>`
    table.appendChild(newRow);
  })
});
