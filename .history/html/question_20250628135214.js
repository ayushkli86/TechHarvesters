document.addEventListener('DOMContentLoaded', function() {
  // diseaseQnA is now loaded from disease_qna_data.js

  function handleChatSend() {
    if (photoPreview.innerHTML.trim() !== '') {
      // ... your photo logic ...
      return;
    }

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

  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      handleChatSend();
    }
  });
  // Remove the chatSend.onclick handler so only Enter works
});
