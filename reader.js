const noteSection = document.getElementById('notes-section');
const updateTimeSection = document.getElementById('update-time');

function updateTime(){
    const currentTime = new Date();
    updateTimeSection.textContent = `updated at: ${currentTime.toLocaleTimeString()}`;
}

function createMessage(messageText) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'div-readers-note';

    messageDiv.textContent = messageText;
    return messageDiv;
}

function showMessage() {
    if (localStorage.getItem('notes')) {
        const messages = JSON.parse(localStorage.getItem('notes'));

        // Clear the current noteSection
        noteSection.innerHTML = '';

        // Repopulate the HTML note-section
        messages.forEach((message) => {
            if (message.text) {
                const messageElement = createMessage(message.text);
                noteSection.appendChild(messageElement);
            }
        });
        updateTime();
    }
}

showMessage();
setInterval(showMessage, 2000);
