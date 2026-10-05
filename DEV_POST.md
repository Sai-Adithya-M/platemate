---
title: PlateMate: An Offline Ingredient Companion Built for My Roommate Elena
published: true
tags: devchallenge, weekendchallenge, hf26challenge
---

*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

## What I Built

I built **PlateMate** for my roommate and close friend, **Elena**.

Elena has diagnosed **Celiac disease** (meaning even traces of gluten trigger an autoimmune response that damages her small intestine) and an anaphylactic **tree nut allergy**, alongside lactose sensitivity.

If you don't live with dietary restrictions, grocery shopping is simple. For Elena, every trip to the supermarket is an exhausting exercise in deciphering ingredient labels. Manufacturers frequently list allergens under obscure chemical names:
- Gluten hides under terms like *malted barley syrup*, *hydrolyzed wheat protein*, *brewer's yeast*, *spelt*, *farro*, or *semolina*.
- Tree nuts hide in pastes like *praline*, *gianduja*, *marzipan*, or *frangipane*.
- Cross-contact warnings are often buried in tiny italicized print at the very bottom of the package.

Cooking together in our apartment has also been a source of anxiety. We love making dinner together, but Elena worries about shared colanders, cutting boards, and cookware. When dining out or traveling, explaining these restrictions to busy restaurant staff in noisy environments—or in other languages—is stressful.

To complicate matters, **grocery stores and supermarket basements frequently have zero mobile signal**, making cloud-dependent AI tools freeze or time out right when you need them.

PlateMate solves this with four core features:
1. **Local Ingredient Inspector**: Scans ingredient lists from food packaging or menus, flagging direct allergens, concealed derivatives, and shared equipment warnings.
2. **Roommate Recipe Swaps**: Takes meals we cook at home (Garlic Alfredo, Pesto, Brownies, Chicken Satay) and provides tested 1:1 culinary substitutions so Elena can eat the same dish as everyone else.
3. **Dining Out Cards**: Generates clear, translated dietary alert cards in 8 languages (English, Spanish, Italian, French, Japanese, German, Hindi) that Elena can present to waitstaff.
4. **Offline and Private**: Runs entirely in the client browser with no external server requests, no user tracking, and no subscriptions.

## Demo

PlateMate runs as a single-page application directly in the browser:

- **Ingredient Scanning**: Paste an ingredient list or select one of the built-in test samples (such as a granola bar with hidden barley malt and almonds). The app parses the text and highlights the exact problematic terms in color.
- **Custom Profile**: Adjust Elena's profile to toggle specific allergens if cooking for other guests with different sensitivities.
- **Recipe Substitutions**: View practical alternatives for wheat flour, butter, and nuts along with prep notes to prevent cross-contamination.
- **Waiter Cards**: Switch languages to view localized restaurant notices formatted for readability on mobile screens or print.

You can run the app locally with any static web server:

```bash
# Clone the repository
git clone https://github.com/adithya/platemate.git
cd platemate

# Start local server
python3 -m http.server 8080
# Open http://localhost:8080 in your browser
```

*(You can also open `index.html` directly in any web browser without running a server or installing dependencies.)*

## Code

The source code is licensed under the **Apache 2.0** license:

- **Repository**: [https://github.com/adithya/platemate](https://github.com/adithya/platemate)
- **Files**:
  - `index.html`: Semantic, responsive interface with no heavy UI framework dependencies.
  - `styles.css`: Dark-mode interface with print formatting for physical waiter cards.
  - `app.js`: Client-side tokenizer, biochemical allergen ontology, recipe translation matrix, and model integration.

## How I Built It

PlateMate is architected around open-source AI and local inference:

1. **Open-Weight Model**: We use an open-weight DistilBERT model (`Xenova/distilbert-base-uncased-finetuned-sst-2-english`) compiled to the ONNX format.
2. **Open-Source AI Runtime**: Inference runs directly in the browser via **[Transformers.js](https://github.com/xenova/transformers.js)** (Hugging Face's open-source library that runs ONNX Runtime in WebAssembly).
3. **Local Weight Caching**: Model weights are fetched from Hugging Face Hub on first load and stored in the browser's CacheStorage API. Subsequent executions run entirely offline without network access.
4. **Biochemical Allergen Ontology**: Machine learning classification is paired with an open, auditable knowledge base in `app.js` that maps over 100 biochemical derivative names across gluten grains, tree nut preparations, and dairy fractions.
5. **Deterministic Safeguards**: For life-critical food safety, statistical model outputs are cross-verified against deterministic token parsing to prevent hallucinations.

## Why Does Open Innovation Matter?

The prompt asks: *Why does open innovation matter for what you built? What did it make possible that a closed API wouldn't?*

For personal health and dietary safety, open-source AI provides essential advantages over closed, proprietary APIs:

1. **Reliability in Offline Environments**: Supermarket aisles, underground subway shops, and rural food markets frequently lack cellular connectivity. A closed cloud API (like OpenAI or Anthropic) fails with network timeouts when there is no internet. An open-weight model running locally in WebAssembly works reliably without signal.
2. **Privacy for Sensitive Health Data**: Dietary restrictions and autoimmune conditions are personal medical details. Closed commercial APIs often log user queries and retain input data for internal training. With local open-source inference, Elena's medical profile never leaves her device.
3. **Zero Financial Barrier**: Managing Celiac disease already imposes high costs, as gluten-free groceries typically carry a 150-200% price premium over standard staples. Essential dietary safety tools should not be gated behind monthly API subscriptions or token paywalls. Open-source models allow this tool to remain free forever.
4. **Verifiable and Auditable Logic**: When dealing with severe allergies, silent model updates and prompt drift in commercial APIs can produce dangerous hallucinations. Open-source code allows every detection pathway, keyword rule, and model weight to be inspected and audited by the community.

## My Agent Session

This project was developed with the assistance of **Google Antigravity**, utilizing interactive agent sessions for rapid architectural planning, client-side inference configuration, and offline validation.

## Prize Categories

- **Overall Winner** (Open-Source AI at its core)
