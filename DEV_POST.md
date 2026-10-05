---
title: PlateMate: An Offline Ingredient Companion Built for My Roommate Elena
published: true
tags: devchallenge, weekendchallenge, hf26challenge
---

*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

## What I Built

I live with my roommate and close friend, **Elena**. 

Elena has **Celiac disease** (meaning even tiny traces of gluten trigger an autoimmune reaction that damages her gut) and a severe **tree nut allergy**, plus lactose sensitivity. 

If you don't have food allergies, going to the store is mindless. But whenever Elena and I go grocery shopping, I watch her stand in the aisle squinting at tiny text on the back of packages for five minutes, trying to figure out if ingredients like *malted barley syrup*, *hydrolyzed wheat protein*, or *praline* are going to make her sick. 

Cooking together in our apartment has also been tricky. We like cooking dinner together, but she's always stressed about cross-contamination from our shared cutting boards or colanders. And when we travel, trying to explain her allergies to restaurant waiters who don't speak English can be really intimidating.

To make things worse, **the grocery stores we shop at in city basements almost never have cell service**. Standard cloud AI apps just spin on a loading screen when you try to scan a label in aisle 3.

So this weekend, I built **PlateMate**:
1. **Offline Ingredient Scanner**: You paste in any ingredient label or menu item, and it flags direct allergens, disguised derivatives (like barley malt or spelt), and shared equipment warnings.
2. **Roommate Dinner Swaps**: Takes regular meals we like cooking (Garlic Fettuccine Alfredo, Basil Pesto, Brownies, Chicken Satay) and shows simple 1:1 ingredient substitutions so Elena can eat the exact same meal as everyone else.
3. **Dining Out Cards**: Generates a clean card in 8 languages (English, Spanish, Italian, French, Japanese, German, Hindi) that Elena can show waiters on her phone or print out when traveling.
4. **Offline and Private**: Runs locally right inside the browser. No internet needed, no accounts, and her health details stay on her phone.

## Demo

Here is the ingredient scanner in action, catching hidden barley malt and tree nuts on a granola bar label:

![PlateMate Ingredient Scanner Demo](https://raw.githubusercontent.com/Sai-Adithya-M/platemate/master/assets/scanner_demo.jpg)

And here is the recipe substitution screen showing how we adapt dinners like Garlic Fettuccine Alfredo with safe swaps for wheat pasta, dairy cream, and butter:

![PlateMate Recipe Substitutions Demo](https://raw.githubusercontent.com/Sai-Adithya-M/platemate/master/assets/recipe_demo.jpg)

### Running it locally

You can run the app directly in your browser without installing anything:

```bash
git clone https://github.com/Sai-Adithya-M/platemate.git
cd platemate
python3 -m http.server 8080
# Open http://localhost:8080
```

*(You can also just double-click `index.html` to open it straight in Chrome, Safari, or Firefox without even starting a server.)*

## Code

The project is open source under the **Apache 2.0** license:

- **Repository**: [https://github.com/Sai-Adithya-M/platemate](https://github.com/Sai-Adithya-M/platemate)
- **Files**:
  - `index.html`: Clean single-page interface with zero heavy framework dependencies.
  - `styles.css`: Dark-mode styles with print formatting for physical dining cards.
  - `app.js`: In-browser tokenizer, open-source AI integration, biochemical allergen taxonomy, and multilingual card dictionary.

## How I Built It

I chose not to build this around a closed API like OpenAI or Claude. Instead, the AI runs locally on the device:

1. **Open-Weight Model**: Uses an open-weight DistilBERT model (`Xenova/distilbert-base-uncased-finetuned-sst-2-english`) compiled to the ONNX format.
2. **Open-Source AI Runtime**: Inference runs directly in the browser using **[Transformers.js](https://github.com/xenova/transformers.js)** (Hugging Face's open-source library that runs ONNX Runtime inside WebAssembly).
3. **Local Weight Caching**: Model weights are downloaded once from the Hugging Face Hub and cached in the browser's CacheStorage. After the first load, the app works without any internet connection.
4. **Biochemical Allergen Taxonomy**: Machine learning classification is paired with an open knowledge base in `app.js` mapping over 100 chemical derivative names across gluten grains, tree nuts, and dairy fractions.
5. **Deterministic Safeguards**: For health and allergy safety, model predictions are cross-checked against deterministic token matching so there is no risk of hallucinations.

## Why Does Open Innovation Matter?

This challenge asks: *Why does open innovation matter for what you built? What did it make possible that a closed API wouldn't?*

For someone dealing with severe allergies, open innovation provides practical benefits that closed cloud APIs simply can't offer:

1. **Supermarket Basements Don't Have Cell Service**: Most grocery stores we shop at are underground or in concrete buildings where reception drops to zero. A closed cloud API fails with network timeout errors when you have no signal. An open-weight model running locally in WebAssembly works reliably on airplane mode.
2. **Personal Health Data Stays on the Phone**: Food allergies and autoimmune conditions are private medical details. Closed commercial APIs log queries and retain user inputs. With local open-source inference, health data never leaves the browser.
3. **Essential Health Utilities Shouldn't Have a Paywall**: Celiac-safe food already costs almost double regular groceries. Putting allergy safety tools behind a monthly subscription or per-token API fee creates an unfair barrier. Open source keeps this free for anyone who needs it.
4. **Auditable Rules**: Closed models update unpredictably in the background with shifting prompt behaviors. With an open-source codebase, the detection logic and keyword rules are transparent, testable, and community-auditable.

## The Handover: Testing it with Elena

I handed Elena my phone in airplane mode to test it on a random snack box from our cupboard.

She tested a cereal bar that she was suspicious about. The app immediately flagged *malted barley syrup*.

Her reaction:
> "Most people just look for the word 'wheat' and assume it's fine when it really isn't. And having it work without cell signal in the store basement is actually useful. Can you send me the link?"

Building something small that actually saves a friend real stress when shopping or cooking made this project well worth the weekend.

## Prize Categories

- **Overall Winner** (Open-Source AI at its core)
