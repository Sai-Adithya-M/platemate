# PlateMate AI 🛡️🍽️
### Open-Source, Local-First Allergy Guardian Built for Elena
> **A Submission for the [DEV Hacktoberfest 2026 Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)**

---

## 🌟 The Story: Built for Elena
My roommate and close friend **Elena** has severe **Celiac Disease (Gluten-Free)** alongside an **anaphylactic Tree Nut allergy** and lactose sensitivity. 

Living with severe food allergies turns daily activities into emotional minefields:
- Grocery shopping means standing in crowded supermarket aisles squinting at tiny font labels, decoding obscure biochemical derivative names (*"malted barley extract"*, *"hydrolyzed wheat protein"*, *"sodium caseinate"*, *"praline"*).
- Eating out or cooking together with roommates requires constant anxiety about cross-contamination and shared cookware.
- Most grocery store basements and underground subways have **zero cellular reception**, making cloud-dependent AI tools completely useless.
- Elena didn't want to upload her private medical vulnerabilities to cloud servers that track consumer behavioral profiles.

**PlateMate** is built specifically for her: an open-source, client-side intelligent ingredient analyzer and recipe safe-swapper that runs **100% locally in the browser with zero cloud server, zero tracking, and zero API costs**.

---

## ✨ Features

- **🔍 Local AI Ingredient Inspector**: Paste any ingredient label or menu description. The local NLP parser decomposes ingredients against known biochemical synonyms and hidden covert derivatives.
- **⚡ Instant Safety Verdict & Radar**: Calculates an objective Safety Score (0-100%) with categorized hazard tags (`DIRECT`, `COVERT`, `CROSS-CONTAMINATION`).
- **🍲 Safe Recipe Transformer**: Adapts classic roommate meals (Fettuccine Alfredo, Genovese Pesto, Fudgy Brownies, Chicken Satay) into 100% allergy-safe equivalents with precise 1:1 culinary substitutions.
- **🌍 Multilingual Chef Alert Cards**: Generates printable and savable restaurant cards in **8 languages** (English, Spanish, Italian, French, Japanese, German, Hindi) that Elena can present to restaurant servers or chefs when traveling.
- **🔒 100% Offline & Private**: Powered by client-side Transformers.js and WebAssembly. No health data ever leaves your device. Works seamlessly on airplane mode.

---

## 🧠 Why Open Innovation Matters Here

1. **Aisles Have No Internet**: Closed commercial APIs (OpenAI, Claude) fail the moment you walk into a grocery store basement or rural market. Open-weight in-browser inference guarantees instant access anywhere.
2. **Zero Health Surveillance**: Food allergies and dietary restrictions are sensitive personal health information. PlateMate runs inside the client sandbox—no tracking, no telemetry, no corporate monetisation.
3. **Permanent Free Utility**: Chronic illness and allergy-friendly foods already carry a hefty financial premium. Open-source local inference ensures safety tools cost $0.00 forever.
4. **Verifiable & Deterministic Safety**: In allergy care, hallucinations can cause anaphylaxis. Open-source code allows public auditing, transparency, and deterministic safeguards.

---

## 🚀 Quick Start

PlateMate requires **no build step, no npm install, and no environment keys**.

### Option 1: Open Directly
Simply open `index.html` in any modern web browser!

### Option 2: Run via Local Server
```bash
# Python 3
python3 -m http.server 8080

# Or Node.js
npx serve .
```
Navigate to `http://localhost:8080`.

---

## 🛠️ Tech Stack

- **Core**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Open AI Inference**: [Transformers.js](https://huggingface.co/docs/transformers.js) / ONNX Runtime WebAssembly & Biochemical Allergen Ontology
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*)
- **License**: Apache 2.0 (Open Source)

---

Built with ❤️ for Elena for **Hacktoberfest 2026**.
