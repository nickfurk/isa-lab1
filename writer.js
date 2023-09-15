const addNoteButton = document.getElementById("button-add-note");
const noteSection = document.getElementById("notes-section");
const updateTimeSection = document.getElementById("update-time");

// Class Message
function Message() {
  this.div = document.createElement("div");
  this.div.className = "note-div";

  this.textarea = document.createElement("textarea");
  this.textarea.className = "textarea-message";
  this.textarea.placeholder = "Enter note here";

  this.removeBtn = document.createElement("button");
  this.removeBtn.innerText = "Remove";
  this.removeBtn.className = "remove-button";

  this.div.appendChild(this.textarea);
  this.div.appendChild(this.removeBtn);

  // --- event listener ---
  this.removeBtn.addEventListener("click", () => {
    this.remove();
  });

  // --- method ---
  this.remove = () => {
    // Remove the Message from the DOM
    noteSection.removeChild(this.div);
  };
}

function updateTime() {
  const currentTime = new Date();
  updateTimeSection.textContent = `stored at: ${currentTime.toLocaleTimeString()}`;
}

function updateLocalStorage() {
  const notesArray = [];
  const allTextareas = document.querySelectorAll(".textarea-message");
  let counter = 1;

  //for each textarea info, add it to the array as an obj
  allTextareas.forEach((textArea) => {
    notesArray.push({ id: counter++, text: textArea.value });
  });

  //convert notesArray JSON obj to string and store in local storage
  localStorage.setItem("notes", JSON.stringify(notesArray));

  updateTime();
}

//Update the local storage every 2 seconds
setInterval(updateLocalStorage, 2000);

//Add new message event listner
addNoteButton.addEventListener("click", () => {
  const newMessage = new Message();
  noteSection.appendChild(newMessage.div);
});

// Retrieve stored data from local storage on page load
window.addEventListener("load", () => {
  if (localStorage.getItem("notes")) {
    messages = JSON.parse(localStorage.getItem("notes"));

    // Clear the current noteSection
    noteSection.innerHTML = "";

    // Repopulate the HTML note-section
    messages.forEach((message) => {
      const messageElement = new Message();
      messageElement.textarea.value = message.text;
      noteSection.appendChild(messageElement.div);
    });
  }
});
