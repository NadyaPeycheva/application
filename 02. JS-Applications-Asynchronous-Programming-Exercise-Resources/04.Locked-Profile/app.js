async function lockedProfile() {
  let urlForAllProfiles = "http://localhost:3030/jsonstore/advanced/profiles";
  let responseForProfiles;
  let mainTag = document.getElementById("main");

  try {
    responseForProfiles = await fetch(urlForAllProfiles);
  } catch (error) {
    responseForProfile = "cannot fetch user";
  }

  let allProfiles = Object.values(await responseForProfiles.json());
  let counter = 0;
  allProfiles.forEach((element) => {
    let newProfile = document.createElement("div");
    newProfile.classList.add("profile");
    newProfile.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name="user${counter}Locked" value="lock">
        <label>Unlock</label>
        <input type="radio" name="user${counter}Locked" value="unlock"><br>
        <hr>
        <label>Username</label>
        <input type="text" name="user${counter}Username" value="${element.username}" disabled readonly />
        <div class="hiddenInfo">
            <hr>
            <label>Email:</label>
            <input type="email" name="user${counter}Email" value="${element.email}" disabled readonly />
            <label>Age:</label>
            <input type="email" name="user${counter}Age" value="${element.age}" disabled readonly />
            <button>Show more</button>`;
    mainTag.appendChild(newProfile);
    counter++;
  });

  let allButtons = document.querySelectorAll("button");
  allButtons.forEach((b) => {
    b.addEventListener("click", showInformations);
  });

  function showInformations(event) {

    let parent = event.target.parentNode.parentNode;
    let lockBtn = parent.querySelector('[value="lock"]');
    let unlockBtn = parent.querySelector('[value="unlock"]');

    if (unlockBtn.checked) {

      let hidenIfo = parent.getElementsByClassName("hiddenInfo")[0];
      let allHidenLabesl = hidenIfo.querySelectorAll("label");
      let allHidenInputs = hidenIfo.querySelectorAll("input");
      if (event.target.textContent === "Show more") {
        allHidenLabesl.forEach((e) => (e.style.display = "block"));
        allHidenInputs.forEach((e) => (e.style.display = "block"));

        event.target.textContent = "Hide it";
      } else {
        allHidenLabesl.forEach((e) => (e.style.display = "none"));
        allHidenInputs.forEach((e) => (e.style.display = "none"));
        event.target.textContent = "Show more";
      }
    } 
  }
}
