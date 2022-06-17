async function solution() {
  let urlForAllPosts = "http://localhost:3030/jsonstore/advanced/articles/list";

  let requestForPosts = await fetch(urlForAllPosts);
  let resposneForPosts = await requestForPosts.json();

  let allPosts = Object.values(resposneForPosts);
  allPosts.forEach((p) => {
    getInformation(p._id);
  });
}
solution();

async function getInformation(id) {
  let urlForContent =
    "http://localhost:3030/jsonstore/advanced/articles/details/" + id;

  let requestForContent = await fetch(urlForContent);
  let responseForContent = await requestForContent.json();
  let title = responseForContent.title;
  let text = responseForContent.content;

  let newDiv = document.createElement("div");
  newDiv.classList.add("accordion");
  newDiv.innerHTML = `<div class="head">
    <span>${title}</span>
    <button class="button" id="${id}">More</button>
</div>
<div class="extra">
    <p>${text}</p>
</div>`;
  document.getElementById("main").appendChild(newDiv);
  let allButtons=document.querySelectorAll(".button");
  allButtons.forEach(b=>b.addEventListener("click",showOrHidenInf))
}

function showOrHidenInf(event){
    let parent=event.target.parentNode.parentNode;
    if(event.target.textContent==="More"){
        parent.querySelector(".extra").style.display="inline-block";
        event.target.textContent="Less"
    }else{
        parent.querySelector(".extra").style.display="none";
        event.target.textContent="More"
    }

}
