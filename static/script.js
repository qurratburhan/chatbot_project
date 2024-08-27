document.getElementById('send-button').addEventListener('click', sendMessage);

document.getElementById('message').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageInput = document.getElementById('message');
    const userMessage = messageInput.value;

    if (userMessage.trim() !== '') {
        // Display user message
        const chatBox = document.getElementById('chat-box');
        chatBox.innerHTML += `<div class="user-message">You: ${userMessage}</div>`;
        messageInput.value = '';

        // Send message to server and get response
        fetch('/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            const chatbotResponse = data.response;
            chatBox.innerHTML += `<div class="chatbot-message">Chatbot: ${chatbotResponse}</div>`;
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
