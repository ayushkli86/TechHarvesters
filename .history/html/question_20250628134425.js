document.addEventListener('DOMContentLoaded', function() {
  const diseaseQnA = [
    {
      disease: "early blight",
      crop: "tomato",
      diagnosis: 'The plant is showing signs of <b>Early Blight</b> (caused by <i>Alternaria solani</i>).',
      prevention: 'Use crop rotation, plant resistant varieties, and avoid overhead irrigation.',
      pesticides: 'Copper hydroxide, Chlorothalonil, Mancozeb, Azoxystrobin.',
      caution: 'Do not apply fungicides during hot midday hours. Wear gloves and avoid inhalation.'
    },
    {
      disease: "late blight",
      crop: "tomato",
      diagnosis: 'The plant is showing signs of <b>Late Blight</b> (caused by <i>Phytophthora infestans</i>).',
      prevention: 'Plant certified seeds, avoid overhead watering, ensure air circulation.',
      pesticides: 'Metalaxyl, Mancozeb, Cymoxanil, Dimethomorph.',
      caution: 'Spray only during dry weather. Keep children and animals away for 24 hours.'
    },
    {
      disease: "late blight",
      crop: "potato",
      diagnosis: 'The potato plant is showing signs of <b>Late Blight</b> (caused by <i>Phytophthora infestans</i>).',
      prevention: 'Avoid waterlogging, plant in well-drained soil, and destroy infected debris.',
      pesticides: 'Chlorothalonil, Cymoxanil, Mandipropamid, Propamocarb.',
      caution: 'Wash hands thoroughly after spraying. Avoid mixing incompatible chemicals.'
    },
    {
      disease: "early blight",
      crop: "potato",
      diagnosis: 'The potato plant shows signs of <b>Early Blight</b> (caused by <i>Alternaria solani</i>).',
      prevention: 'Remove crop residues, rotate crops, and apply mulch to reduce spore spread.',
      pesticides: 'Mancozeb, Azoxystrobin, Chlorothalonil, Captan.',
      caution: 'Avoid spraying just before harvest. Follow dosage instructions precisely.'
    },
    {
      disease: "blackleg",
      crop: "potato",
      diagnosis: 'The potato plant is affected by <b>Blackleg</b> (caused by <i>Pectobacterium atrosepticum</i>).',
      prevention: 'Use clean seeds, maintain good soil drainage, disinfect tools.',
      pesticides: 'No specific fungicides; use biological treatments like Trichoderma or Copper-based products.',
      caution: 'Don\'t replant in affected soil the following season. Sanitize all equipment.'
    }
  ];

  chatSend.onclick = function() {
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
  };
});
