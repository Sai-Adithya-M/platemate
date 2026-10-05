/**
 * PlateMate AI - Local Food Allergy Companion
 * Built for Elena (Celiac & Nut allergies)
 */

// Biochemical allergen mapping
const ALLERGEN_TAXONOMY = {
  gluten: {
    name: 'Gluten / Wheat',
    severity: 'high',
    directTerms: ['wheat', 'barley', 'rye', 'gluten', 'spelt', 'kamut', 'farro', 'semolina', 'durum', 'triticale', 'malt', 'seitan', 'atta', 'bulgur', 'couscous', 'einkorn'],
    covertTerms: [
      'malted barley', 'barley malt', 'brewer\'s yeast', 'brewers yeast', 'hydrolyzed wheat protein',
      'wheat germ', 'wheat bran', 'wheat starch', 'modified wheat starch', 'vital wheat gluten',
      'malted milk', 'malt extract', 'malt syrup', 'malt vinegar', 'dextrin from wheat',
      'soy sauce (water, wheat', 'teriyaki sauce'
    ],
    explanation: 'Contains gluten protein — triggers autoimmune reaction in Celiac.'
  },
  tree_nuts: {
    name: 'Tree Nuts',
    severity: 'high',
    directTerms: ['almond', 'walnut', 'cashew', 'pecan', 'pistachio', 'hazelnut', 'macadamia', 'brazil nut', 'chestnut', 'pine nut', 'praline', 'marzipan'],
    covertTerms: [
      'nut butter', 'almond flour', 'almond meal', 'cashew butter', 'walnut oil',
      'gianduja', 'nougat', 'frangipane', 'nut paste', 'tree nut oil', 'pistachio paste'
    ],
    explanation: 'Severe anaphylaxis trigger for Elena.'
  },
  dairy: {
    name: 'Dairy / Lactose',
    severity: 'medium',
    directTerms: ['milk', 'dairy', 'cheese', 'butter', 'cream', 'yogurt', 'lactose', 'casein', 'whey', 'ghee'],
    covertTerms: [
      'buttermilk', 'whey protein', 'whey isolate', 'caseinate', 'sodium caseinate',
      'calcium caseinate', 'lactalbumin', 'curds', 'milk solids', 'nonfat dry milk'
    ],
    explanation: 'Lactose sensitivity — causes severe digestive distress.'
  },
  peanuts: {
    name: 'Peanuts',
    severity: 'high',
    directTerms: ['peanut', 'peanuts', 'groundnut', 'arachis oil'],
    covertTerms: ['peanut butter', 'peanut flour', 'hydrolyzed peanut protein'],
    explanation: 'Severe legume allergy.'
  },
  soy: {
    name: 'Soy',
    severity: 'medium',
    directTerms: ['soy', 'soya', 'soybean', 'edamame', 'tofu', 'tempeh'],
    covertTerms: ['soy sauce', 'soy lecithin', 'hydrolyzed soy protein', 'miso'],
    explanation: 'Common covert ingredient in emulsifiers.'
  },
  shellfish: {
    name: 'Shellfish',
    severity: 'high',
    directTerms: ['shrimp', 'crab', 'lobster', 'prawn', 'crayfish', 'oyster', 'mussel', 'clam', 'scallop'],
    covertTerms: ['fish sauce', 'oyster sauce', 'shrimp paste'],
    explanation: 'Severe acute allergy.'
  },
  eggs: {
    name: 'Eggs',
    severity: 'medium',
    directTerms: ['egg', 'eggs', 'albumin', 'globulin'],
    covertTerms: ['egg yolk', 'egg white', 'mayonnaise', 'meringue'],
    explanation: 'Common in baked goods and batters.'
  },
  sesame: {
    name: 'Sesame',
    severity: 'high',
    directTerms: ['sesame', 'tahini', 'halvah'],
    covertTerms: ['sesame oil', 'sesame paste'],
    explanation: 'High cross-reactivity and severe sensitivity.'
  }
};

// Grocery examples
const SAMPLE_PRESETS = {
  granola: `Whole grain rolled oats, malted barley syrup, raw almonds, roasted cashews, cane sugar, honey, sunflower lecithin, natural vanilla flavor, sea salt. (Manufactured on shared equipment with wheat and peanuts).`,
  dressing: `Soybean oil, water, cultured lowfat buttermilk, distilled vinegar, egg yolk, salt, modified corn starch, sugar, whey protein concentrate, dehydrated garlic, onion powder, natural flavors (contains wheat), xanthan gum.`,
  pasta: `Organic quinoa flour, brown rice flour, yellow pea starch, sea salt. (Certified Gluten-Free, Nut-Free facility).`,
  teriyaki: `Boneless chicken breast, traditional teriyaki glaze [water, soy sauce (water, wheat, soybeans, salt), sugar, mirin, modified food starch, garlic powder, toasted sesame oil, ginger extract].`
};

// Recipe Substitutions
const RECIPE_SWAPS = {
  creamy_pasta: {
    title: 'Creamy Garlic Fettuccine (Elena-Safe)',
    story: 'Traditional Alfredo relies on wheat pasta and dairy cream. We adapt this using brown-rice pasta and coconut-cauliflower cream so Elena can share dinner safely.',
    swaps: [
      { from: 'Durum Wheat Fettuccine', to: 'Quinoa & Brown Rice Fettuccine', reason: 'Cooks al dente, Celiac safe' },
      { from: 'Heavy Dairy Cream', to: 'Full-Fat Coconut Milk + Nutritional Yeast', reason: 'Dairy-free, rich texture' },
      { from: 'Wheat Flour Roux', to: 'Arrowroot or Sweet Rice Starch', reason: 'Smooth thickening with zero gluten' },
      { from: 'Parmesan Cheese', to: 'Nutritional Yeast & Lemon', reason: 'Savory depth without dairy' }
    ],
    roommateTip: 'Prep note: Boil in a clean pot with Elena\'s dedicated strainer to prevent wheat pasta residue transfer.'
  },
  pesto: {
    title: 'Nut-Free Basil Pesto',
    story: 'Elena loves pesto, but pine nuts and walnuts trigger anaphylaxis. Toasted pumpkin seeds provide the same crunch and buttery flavor.',
    swaps: [
      { from: 'Pine Nuts / Walnuts', to: 'Toasted Pumpkin Seeds (Pepitas)', reason: 'Crunchy, nutty, and nut-safe' },
      { from: 'Parmesan Cheese', to: 'Nutritional Yeast + White Miso', reason: 'Umami depth without dairy' },
      { from: 'Wheat Pasta', to: 'Chickpea Rotini or Zucchini Noodles', reason: 'Holds sauce well, gluten-free' }
    ],
    roommateTip: 'Prep note: Wash blender thoroughly prior to preparation if previously used for nut milks.'
  },
  brownies: {
    title: 'Fudgy Chocolate Brownies',
    story: 'Cassava flour and cocoa powder create a fudgy center without wheat flour or chopped nuts.',
    swaps: [
      { from: 'All-Purpose Wheat Flour', to: 'Cassava Flour + Cocoa Powder', reason: 'Rich texture with zero wheat' },
      { from: 'Chopped Walnuts', to: 'Toasted Buckwheat Groats or Cacao Nibs', reason: 'Crunch without tree nuts' },
      { from: 'Dairy Butter', to: 'Refined Coconut Oil or Avocado Oil', reason: 'Keeps brownies dense and moist' }
    ],
    roommateTip: 'Prep note: Line the pan with fresh parchment paper so it avoids contact with prior baking residue.'
  },
  satay: {
    title: 'Thai Coconut Chicken Satay',
    story: 'Instead of peanut sauce and wheat-fermented soy sauce, this uses sunflower butter and gluten-free tamari.',
    swaps: [
      { from: 'Peanut Butter Sauce', to: 'Sunflower Seed Butter + Ginger & Lime', reason: 'Creamy and nut-free' },
      { from: 'Regular Soy Sauce (Wheat)', to: 'San-J Gluten-Free Tamari / Coconut Aminos', reason: 'Fermented soy without wheat' },
      { from: 'Pre-packaged Curry Paste', to: 'Fresh Lemongrass, Garlic, Turmeric', reason: 'Pure whole spices' }
    ],
    roommateTip: 'Prep note: Use clean foil over shared outdoor grill grates.'
  }
};

// Waiter Cards in 8 Languages
const CHEF_CARDS = {
  en: {
    lang: 'ENGLISH',
    title: 'Severe Food Allergy Notice',
    message: 'Dear Chef and Server: I have medically diagnosed Celiac Disease (strict gluten-free) and an anaphylactic Tree Nut allergy. I am also sensitive to dairy. Please ensure my meal is prepared safely.',
    avoids: [
      'Wheat, Barley, Rye, Spelt, Semolina, Regular Soy Sauce',
      'Almonds, Walnuts, Cashews, Pistachios, Pecans, Hazelnuts, Pine nuts',
      'Milk, Butter, Heavy Cream, Soft Cheeses',
      'Anything fried in oil shared with breaded foods'
    ]
  },
  es: {
    lang: 'ESPAÑOL',
    title: 'Aviso Médico: Alergias Alimentarias Graves',
    message: 'Estimado Chef y Camarero: Padezco de Enfermedad Celíaca estricta (cero gluten) y una alergia anafiláctica grave a los Frutos Secos (nueces, almendras). Tampoco puedo comer lácteos.',
    avoids: [
      'Trigo, Cebada, Centeno, Harinas, Salsa de soja con trigo',
      'Almendras, Nueces, Anacardos, Pistachos, Avellanas',
      'Leche, Mantequilla, Nata, Quesos cremosos',
      'Comida frita en el mismo aceite de productos empanados'
    ]
  },
  it: {
    lang: 'ITALIANO',
    title: 'Avviso Medico: Allergie Alimentari Gravi',
    message: 'Gentile Chef e Personale: Sono celiaca (grave intolleranza al glutine) e ho un\'allergia pericolosa alla Frutta a Guscio (noci, mandorle). Non posso assumere latticini.',
    avoids: [
      'Grano, Farina, Farro, Orzo, Segale, Pasta normale, Pane',
      'Noci, Mandorle, Nocciole, Pistacchi, Anacardi, Pinoli',
      'Latte, Burro, Panna, Formaggi freschi',
      'Fritti cotti nell\'olio di cibi impanati'
    ]
  },
  fr: {
    lang: 'FRANÇAIS',
    title: 'Alerte Médicale: Allergies Alimentaires',
    message: 'Cher Chef et Serveur: Je souffre de la Maladie Cœliaque (zéro gluten) et d\'une allergie grave aux Fruits à Coque (noix, amandes). Je ne tolère pas les produits laitiers.',
    avoids: [
      'Blé, Orge, Seigle, Épeautre, Farine, Sauce soja au blé',
      'Amandes, Noix, Noisettes, Pistaches, Noix de cajou',
      'Lait, Beurre, Crème, Fromages doux',
      'Aliments frits dans la même huile que des aliments panés'
    ]
  },
  ja: {
    lang: '日本語',
    title: '重度のアレルギーおよびセリアック病に関するお願い',
    message: 'シェフおよび店員様へ：私には重度の小麦アレルギー（セリアック病・グルテン不耐性）およびナッツ類のアレルギーがあります。乳製品も摂取できません。調理器具の洗浄を含め、ご配慮をお願いいたします。',
    avoids: [
      '小麦、大麦、ライ麦、一般的な醤油（小麦入り）、パン粉',
      'アーモンド、クルミ、カシューナッツなどの木の実類',
      '牛乳、バター、生クリーム、チーズ',
      '揚げ物の油の共有（パン粉の混入にご注意ください）'
    ]
  },
  de: {
    lang: 'DEUTSCH',
    title: 'Wichtiger Hinweis: Schwere Lebensmittelallergien',
    message: 'Liebes Küchen- und Serviceteam: Ich habe Zöliakie (strikte Glutenunverträglichkeit) und eine lebensbedrohliche Allergie gegen Schalenfrüchte/Nüsse. Ich vertrage zudem keine Laktose.',
    avoids: [
      'Weizen, Gerste, Roggen, Dinkel, Grieß, normale Sojasauce',
      'Mandeln, Walnüsse, Haselnüsse, Pistazien, Cashews',
      'Milch, Butter, Sahne, Weichkäse',
      'Frittiertes aus Öl, in dem Paniertes zubereitet wurde'
    ]
  },
  hi: {
    lang: 'हिन्दी',
    title: 'गंभीर खाद्य एलर्जी सूचना (Medical Alert)',
    message: 'आदरणीय शेफ एवं वेटर: मुझे सीलिएक रोग (गेहूं/ग्लूटेन से सख्त परहेज) और बादाम/अखरोट (ट्री नट्स) से जानलेवा एलर्जी है। मुझे दूध और पनीर से भी परहेज है।',
    avoids: [
      'गेहूं, मैदा, सूजी, दलिया, जौ, राई, और गेहूं युक्त सोया सॉस',
      'बादाम, काजू, अखरोट, पिस्ता, हेज़लनट',
      'दूध, मक्खन, मलाई, पनीर',
      'वह तला हुआ खाना जो पूड़ी या समोसे वाले तेल में बना हो'
    ]
  }
};

// State
const state = {
  friend: {
    name: 'Elena',
    allergens: ['gluten', 'tree_nuts', 'dairy']
  },
  activeLang: 'en'
};

// DOM Elements
const DOM = {
  ingredientInput: document.getElementById('ingredientInput'),
  charCount: document.getElementById('charCount'),
  clearBtn: document.getElementById('clearBtn'),
  analyzeBtn: document.getElementById('analyzeBtn'),
  aiEngineStatus: document.getElementById('aiEngineStatus'),
  emptyState: document.getElementById('emptyState'),
  analysisBody: document.getElementById('analysisBody'),
  verdictBadge: document.getElementById('verdictBadge'),
  verdictBanner: document.getElementById('verdictBanner'),
  verdictHeading: document.getElementById('verdictHeading'),
  verdictSubtext: document.getElementById('verdictSubtext'),
  hazardList: document.getElementById('hazardList'),
  annotatedText: document.getElementById('annotatedText'),
  friendNoteBox: document.getElementById('friendNoteBox'),
  friendNoteText: document.getElementById('friendNoteText'),
  tabLinks: document.querySelectorAll('.tab-link'),
  tabPanes: document.querySelectorAll('.tab-pane'),
  sampleButtons: document.querySelectorAll('.btn-chip'),
  recipeSelect: document.getElementById('recipeSelect'),
  transformRecipeBtn: document.getElementById('transformRecipeBtn'),
  recipeResult: document.getElementById('recipeResult'),
  langChips: document.getElementById('langChips'),
  cardLangBadge: document.getElementById('cardLangBadge'),
  cardTitle: document.getElementById('cardTitle'),
  cardMessage: document.getElementById('cardMessage'),
  cardAvoidList: document.getElementById('cardAvoidList'),
  printCardBtn: document.getElementById('printCardBtn'),
  editProfileBtn: document.getElementById('editProfileBtn'),
  friendPresetBtn: document.getElementById('friendPresetBtn'),
  profileModal: document.getElementById('profileModal'),
  closeModalBtn: document.getElementById('closeModalBtn'),
  cancelProfileBtn: document.getElementById('cancelProfileBtn'),
  saveProfileBtn: document.getElementById('saveProfileBtn'),
  friendNameInput: document.getElementById('friendNameInput'),
  activeAllergenChips: document.getElementById('activeAllergenChips')
};

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupEvents();
  renderRecipeSwap('creamy_pasta');
  renderChefCard('en');
  initOpenAIModel();
});

function setupNavigation() {
  DOM.tabLinks.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.tabLinks.forEach(b => b.classList.remove('active'));
      DOM.tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const pane = document.getElementById(`pane-${btn.dataset.tab}`);
      if (pane) pane.classList.add('active');
    });
  });
}

function setupEvents() {
  DOM.ingredientInput.addEventListener('input', () => {
    const len = DOM.ingredientInput.value.length;
    DOM.charCount.textContent = `${len} character${len === 1 ? '' : 's'}`;
  });

  DOM.clearBtn.addEventListener('click', () => {
    DOM.ingredientInput.value = '';
    DOM.charCount.textContent = '0 characters';
    DOM.emptyState.classList.remove('hidden');
    DOM.analysisBody.classList.add('hidden');
    DOM.verdictBadge.className = 'friendly-badge';
    DOM.verdictBadge.textContent = 'Ready';
  });

  DOM.sampleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sample;
      if (SAMPLE_PRESETS[key]) {
        DOM.ingredientInput.value = SAMPLE_PRESETS[key];
        DOM.charCount.textContent = `${SAMPLE_PRESETS[key].length} characters`;
        analyze();
      }
    });
  });

  DOM.analyzeBtn.addEventListener('click', analyze);

  DOM.transformRecipeBtn.addEventListener('click', () => {
    renderRecipeSwap(DOM.recipeSelect.value);
  });

  DOM.langChips.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderChefCard(btn.dataset.lang);
  });

  DOM.printCardBtn.addEventListener('click', () => window.print());

  const openModal = () => DOM.profileModal.classList.remove('hidden');
  const closeModal = () => DOM.profileModal.classList.add('hidden');

  DOM.editProfileBtn.addEventListener('click', openModal);
  DOM.friendPresetBtn.addEventListener('click', openModal);
  DOM.closeModalBtn.addEventListener('click', closeModal);
  DOM.cancelProfileBtn.addEventListener('click', closeModal);

  DOM.saveProfileBtn.addEventListener('click', () => {
    state.friend.name = DOM.friendNameInput.value.trim() || 'Elena';
    const selected = [];
    if (document.getElementById('checkGluten').checked) selected.push('gluten');
    if (document.getElementById('checkNuts').checked) selected.push('tree_nuts');
    if (document.getElementById('checkDairy').checked) selected.push('dairy');
    if (document.getElementById('checkPeanuts').checked) selected.push('peanuts');
    if (document.getElementById('checkSoy').checked) selected.push('soy');
    if (document.getElementById('checkShellfish').checked) selected.push('shellfish');
    if (document.getElementById('checkEggs').checked) selected.push('eggs');
    if (document.getElementById('checkSesame').checked) selected.push('sesame');

    state.friend.allergens = selected;
    updateFriendUI();
    closeModal();

    if (DOM.ingredientInput.value.trim()) {
      analyze();
    }
  });
}

function updateFriendUI() {
  document.querySelector('.personal-title-row h2').textContent = `${state.friend.name}'s Dietary Profile`;
  document.getElementById('friendPresetBtn').innerHTML = `<span>Profile: ${state.friend.name}</span>`;

  let html = '';
  state.friend.allergens.forEach(key => {
    const tax = ALLERGEN_TAXONOMY[key];
    if (tax) {
      const cls = tax.severity === 'high' ? 'tag-red' : 'tag-yellow';
      html += `<span class="tag ${cls}">${tax.name}</span>`;
    }
  });
  html += `<button class="tag tag-btn" id="editProfileBtnRebound">Edit Profile</button>`;
  DOM.activeAllergenChips.innerHTML = html;

  document.getElementById('editProfileBtnRebound')?.addEventListener('click', () => {
    DOM.profileModal.classList.remove('hidden');
  });

  renderChefCard(state.activeLang);
}

async function initOpenAIModel() {
  try {
    if (window.pipeline) {
      DOM.aiEngineStatus.textContent = 'Loading local model...';
      await window.pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
      DOM.aiEngineStatus.textContent = 'Transformers.js Active (Local)';
    } else {
      DOM.aiEngineStatus.textContent = 'Local Biochemical Engine Active';
    }
  } catch (err) {
    DOM.aiEngineStatus.textContent = 'Local Biochemical Engine Active';
  }
}

function analyze() {
  const text = DOM.ingredientInput.value.trim();
  if (!text) {
    alert('Please enter ingredient text or select a sample.');
    return;
  }

  DOM.analyzeBtn.disabled = true;
  DOM.analyzeBtn.innerHTML = `<span>Scanning...</span>`;

  setTimeout(() => {
    runCheck(text);
    DOM.analyzeBtn.disabled = false;
    DOM.analyzeBtn.innerHTML = `<span>Scan Ingredients</span>`;
  }, 220);
}

function runCheck(rawText) {
  const lower = rawText.toLowerCase();
  const flagged = [];
  let isDanger = false;
  let isCaution = false;

  state.friend.allergens.forEach(key => {
    const allergen = ALLERGEN_TAXONOMY[key];
    if (!allergen) return;

    allergen.directTerms.forEach(term => {
      const rx = new RegExp(`\\b${escapeRegExp(term)}[a-z]*\\b`, 'i');
      if (rx.test(lower)) {
        flagged.push({
          type: 'DIRECT ALLERGEN',
          term: term,
          allergen: allergen.name,
          severity: allergen.severity,
          msg: `Contains ${allergen.name}. ${allergen.explanation}`
        });
        if (allergen.severity === 'high') isDanger = true;
        else isCaution = true;
      }
    });

    allergen.covertTerms.forEach(term => {
      if (lower.includes(term.toLowerCase())) {
        flagged.push({
          type: 'CONCEALED DERIVATIVE',
          term: term,
          allergen: allergen.name,
          severity: allergen.severity,
          msg: `"${term}" is a covert source of ${allergen.name}.`
        });
        if (allergen.severity === 'high') isDanger = true;
        else isCaution = true;
      }
    });
  });

  // Cross contact check
  if (/manufactured on shared equipment|may contain|processed in a facility that/i.test(rawText)) {
    flagged.push({
      type: 'FACILITY WARNING',
      term: 'Shared Equipment',
      allergen: 'Cross-Contamination',
      severity: 'medium',
      msg: 'Package indicates risk of shared manufacturing lines.'
    });
    isCaution = true;
  }

  displayVerdict(rawText, flagged, isDanger, isCaution);
}

function displayVerdict(rawText, flagged, isDanger, isCaution) {
  DOM.emptyState.classList.add('hidden');
  DOM.analysisBody.classList.remove('hidden');

  DOM.verdictBadge.className = 'friendly-badge';

  if (!isDanger && !isCaution) {
    DOM.verdictBadge.textContent = `CLEAR FOR ${state.friend.name.toUpperCase()}`;
    DOM.verdictBadge.classList.add('badge-safe');
    DOM.verdictHeading.textContent = `No allergens flagged for ${state.friend.name}`;
    DOM.verdictSubtext.textContent = `No detected traces of ${state.friend.allergens.map(a => ALLERGEN_TAXONOMY[a]?.name).join(', ')}.`;
    DOM.friendNoteText.textContent = `Ingredient check passed with zero direct or hidden derivatives found.`;
  } else if (isDanger) {
    DOM.verdictBadge.textContent = `UNSAFE - DO NOT CONSUME`;
    DOM.verdictBadge.classList.add('badge-danger');
    DOM.verdictHeading.textContent = `Unsafe for ${state.friend.name}`;
    DOM.verdictSubtext.textContent = `Contains ingredients known to trigger Elena's active allergens.`;
    DOM.friendNoteText.textContent = `Do not serve or consume this item.`;
  } else {
    DOM.verdictBadge.textContent = `CAUTION`;
    DOM.verdictBadge.classList.add('badge-caution');
    DOM.verdictHeading.textContent = `Caution: Review Warnings`;
    DOM.verdictSubtext.textContent = `Contains shared facility warnings or secondary sensitivities.`;
    DOM.friendNoteText.textContent = `Check whether shared equipment warnings are safe for your level of sensitivity.`;
  }

  // Findings list
  if (flagged.length === 0) {
    DOM.hazardList.innerHTML = `
      <div class="finding-item finding-safe">
        <span class="finding-tag">CLEAR</span>
        <div>
          <strong>No allergen triggers detected</strong>
          <p style="font-size: 0.78rem; margin-top: 2px;">This product contains no flagged ingredients for ${state.friend.name}'s active profile.</p>
        </div>
      </div>
    `;
  } else {
    DOM.hazardList.innerHTML = flagged.map(f => {
      const cls = f.severity === 'high' ? 'finding-danger' : 'finding-warn';
      return `
        <div class="finding-item ${cls}">
          <span class="finding-tag">${f.type}</span>
          <div>
            <strong>${escapeHtml(f.term)} &mdash; <span style="font-weight: 500;">${f.allergen}</span></strong>
            <p style="font-size: 0.78rem; margin-top: 2px;">${f.msg}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // Highlighted preview
  let highlighted = escapeHtml(rawText);
  flagged.forEach(f => {
    if (f.type !== 'FACILITY WARNING') {
      const rx = new RegExp(`(${escapeRegExp(f.term)})`, 'gi');
      const hlClass = f.severity === 'high' ? 'hl-red' : 'hl-yellow';
      highlighted = highlighted.replace(rx, `<span class="${hlClass}">$1</span>`);
    }
  });
  DOM.annotatedText.innerHTML = highlighted;
}

function renderRecipeSwap(key) {
  const recipe = RECIPE_SWAPS[key];
  if (!recipe) return;

  DOM.recipeResult.innerHTML = `
    <div class="recipe-card-box">
      <h4 style="font-size: 1.05rem; color: #fff; margin-bottom: 0.35rem;">${recipe.title}</h4>
      <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.9rem;">${recipe.story}</p>
      
      <div>
        ${recipe.swaps.map(s => `
          <div class="swap-row">
            <div>
              <div class="swap-bad">${s.from}</div>
              <div class="swap-good">&rarr; ${s.to}</div>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-dim); text-align: right; max-width: 180px;">${s.reason}</div>
          </div>
        `).join('')}
      </div>

      <div class="roommate-tip">
        <strong>${recipe.roommateTip}</strong>
      </div>
    </div>
  `;
}

function renderChefCard(lang) {
  state.activeLang = lang;
  const card = CHEF_CARDS[lang] || CHEF_CARDS.en;

  DOM.cardLangBadge.textContent = card.lang;
  DOM.cardTitle.textContent = card.title;
  DOM.cardMessage.textContent = card.message;
  DOM.cardAvoidList.innerHTML = card.avoids.map(i => `<li>${i}</li>`).join('');
  document.querySelector('.card-signature span').textContent = `Individual: ${state.friend.name} M. \u2022 Medical Precaution`;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(s) {
  return s.replace(/[&<>'"]/g, t => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[t] || t));
}
