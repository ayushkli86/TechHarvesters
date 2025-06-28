document.addEventListener('DOMContentLoaded', function() {
  // Ensure required elements are available
  const chatInput = document.getElementById('chat-input');
  const chatBox = document.getElementById('chat-box');
  const photoPreview = document.getElementById('photo-preview');

  // Fallback appendMessage if not defined globally
  if (typeof appendMessage !== 'function') {
    window.appendMessage = function(msg, from) {
      const div = document.createElement('div');
      div.className = from === 'user' ? 'text-right mb-2' : 'text-left mb-2';
      div.innerHTML = `<span class="inline-block px-3 py-2 rounded-lg ${from==='user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-800'}">${msg}</span>`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
    };
  }

  if (typeof diseaseQnA === 'undefined') {
    console.error('diseaseQnA is not defined. Make sure disease_qna_data.js is loaded before question.js');
    return;
  }

  function handleChatSend() {
    if (photoPreview && photoPreview.innerHTML.trim() !== '') {
      // ... your photo logic ...
      return;
    }

    if (!chatInput) return;
    const userQuestion = chatInput.value.trim().toLowerCase();
    appendMessage(chatInput.value, 'user');
    chatInput.value = '';

    // Try to find the disease and crop in the question
    let found = null;
    for (const qna of diseaseQnA) {
      if (userQuestion.includes(qna.disease) && userQuestion.includes(qna.crop)) {
        found = qna;
        break;
      }
    }

    if (found) {
      // Determine which info types are requested
      let response = '🔍<br>';
      if (userQuestion.includes('diagnosis')) response += `<br><b>Diagnosis:</b> ${found.diagnosis}`;
      if (userQuestion.includes('prevention')) response += `<br><b>Prevention:</b> ${found.prevention}`;
      if (userQuestion.includes('pesticide')) response += `<br><b>Pesticides:</b> ${found.pesticides}`;
      if (userQuestion.includes('caution')) response += `<br><b>Caution:</b> ${found.caution}`;
      // If no specific info type, show all
      if (
        !userQuestion.includes('diagnosis') &&
        !userQuestion.includes('prevention') &&
        !userQuestion.includes('pesticide') &&
        !userQuestion.includes('caution')
      ) {
        response += `<br><b>Diagnosis:</b> ${found.diagnosis}`;
        response += `<br><b>Prevention:</b> ${found.prevention}`;
        response += `<br><b>Pesticides:</b> ${found.pesticides}`;
        response += `<br><b>Caution:</b> ${found.caution}`;
      }
      appendMessage(response, 'bot');
    } else {
      appendMessage("Sorry, I don't have information on that disease/crop combination.", 'bot');
    }
  }

  if (chatInput) {
    chatInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        handleChatSend();
      }
    });
  }
});
