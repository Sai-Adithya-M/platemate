---
title: PlateMate: The Offline Ingredient Guardian I Built So My Roommate Elena Can Eat Without Fear
published: true
tags: devchallenge, weekendchallenge, hf26challenge
---

*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

---

## What I Built

I built **PlateMate** for my roommate and close friend, **Elena**.

Elena has severe **Celiac disease** (meaning even a breadcrumb of gluten causes her immune system to attack her own gut), plus an anaphylactic **tree nut allergy** and lactose sensitivity. 

If you don't have food allergies, grocery shopping is just grabbing what looks tasty. But whenever Elena and I go grocery shopping together, I watch her stand in front of shelves squinting at tiny font lists on the back of boxes, trying to figure out if ingredients like *"malted barley syrup"*, *"hydrolyzed wheat protein"*, or *"praline"* are going to make her sick. 

Cooking together in our apartment has also been stressful. We love having roommate dinner nights, but Elena is always worried about cross-contamination from our shared pots and cutting boards. And when we travel together, trying to explain her allergies to restaurant waiters who don't speak English is genuinely terrifying.

To make things worse: **grocery store basements almost never have cell reception.** Any standard cloud AI app just hangs on a loading spinner when you're standing in front of the pasta aisle.

So this weekend, I built **PlateMate**:
1. **Offline Ingredient Scanner**: Paste in any ingredient list or takeout menu. It instantly checks for direct allergens, sneaky disguised ingredients (like barley malt or spelt), and shared factory equipment warnings.
2. **Roommate Dinner Night Swaps**: Takes the meals our apartment loves (Creamy Garlic Fettuccine, Pesto, Fudgy Brownies, Thai Chicken Skewers) and gives us 1:1 ingredient substitutions so Elena can eat the exact same meal as everyone else, plus simple cleaning reminders for roommates.
3. **Waiter & Travel Cards**: Generates a clean card in 8 languages (English, Spanish, Italian, French, Japanese, German, Hindi) that Elena can show waiters on her phone or print out when traveling.
4. **100% Offline & Private**: Everything runs locally right inside her browser. No internet needed, no monthly subscription, and her medical history stays completely on her phone.

---

## Demo

Here is how PlateMate works:
- **Instant scan**: You paste the label of a snack bar, and it immediately highlights that while the front says "Oat Bar", the fine print contains *malted barley* and *almonds*.
- **Elena's Profile**: You can switch or tweak the allergy list if someone else is coming over for dinner.
- **Recipe Helper**: Instant swaps for butter, flour, and nuts that actually taste good and cook properly.
- **Waiter Cards**: Tap Italian or Japanese, and it renders a polite, medically accurate note explaining celiac disease and nut allergies in native phrasing.

You can try it directly by opening `index.html` in any browser, or running:

```bash
# Clone and run locally (no npm install or build step needed!)
git clone https://github.com/adithya/platemate.git
cd platemate
python3 -m http.server 8080
# Open http://localhost:8080
```

---

## Code

The project is completely open source under the **Apache 2.0** license:

- **Repository**: [PlateMate on GitHub](https://github.com/adithya/platemate) *(Feel free to fork or star!)*
- **Architecture**:
  - `index.html`: Clean, accessible single-page layout with zero heavy framework overhead.
  - `styles.css`: Warm, friendly dark-mode styling with print stylesheets for the waiter cards.
  - `app.js`: In-browser tokenizer, open-source AI integration, biochemical allergen taxonomy, and multilingual card dictionary.

---

## How I Built It & Where the Open Source AI Lives

I deliberately chose **not** to build this with a closed API like OpenAI or Claude. Instead, the entire AI layer is open source and runs locally:

1. **Hugging Face Transformers.js**: We import `@xenova/transformers` directly in the browser via CDN/Wasm. It runs open-weight quantized ONNX models (like `distilbert-base-uncased`) directly inside WebAssembly in the client's browser.
2. **Open Biochemical Allergen Taxonomy**: In `app.js`, I built an open, auditable knowledge tree mapping over 100 hidden derivative names (such as *spelt*, *kamut*, *farro*, *brewer's yeast*, *caseinate*, *whey isolate*, and *gianduja*).
3. **Local Hybrid Pipeline**: Text is normalized and parsed through the open semantic classifier. Once the model file is cached by the browser, it requires **zero internet connection** forever.

---

## Why Does Open Innovation Matter?

This challenge asks: *What did open innovation make possible that a closed API wouldn't?*

For someone like Elena, open innovation isn't a tech buzzword—it's the difference between an app that works in real life and one that is useless:

### 1. Trader Joe's Basements Don't Have WiFi
Most supermarkets in cities are built underground or in concrete boxes where cell reception drops to zero. If your allergy tool depends on a proprietary cloud endpoint, you get a network timeout error while standing in aisle 4. An open-weight model running locally in the browser works on airplane mode without a hitch.

### 2. My Roommate's Health Data Isn't For Sale
Food allergies and autoimmune diseases are private medical information. Closed cloud APIs log conversations, use user inputs for model training, or monetize consumer behavioral profiles. With open-source local inference, Elena's health vulnerabilities never leave her phone.

### 3. Safety Should Be Free
Living with Celiac disease is already expensive—gluten-free bread and safe snacks cost nearly double standard groceries. Putting safety tools behind a $20/month subscription or per-token API fee is unfair. Open source means this can be a free, permanent utility for anyone who needs it.

### 4. You Can't Afford Hallucinations When Anaphylaxis is on the Line
Closed models frequently update in the background with shifting prompt behaviors. With an open-source codebase, the allergen detection pathways and rules are completely transparent, testable, and community-auditable.

---

## The Handover: What Elena Said

Last night, I handed Elena my phone in airplane mode and told her to test it on the random snack box we had in our pantry. 

She ran it on a cereal bar that she'd been hesitant to eat. The app immediately flagged *malted barley syrup* in red.

She looked up at me and said:
> *"Wait, it actually caught malted barley?! Most people just scan for the word 'wheat' and tell me it's safe when it's totally not. And it works with no signal? Can you send me this link right now?"*

Seeing her sigh with relief and knowing we can cook dinner together without stress made this entire weekend project worth every minute.

Happy Hacktoberfest! 🎃🍁
