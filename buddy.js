// 🌐 Health Buddy AI Assistant JavaScript (with Voice Recognition)

// Default language
let currentLanguage = 'en'; // 'en' for English, 'hi' for Hindi

// Disease data with images and videos
const diseaseData = {
    photos: [
        { name: 'Common Cold', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop', description: 'Symptoms of common cold' },
        { name: 'Fever', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop', description: 'Fever symptoms and care' },
        { name: 'Headache', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop', description: 'Types of headaches' },
        { name: 'Cough', image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop', description: 'Cough symptoms' },
        { name: 'Diabetes', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop', description: 'Diabetes information' },
        { name: 'Hypertension', image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop', description: 'Blood pressure health' },
        { name: 'Asthma', image: 'https://images.unsplash.com/photo-1588776814546-32a96c6f5a2c?w=400&h=300&fit=crop', description: 'Asthma management' },
        { name: 'Allergy', image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop', description: 'Allergy information' }
    ],
    videos: [
        { name: 'Understanding Diabetes', videoId: 'dQw4w9WgXcQ', description: 'Learn about diabetes management' },
        { name: 'Heart Health', videoId: 'dQw4w9WgXcQ', description: 'Cardiovascular health tips' },
        { name: 'Mental Health', videoId: 'dQw4w9WgXcQ', description: 'Mental wellness guide' },
        { name: 'Nutrition Basics', videoId: 'dQw4w9WgXcQ', description: 'Healthy eating habits' },
        { name: 'Exercise & Fitness', videoId: 'dQw4w9WgXcQ', description: 'Physical activity benefits' },
        { name: 'Sleep Hygiene', videoId: 'dQw4w9WgXcQ', description: 'Quality sleep tips' }
    ]
};

// Symptom checker responses
const symptomResponses = {
    'headache': {
        en: 'Headaches can be caused by various factors including stress, dehydration, or eye strain. Try resting in a dark room, staying hydrated, and applying a cold compress. If headaches persist or are severe, consult a healthcare professional.',
        hi: 'सिरदर्द तनाव, निर्जलीकरण, या आंखों के तनाव सहित विभिन्न कारकों के कारण हो सकता है। एक अंधेरे कमरे में आराम करें, हाइड्रेटेड रहें, और ठंडा कंप्रेस लगाएं। यदि सिरदर्द बना रहता है या गंभीर है, तो डॉक्टर से परामर्श करें।'
    },
    'fever': {
        en: 'Fever is usually a sign that your body is fighting an infection. Rest, stay hydrated, and take over-the-counter fever reducers if needed. If fever is high or lasts more than 3 days, seek medical attention.',
        hi: 'बुखार आमतौर पर संक्रमण का संकेत है। आराम करें, हाइड्रेटेड रहें, और यदि आवश्यक हो तो बुखार कम करने वाली दवा लें। यदि बुखार अधिक है या 3 दिनों से अधिक रहता है, तो डॉक्टर से मिलें।'
    },
    'cough': {
        en: 'Coughs can be caused by colds, allergies, or respiratory infections. Stay hydrated, use a humidifier, and avoid irritants. If cough is persistent or severe, see a doctor.',
        hi: 'खांसी सर्दी, एलर्जी, या श्वसन संक्रमण के कारण हो सकती है। हाइड्रेटेड रहें, ह्यूमिडिफायर का उपयोग करें, और धूल या धुएं से बचें।'
    },
    'cold': {
        en: 'Common cold symptoms include runny nose, sneezing, and congestion. Rest well, drink fluids, and use saline sprays. Usually improves in 7–10 days.',
        hi: 'सर्दी के लक्षणों में बहती नाक, छींक, और जकड़न शामिल है। आराम करें, तरल पदार्थ पिएं, और नमक वाले स्प्रे का उपयोग करें। सामान्यतः 7-10 दिनों में ठीक हो जाता है।'
    },
    'default': {
        en: 'Monitor your health and rest well. If symptoms persist or worsen, please consult a healthcare professional.',
        hi: 'अपनी स्थिति की निगरानी करें और आराम करें। यदि लक्षण बने रहते हैं या बढ़ते हैं, तो डॉक्टर से परामर्श करें।'
    }
};

// Chatbot responses
const chatbotResponses = {
    en: {
        'hello': 'Hello! How can I help you today?',
        'help': 'I can assist you with health info, symptom guidance, or wellness tips. What would you like to know?',
        'fever': 'Fever is usually due to infection. Rest and stay hydrated.',
        'headache': 'Try resting, hydrating, and avoiding stress. If persistent, see a doctor.',
        'default': 'Thank you for asking. For serious symptoms, consult a doctor.'
    },
    hi: {
        'hello': 'नमस्ते! मैं आपकी कैसे मदद कर सकता हूं?',
        'help': 'मैं स्वास्थ्य जानकारी, लक्षण मार्गदर्शन या वेलनेस सुझावों में आपकी सहायता कर सकता हूं।',
        'fever': 'बुखार आमतौर पर संक्रमण के कारण होता है। आराम करें और हाइड्रेटेड रहें।',
        'headache': 'आराम करें, पानी पिएं और तनाव से बचें। लगातार रहने पर डॉक्टर से मिलें।',
        'default': 'धन्यवाद! यदि लक्षण गंभीर हैं तो डॉक्टर से परामर्श करें।'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeDiseasePhotos();
    initializeDiseaseVideos();
    initializeVoiceRecognition(); // 🗣 initialize voice
    checkAuth();
});

// ✅ Voice Recognition Setup
let recognition;
function initializeVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        console.warn('Voice recognition not supported in this browser.');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';

    // 🎙 Chat Voice Button
    const chatMic = document.getElementById('chatMic');
    if (chatMic) {
        chatMic.addEventListener('click', () => {
            recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
            recognition.start();
            chatMic.classList.add('listening');
        });
    }

    // 🎙 Symptom Voice Button
    const symptomMic = document.getElementById('symptomMic');
    if (symptomMic) {
        symptomMic.addEventListener('click', () => {
            recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
            recognition.start();
            symptomMic.classList.add('listening');
        });
    }

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.trim();
        if (chatMic && chatMic.classList.contains('listening')) {
            document.getElementById('chatInput').value = transcript;
            sendMessage();
            chatMic.classList.remove('listening');
        } else if (symptomMic && symptomMic.classList.contains('listening')) {
            document.getElementById('symptomInput').value = transcript;
            checkSymptoms();
            symptomMic.classList.remove('listening');
        }
    };

    recognition.onerror = function (event) {
        console.error('Voice recognition error:', event.error);
        chatMic?.classList.remove('listening');
        symptomMic?.classList.remove('listening');
    };
}

// ✅ Authentication check (dummy for now)
async function checkAuth() {
    const authLink = document.getElementById('authLink');
    authLink.textContent = 'Login';
    authLink.href = 'login.html';
}

// ✅ Set Language
function setLanguage(lang) {
    currentLanguage = lang;
    if (recognition) recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
}

// ✅ Symptom Checker
async function checkSymptoms() {
    const symptomInput = document.getElementById('symptomInput');
    const symptomResult = document.getElementById('symptomResult');
    const symptomAnalysis = document.getElementById('symptomAnalysis');
    const symptoms = symptomInput.value.trim();
    
    if (!symptoms) {
        alert(currentLanguage === 'hi' ? 'कृपया अपने लक्षण दर्ज करें' : 'Please enter your symptoms');
        return;
    }

    // Show loading state
    symptomAnalysis.textContent = currentLanguage === 'hi' ? 'विश्लेषण कर रहा है...' : 'Analyzing...';
    symptomResult.classList.add('show');
    symptomInput.disabled = true;

    try {
        // Check if user is logged in
        if (!authAPI.isLoggedIn()) {
            // Fallback to local responses if not logged in
            const symptomsLower = symptoms.toLowerCase();
            let response = symptomResponses['default'][currentLanguage];
            for (const key in symptomResponses) {
                if (symptomsLower.includes(key)) {
                    response = symptomResponses[key][currentLanguage];
                    break;
                }
            }
            symptomAnalysis.textContent = response;
            symptomInput.value = '';
            symptomInput.disabled = false;
            return;
        }

        // Use Gemini API for analysis
        const result = await symptomsAPI.analyzeSymptoms(symptoms, currentLanguage);
        
        if (result.success) {
            symptomAnalysis.textContent = result.analysis;
        } else {
            // Fallback to local responses on error
            const symptomsLower = symptoms.toLowerCase();
            let response = symptomResponses['default'][currentLanguage];
            for (const key in symptomResponses) {
                if (symptomsLower.includes(key)) {
                    response = symptomResponses[key][currentLanguage];
                    break;
                }
            }
            symptomAnalysis.textContent = response;
        }
        symptomInput.value = '';
    } catch (error) {
        console.error('Symptom check error:', error);
        symptomAnalysis.textContent = currentLanguage === 'hi' 
            ? 'त्रुटि हुई। कृपया बाद में पुन: प्रयास करें।'
            : 'An error occurred. Please try again later.';
    } finally {
        symptomInput.disabled = false;
    }
}

// ✅ Chatbot
async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    chatInput.value = '';
    chatInput.disabled = true;

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot';
    typingIndicator.id = 'typing-indicator';
    typingIndicator.textContent = currentLanguage === 'hi' ? 'टाइप कर रहा है...' : 'Typing...';
    document.getElementById('chatMessages').appendChild(typingIndicator);
    document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;

    try {
        // Check if user is logged in
        if (!authAPI.isLoggedIn()) {
            // Fallback to local responses if not logged in
            const botResponse = getBotResponse(message);
            document.getElementById('typing-indicator').remove();
            addMessage(botResponse, 'bot');
            chatInput.disabled = false;
            return;
        }

        // Use Gemini API for response
        const result = await chatAPI.generateResponse(message, currentLanguage);
        
        document.getElementById('typing-indicator').remove();
        
        if (result.success) {
            addMessage(result.response, 'bot');
        } else {
            // Fallback to local responses on error
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }
    } catch (error) {
        console.error('Chat error:', error);
        document.getElementById('typing-indicator').remove();
        const errorMsg = currentLanguage === 'hi' 
            ? 'त्रुटि हुई। कृपया बाद में पुन: प्रयास करें।'
            : 'An error occurred. Please try again later.';
        addMessage(errorMsg, 'bot');
    } finally {
        chatInput.disabled = false;
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') sendMessage();
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    // set class to "message <sender>" (e.g. "message user" or "message bot")
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    const msg = message.toLowerCase();
    const responses = chatbotResponses[currentLanguage];
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('नमस्ते')) return responses['hello'];
    if (msg.includes('help') || msg.includes('मदद')) return responses['help'];
    if (msg.includes('fever') || msg.includes('बुखार')) return responses['fever'];
    if (msg.includes('headache') || msg.includes('सिरदर्द')) return responses['headache'];
    return responses['default'];
}

// ✅ Disease Photos
function initializeDiseasePhotos() {
    const photosContainer = document.getElementById('diseasePhotos');
    diseaseData.photos.forEach(disease => {
        const div = document.createElement('div');
        div.className = 'media-item';
        div.innerHTML = `
            <img src="${disease.image}" alt="${disease.name}">
            <div class="media-overlay">
                <h4>${disease.name}</h4>
                <p>${disease.description}</p>
            </div>`;
        photosContainer.appendChild(div);
    });
}

// ✅ Disease Videos
function initializeDiseaseVideos() {
    const videosContainer = document.getElementById('diseaseVideos');
    diseaseData.videos.forEach(video => {
        const div = document.createElement('div');
        div.className = 'media-item';
        div.innerHTML = `
            <div style="position:relative;width:100%;padding-bottom:75%;background:#4c51bf;border-radius:10px;">
                <div style="position:absolute;color:white;text-align:center;padding:20px;">
                    <div style="font-size:3rem;">▶</div>
                    <h4>${video.name}</h4>
                    <p>${video.description}</p>
                </div>
            </div>`;
        div.onclick = () => alert(`Video: ${video.name}\n\n${video.description}`);
        videosContainer.appendChild(div);
    });
}