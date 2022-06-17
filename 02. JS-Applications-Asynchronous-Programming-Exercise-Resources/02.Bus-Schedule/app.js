function solve() {
    let dashboard = document.querySelector('#info span');
    let deparButton= document.getElementById('depart');
    let arriveButton=document.getElementById('arrive');

    let dateForBus={
        "next":"depot"
    };

    async function depart() {
        let url=`http://localhost:3030/jsonstore/bus/schedule/${dateForBus.next}`
        let response= await fetch(url);
    dateForBus=await response.json();

    dashboard.textContent=`Next stop ${dateForBus.name}`;
    deparButton.disabled=true;
    arriveButton.disabled=false;
    }


    async function arrive() {
        dashboard.textContent=`Arriving at ${dateForBus.name}`;
        deparButton.disabled=false;
        arriveButton.disabled=true;    }

    return {
        depart,
        arrive
    };
}

let result = solve();