const addNoteButton = document.getElementById('button-add-note');
const noteSection = document.getElementById('notes-section');
const updateTimeSection = document.getElementById('update-time');

function createMessage(){
    //create div
    const messageDiv = document.createElement('div');
    messageDiv.className = 'note-div';

    //create textarea
    const textarea = document.createElement('textarea');
    textarea.className = "textarea-message";
    textarea.placeholder = "Enter note here";

    //create remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.className = 'remove-button';

    //add click event listner to the remove button
    removeBtn.addEventListener('click', () => {

        //remove the component from the HTML
        noteSection.removeChild(messageDiv);
    });

    messageDiv.appendChild(textarea);
    messageDiv.appendChild(removeBtn);

    return messageDiv
}

function updateLocalStorage() {
    const notesArray = []
    const allTextareas = document.querySelectorAll(".textarea-message");
    let counter = 1

    //for each textarea, add it to the array as an obj
    allTextareas.forEach((textArea) => {
   
        notesArray.push(
            {id: counter++,
            text: textArea.value})
    })

    //convert notesArray JSON obj to string and store in local storage
    localStorage.setItem('notes', JSON.stringify(notesArray));

    //update the time
    const currentTime = new Date();
    updateTimeSection.textContent = `stored at: ${currentTime.toLocaleTimeString()}`;
}

//Update the local storage every 2 seconds
setInterval(updateLocalStorage, 2000);

//Add new message logic
addNoteButton.addEventListener('click', () => {
    //create new message obj
    const newMessage = createMessage();

    //append new message to the note section
    noteSection.appendChild(newMessage);
})

// Retrieve stored data from local storage on page load
window.addEventListener('load', () => {
    if (localStorage.getItem('notes')) {
        messages = JSON.parse(localStorage.getItem('notes'));

        // Clear the current noteSection
        noteSection.innerHTML = '';

        // Repopulate the HTML note-section
        messages.forEach((message) => {
            const messageElement = createMessage();
            messageElement.querySelector('textarea').value = message.text;
            noteSection.appendChild(messageElement);
        });
    }
});
