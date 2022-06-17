function attachEvents() {
  let url = "http://localhost:3030/jsonstore/messenger";
  let inputName = document.querySelector('[name="author"]');
  let inputMessage = document.querySelector('[name="content"]');
  let textArea = document.getElementById("messages");

  document.getElementById("submit").addEventListener("click", addMessage);
  document.getElementById("refresh").addEventListener("click", showMessages);

  async function addMessage() {
   
    let author = inputName.value.trim();
    let message = inputMessage.value.trim();

    let options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author, 'content':message }),
    };

    let response = await fetch(url, options);
    inputName.value='';
    inputMessage.value='';
  }

  async function showMessages() {
    let allMessages = await fetch(url);
    let responseForAllMessages = await allMessages.json();
    let text = "";
    for (obj of Object.values(responseForAllMessages)) {
      text += `${obj.author}:${obj.content}\n`;
    }

    textArea.textContent = text;
  }
}

attachEvents();
