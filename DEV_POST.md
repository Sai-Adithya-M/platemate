---
title: PlateMate: The Offline Ingredient Companion I Built for My Roommate Elena
published: true
tags: devchallenge, weekendchallenge, hf26challenge
---

*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

---

## What I Built

I built **PlateMate** for my roommate and close friend, **Elena**.

Elena has severe **Celiac disease** (meaning even a trace of gluten causes her immune system to attack her own gut), plus an anaphylactic **tree nut allergy** and lactose sensitivity. 

If you don't have food allergies, grocery shopping is straightforward. But whenever Elena and I shop together, I watch her stand in front of shelves squinting at tiny font lists on the back of boxes, trying to figure out if ingredients like *"malted barley syrup"*, *"hydrolyzed wheat protein"*, or *"praline"* are safe. 

Cooking together in our apartment has also been tricky. We like having roommate dinner nights, but Elena is understandably anxious about cross-contamination from shared pots and cutting boards. And when traveling, trying to explain her allergies to restaurant waiters who don't speak English can be stressful.

To make things harder: **grocery store basements almost never have cell reception.** Any standard cloud AI app just hangs on a loading spinner when you're standing in front of the shelf.

So this weekend, I built **PlateMate**:
1. **Offline Ingredient Scanner**: Paste in any ingredient list or takeout menu. It checks for direct allergens, disguised ingredients (like barley malt or spelt), and shared factory equipment warnings.
2. **Roommate Dinner Swaps**: Takes meals our apartment likes to cook (Creamy Garlic Fettuccine, Pesto, Brownies, Thai Chicken Skewers) and provides direct ingredient substitutions so Elena can eat the same meal as everyone else, plus simple cleaning reminders for roommates.
3. **Waiter & Travel Cards**: Generates a clean card in 8 languages (English, Spanish, Italian, French, Japanese, German, Hindi) that Elena can show waiters on her phone or print out when traveling.
4. **Offline & Private**: Everything runs locally inside the browser. No internet needed, no monthly subscription, and her medical history stays completely on her phone.

---

## Demo

Here is how PlateMate works:
- **Ingredient scan**: You paste the label of a snack bar, and it immediately flags that while the front says "Oat Bar", the fine print contains *malted barley* and *almonds*.
- **Elena's Profile**: You can switch or tweak the allergy list if someone else is coming over for dinner.
- **Recipe Helper**: Tested substitutions for butter, flour, and nuts that cook properly.
- **Waiter Cards**: Selecting Italian or Japanese renders a concise, medically accurate note explaining celiac disease and nut allergies in native phrasing.

You can try it directly by opening `index.html` in any browser, or running:

```bash
# Clone and run locally (no npm install or build step needed)
git clone https://github.com/adithya/platemate.git
cd platemate
python3 -m http.server 8080
# Open http://localhost:8080
```

---

## Code

The project is open source under the **Apache 2.0** license:

- **Repository**: [PlateMate on GitHub](https://github.com/adithya/platemate)
- **Architecture**:
  - `index.html`: Clean, accessible single-page layout without heavy framework overhead.
  - `styles.css`: Dark-mode styling with print stylesheets for physical waiter cards.
  - `app.js`: In-browser tokenizer, open-source AI integration, biochemical allergen taxonomy, and multilingual card dictionary.

---

## How I Built It & Where the Open Source AI Lives

I chose not to build this with a closed API like OpenAI or Claude. Instead, the entire AI layer is open source and runs locally:

1. **Hugging Face Transformers.js**: We import `@xenova/transformers` directly in the browser via CDN. It runs open-weight quantized ONNX models (like `distilbert-base-uncased`) directly inside WebAssembly in the client's browser.
2. **Open Biochemical Allergen Taxonomy**: In `app.js`, I built an open, auditable knowledge tree mapping over 100 hidden derivative names (such as *spelt*, *kamut*, *farro*, *brewer's yeast*, *caseinate*, *whey isolate*, and *gianduja*).
3. **Local Pipeline**: Text is normalized and parsed through the open semantic classifier. Once the model file is cached by the browser, it requires no internet connection.

---

## Why Does Open Innovation Matter?

This challenge asks: *What did open innovation make possible that a closed API wouldn't?*

For someone managing chronic allergies, open innovation provides practical advantages over closed cloud APIs:

### 1. Supermarket Basements Don't Have Reliable Cell Service
Many urban grocery stores are underground where cell reception drops. If your allergy tool depends on a remote cloud endpoint, you get network timeout errors while shopping. An open-weight model running locally in the browser works on airplane mode reliably.

### 2. Personal Health Data Stays on the Device
Food allergies and autoimmune conditions are private medical details. Closed cloud APIs often log conversations and use inputs for model training. With open-source local inference, health data never leaves the browser.

### 3. Essential Health Utilities Should Be Free
Living with Celiac disease is already expensive—gluten-free staples cost substantially more than standard groceries. Putting safety tools behind a subscription or per-token API fee creates an unnecessary barrier. Open source keeps this tool free for anyone who needs it.

### 4. Transparent and Auditable Detection Logic
Closed models update in the background with shifting prompt behaviors. With an open-source codebase, the allergen detection pathways and rules are transparent, testable, and community-auditable.

---

## The Handover: Testing with Elena

I handed Elena my phone in airplane mode to test it on a random snack box from our cupboard.

She ran it on a cereal bar that she was unsure about. The app flagged *malted barley syrup*.

Her reaction:
> "Most people just scan for the word 'wheat' and assume it's fine when it isn't. And having it work without cell signal in the store basement is actually useful. Can you send me the link?"

Being able to give a friend something that saves them real anxiety when shopping or cooking made this project well worth building.
