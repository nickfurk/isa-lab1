const noteSection = document.getElementById("notes-section");
const updateTimeSection = document.getElementById("update-time");

// Class Message
function Message(messageText) {
  this.div = document.createElement("div");
  this.div.className = "div-readers-note";
  this.div.textContent = messageText;
}

function updateTime() {
  const currentTime = new Date();
  updateTimeSection.textContent = `updated at: ${currentTime.toLocaleTimeString()}`;
}

function showMessage() {
  if (localStorage.getItem("notes")) {
    const messages = JSON.parse(localStorage.getItem("notes"));

    // Clear the current noteSection
    noteSection.innerHTML = "";

    // Repopulate the HTML note-section
    messages.forEach((message) => {
      if (message.text) {
        const messageElement = new Message(message.text);
        noteSection.appendChild(messageElement.div);
      }
    });
    updateTime();
  }
}

showMessage();
setInterval(showMessage, 2000);
