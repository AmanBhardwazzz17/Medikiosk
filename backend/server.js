const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- ROUTES ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mock Bhashini Voice Transcribe Route
// TODO: Replace with actual Bhashini API integration when API keys are available
app.post('/api/voice/transcribe', async (req, res) => {
  try {
    const { audioBlob, language } = req.body;
    
    // Validate API Key
    if (!process.env.BHASHINI_API_KEY) {
      console.warn("No BHASHINI_API_KEY found. Falling back to local browser speech API or simulated response.");
      // In a real scenario without a key, you might fail here. 
      // For this prototype, we might rely on the frontend Web Speech API if this fails.
      return res.status(503).json({ error: "Bhashini API key not configured on backend." });
    }

    // Actual Bhashini integration would go here.
    // Example: fetch('bhashini-endpoint', { method: 'POST', body: audioBlob, headers: { Authorization: ... } })
    
    res.json({ transcript: "This is a simulated transcript from the backend until Bhashini is hooked up." });
  } catch (error) {
    console.error("Transcription error:", error);
    res.status(500).json({ error: "Failed to transcribe audio" });
  }
});

// Mock LLM Clinical Structuring Route
// TODO: Replace with actual OpenAI/Gemini API integration when keys are available
app.post('/api/clinical/structure', async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!process.env.LLM_API_KEY) {
      console.warn("No LLM_API_KEY found.");
      return res.status(503).json({ error: "LLM API key not configured on backend." });
    }

    // Call OpenAI or Gemini API here to structure the `transcript` into SOCRATES format
    
    // Simulated structured response
    const structuredData = {
      socrates: {
        site: "Chest",
        onset: "Sudden",
        character: "Crushing",
        radiation: "Left arm",
        associations: "Sweating",
        timeCourse: "2 hours",
        exacerbating: "None",
        severity: 8
      },
      doctorNotes: "Extracted from voice transcript: " + transcript,
      finalDiagnosis: "Suspected ACS",
      isRedFlag: true
    };

    res.json(structuredData);
  } catch (error) {
    console.error("LLM Error:", error);
    res.status(500).json({ error: "Failed to structure clinical data" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
