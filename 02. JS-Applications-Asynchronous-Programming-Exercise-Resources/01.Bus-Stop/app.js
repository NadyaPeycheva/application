async function getInfo() {
  let inputBus = document.getElementById("stopId");
  let url = `http://localhost:3030/jsonstore/bus/businfo/${inputBus.value}`;
  let stopName = document.getElementById("stopName");
  let busesNumbers = document.getElementById("buses");
  try {
      busesNumbers.innerHTML ='';
    let response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Invalid date");
    }
    let date = await response.json();
    stopName.textContent = date.name;

    let allBuses = Object.entries(date.buses);
    for (let bus of allBuses) {
      let newLi = document.createElement("li");
      newLi.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
      busesNumbers.appendChild(newLi);
    }
  } catch (e) {
    stopName.textContent = "Error";
  }
}
