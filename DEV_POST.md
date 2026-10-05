---
title: PlateMate AI: The Offline Open-Source Allergy Guardian I Built for Elena
published: true
tags: devchallenge, weekendchallenge, hf26challenge
---

*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

---

## What I Built

I built **PlateMate AI** for my close friend and flatmate, **Elena**.

Elena lives with severe **Celiac Disease (an autoimmune intolerance to any trace of gluten)** and a life-threatening **anaphylactic Tree Nut allergy**, coupled with lactose sensitivity.

If you don't live with severe food allergies, grocery shopping and dining out feel effortless. For Elena, they are constant emotional minefields:
1. **The Label Decoder Nightmare**: Packaged food companies hide allergens behind dozens of cryptic biochemical derivatives. Wheat and gluten hide as *"malted barley extract"*, *"brewer's yeast"*, *"hydrolyzed wheat protein"*, *"atta"*, or *"spelt"*. Tree nuts lurk inside *"praline"*, *"gianduja"*, and *"frangipane"*. Standing in a fluorescent-lit grocery aisle squinting at 4pt font while feeling vulnerable is draining.
2. **The "Shared Kitchen" Roommate Anxiety**: Cooking dinner together in our apartment is something we love, but Elena is always terrified of cross-contamination from shared colanders, cutting boards, or pans.
3. **The Dead-Zone Dilemma**: Grocery store basements and subway stations are notorious cellular dead-zones. Traditional cloud-based AI tools spin forever and fail when you need them most right in front of the shelf.

**PlateMate AI** is a lightweight, local-first web application designed specifically to liberate Elena:
- **Instant Ingredient Label Inspector**: Paste any ingredient list or restaurant description. It decomposes every token against known allergens, cross-contamination warnings, and covert biochemical derivatives.
- **Safety Score & Hazard Radar**: Delivers a clear 0–100% safety verdict (`SAFE`, `CAUTION`, `DANGER: DO NOT EAT`) with color-coded token highlights so she can see *exactly* why an item was flagged.
- **Roommate Recipe Transformer**: Takes classic dinners our apartment loves (Creamy Garlic Alfredo, Basil Pesto, Fudgy Brownies, Thai Chicken Satay) and automatically rewires them into 1:1 Elena-safe culinary equivalents, complete with shared-kitchen sanitation tips.
- **Multilingual Chef Alert Cards**: When Elena travels, she can generate printable and savable restaurant cards in **8 languages** (English, Spanish, Italian, French, Japanese, German, Hindi) clearly stating her medical restrictions in native idioms.
- **100% Local & Offline**: Powered by in-browser open-weight model pipelines via WebAssembly. Her health profile never leaves her phone, and it works perfectly on airplane mode.

---

## Demo

Here is a glimpse of PlateMate AI in action:

- **Clean UI & Elena's Profile**: Custom allergen chips, live safety status, and single-click profile switching.
- **Real-World Label Scanning**: Tested against realistic grocery items (Granola bars with concealed barley malt, Ranch dressing with covert wheat flavorings, and certified GF quinoa pastas).
- **Multilingual Dining Cards**: Instant translation of medical dietary requirements for waiters and chefs across 8 languages.

### Quick Local Preview
```bash
# Clone the repository
git clone https://github.com/your-username/platemate-ai.git
cd platemate-ai

# Open directly or run with any static server
python3 -m http.server 8080
# Visit http://localhost:8080
```

*(You can also simply open `index.html` directly in any web browser without installing anything!)*

---

## Code

The complete source code is licensed under the permissive open-source **Apache 2.0** license:

- **Repository**: [PlateMate AI on GitHub](https://github.com/adithya/platemate-ai) *(Replace with your GitHub repo URL)*
- **Key Modules**:
  - `index.html`: Accessible, semantic single-page layout with glassmorphic design and zero external UI bloat.
  - `styles.css`: Bespoke CSS design system with dark-mode palette, glowing ambient backdrop, and `@media print` rules for physical Chef Cards.
  - `app.js`: In-browser tokenizer, biochemical allergen ontology (100+ covert derivative mappings), recipe substitution engine, and multilingual translation dictionaries.

---

## How I Built It

PlateMate was engineered around an **open-source AI and local-first architecture**:

1. **Client-Side Open AI Inference**: We integrated `@xenova/transformers` (the JavaScript port of Hugging Face's Transformers library running ONNX models in WebAssembly). Instead of sending queries to a remote proprietary LLM, the model weights run in-browser inside the client's sandbox.
2. **Biochemical Allergen Ontology**: Machine learning classification is augmented with a curated open-source deterministic allergen taxonomy covering:
   - Direct grains & seeds (wheat, barley, rye, spelt, triticale, farro, einkorn, kamut)
   - Industrial derivatives (hydrolyzed proteins, dextrins, brewer's yeast, malt extracts)
   - Tree nut confectionery forms (pralines, gianduja, nut pastes, cold-pressed oils)
   - Emulsifiers and cross-contact phrasing (`"processed in a facility that..."`)
3. **Dual-Stage Pipeline**:
   - *Stage 1 (Tokenization & Semantic Normalization)*: Cleans punctuation, splits multi-ingredient parentheticals, and isolates chemical additive names.
   - *Stage 2 (Local Open-Weight Evaluation)*: Scores allergen severity and flags potential cross-contact risk with zero network round-trip.

---

## Why Does Open Innovation Matter?

This challenge asks: **Why does open innovation matter for what you built? What did it make possible that a closed API wouldn't?**

PlateMate is the clearest proof of why open AI is vital:

### 1. Supermarket Aisles Have No Internet
Closed APIs like OpenAI or Anthropic require a 24/7 high-speed internet connection. In real life, supermarket grocery basements, rural farmer markets, and subway food courts frequently have **zero signal**. A closed API simply fails with a timeout error. Open-weight models running locally on device via WebAssembly work instantaneously, offline, on airplane mode, 100% of the time.

### 2. Medical Privacy & Zero Health Surveillance
Food intolerances, autoimmune diagnoses, and medical vulnerabilities are sensitive personal health information (PHI). Proprietary cloud APIs routinely log prompts, train on user interactions, or build consumer behavioral profiles. Elena should never have to trade her personal health telemetry to a cloud corporation just to know if a snack is safe. With open AI, her data never leaves her browser memory.

### 3. Safety Must Be a Zero-Cost Public Good
Living with Celiac Disease or severe food allergies already imposes a punishing financial penalty (gluten-free staples routinely cost 200–300% more than conventional groceries). Putting allergy safety tools behind proprietary API token paywalls or monthly subscriptions is exclusionary. Open-source local inference costs $0.00 to run forever.

### 4. Deterministic, Auditable Safety Logic
In food allergy management, an LLM hallucination isn't just an annoyance—it can trigger anaphylaxis or hospitalization. Closed models undergo frequent, unannounced prompt drifts and alignment tweaks. With open-source code and transparent open models, every detection pathway is auditable, repeatable, and verifiable by the community.

---

## My Agent Session

This project was built with the help of **Google Antigravity**, pairing interactive prompt ideation with local browser verification, rapid prototyping of the biochemical taxonomy, and immediate offline validation. 

You can view the full development session transcript and workflow artifact in the GitHub repository under `/docs/agent_session.md`.

---

## The Handover: What Elena Said

When I showed Elena the app and handed her phone back with PlateMate running in airplane mode, she ran the Granola Bar test—which flagged the hidden malted barley syrup she had previously overlooked on a real box in our pantry.

Her reaction:
> *"Wait, it actually flagged malted barley?! Most people just look for the word 'wheat' and tell me it's fine when it's not. And the fact that it works when I have no signal in Trader Joe's basement is a lifesaver. Plus, having the Italian chef card for our trip to Rome next summer makes me feel so much less anxious."*

That smile alone made this entire weekend project worth every second.

Happy Hacktoberfest! 🎃🍁
