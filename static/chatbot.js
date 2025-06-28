document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = sender === 'user' ? 'text-right mb-2' : 'text-left mb-2';
        msgDiv.innerHTML = `<span class="inline-block px-3 py-2 rounded-lg ${sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}">${text}</span>`;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    chatSend.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (!message) return;
        appendMessage('user', message);
        chatInput.value = '';
        fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        })
        .then(res => res.json())
        .then(data => {
            appendMessage('bot', data.answer);
        })
        .catch(() => {
            appendMessage('bot', 'Error: Could not reach the server.');
        });
    });

    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') chatSend.click();
    });
}); 