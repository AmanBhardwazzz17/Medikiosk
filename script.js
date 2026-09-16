// Step Navigation for Kiosk View
function goToStep(stepNumber) {
    document.querySelectorAll('.card-step').forEach(card => card.classList.remove('active-card'));
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));

    document.getElementById(`step${stepNumber}Card`).classList.add('active-card');
    document.getElementById(`step${stepNumber}-indicator`).classList.add('active');
}

// Tab Switcher for SOCRATES & Dashavidha
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Voice Speech-to-Text (Bhashini AI Simulation)
let recognition;
function toggleSpeech() {
    const micBtn = document.getElementById('micBtn');
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("Speech Recognition is not supported in this browser. Please use Chrome or Edge.");
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    const langSelect = document.getElementById('langSelect').value;
    recognition.lang = langSelect === 'hi' ? 'hi-IN' : 'en-US';

    recognition.onstart = function() {
        micBtn.style.background = "#2ed573";
        micBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Listening... Speak now`;
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('socratesInput').value += " " + transcript;
        micBtn.style.background = "#ff4757";
        micBtn.innerHTML = `<i class="fa-solid fa-microphone"></i> Speak Answer (Bhashini Speech-to-Text)`;
    };

    recognition.onerror = function() {
        micBtn.style.background = "#ff4757";
        micBtn.innerHTML = `<i class="fa-solid fa-microphone"></i> Retry Voice Input`;
    };

    recognition.start();
}

// File Upload & OCR Simulation
function triggerFileUpload() {
    document.getElementById('fileInput').click();
}

function handleOCRScan(event) {
    const file = event.target.files[0];
    if (file) {
        const ocrStatus = document.getElementById('ocrStatus');
        ocrStatus.style.display = 'block';
        ocrStatus.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Extracting medical records using OCR...`;

        setTimeout(() => {
            ocrStatus.innerHTML = `<i class="fa-solid fa-circle-check" style="color:green;"></i> <strong>OCR Scan Complete:</strong> Found previous prescription (Hypertension - Amlodipine 5mg).`;
        }, 1800);
    }
}

// Screen Switcher Logic (Kiosk <-> Doctor Dashboard)
function toggleView() {
    const kiosk = document.getElementById('patientKiosk');
    const docDash = document.getElementById('doctorDashboard');
    const toggleBtn = document.getElementById('viewToggleBtn');

    if (kiosk.classList.contains('active')) {
        kiosk.classList.remove('active');
        docDash.classList.add('active');
        toggleBtn.innerHTML = `<i class="fa-solid fa-desktop"></i> Switch to Kiosk View`;
    } else {
        docDash.classList.remove('active');
        kiosk.classList.add('active');
        toggleBtn.innerHTML = `<i class="fa-solid fa-user-doctor"></i> Switch to Doctor Dashboard`;
    }
}

function submitKioskData() {
    alert("Case Taking Complete! Redirecting to Doctor's Dashboard...");
    toggleView();
}

function pushToABDM() {
    alert("Clinical Summary converted to FHIR JSON format and pushed to ABDM & Hospital Information System (HIS)!");
}