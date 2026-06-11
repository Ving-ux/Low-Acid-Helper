const foods = [
  { keys: ["pretzel"], status: "safe-ish", text: "Plain pretzels are usually a reasonable low-acid snack. Keep the portion modest and drink water.", ideas: ["Plain pretzels", "Pretzels with banana", "Pretzels with low-fat cottage cheese if tolerated"] },
  { keys: ["nut", "almond", "cashew", "peanut", "walnut"], status: "maybe", text: "Nuts are low-acid but higher in fat, which can trigger reflux. Try a small handful and avoid spicy coatings.", ideas: ["Plain almonds", "A few cashews with oatmeal", "A thin spread of nut butter"] },
  { keys: ["banana"], status: "safe-ish", text: "Bananas are a common gentle, low-acid choice.", ideas: ["Banana with oatmeal", "Banana with rice cakes", "Banana with low-fat yogurt if tolerated"] },
  { keys: ["melon", "watermelon", "cantaloupe", "honeydew"], status: "safe-ish", text: "Melons are usually lower-acid and gentle.", ideas: ["Melon cup", "Melon with plain crackers", "Melon with low-fat cottage cheese if tolerated"] },
  { keys: ["oatmeal", "oats"], status: "safe-ish", text: "Oatmeal is filling, bland, and commonly well tolerated.", ideas: ["Plain oatmeal with banana", "Overnight oats", "Instant plain oats"] },
  { keys: ["yogurt", "dairy", "milk", "cottage cheese"], status: "maybe", text: "Low-fat dairy works for some people. Start with a small portion and avoid citrus or chocolate flavors.", ideas: ["Plain nonfat yogurt with banana", "Low-fat cottage cheese with melon", "A small portion first"] },
  { keys: ["coffee", "caffeine", "energy drink"], status: "trigger-prone", text: "Coffee and caffeine commonly worsen reflux.", ideas: ["Water", "Non-mint herbal tea", "A tolerated decaf option"] },
  { keys: ["soda", "sparkling", "carbonated", "seltzer"], status: "trigger-prone", text: "Carbonation can increase pressure and burping. Flat water is safer during a flare.", ideas: ["Water", "Still electrolyte drink without citrus", "Non-mint herbal tea"] },
  { keys: ["tomato", "pizza", "marinara", "ketchup", "salsa"], status: "trigger-prone", text: "Tomato-based foods are acidic and commonly trigger LPR.", ideas: ["Plain rice bowl", "Sandwich without tomato", "Plain pasta with a little olive oil"] },
  { keys: ["orange", "citrus", "lemon", "lime", "grapefruit", "pineapple"], status: "trigger-prone", text: "Citrus and pineapple are acidic and commonly trigger symptoms.", ideas: ["Banana", "Melon", "Applesauce if tolerated"] },
  { keys: ["chocolate", "mint", "peppermint"], status: "trigger-prone", text: "Chocolate and mint are common reflux triggers.", ideas: ["Banana", "Plain graham crackers", "Vanilla low-fat yogurt if tolerated"] },
  { keys: ["spicy", "hot sauce", "jalapeno", "pepper", "curry"], status: "trigger-prone", text: "Spicy foods are trigger-prone during an LPR flare.", ideas: ["Mild herbs", "A little salt", "Plain rice or potatoes"] }
];

const common = {
  lunch: ["Turkey or chicken sandwich without tomato, onion, spicy mustard, or heavy mayo", "Rice bowl with steamed vegetables and a lean protein", "Baked potato or sweet potato with a light topping", "Oatmeal with banana"],
  vegetarian: ["Rice bowl with vegetables and chickpeas if tolerated", "Baked potato with low-fat cottage cheese if tolerated", "Oatmeal with banana", "Plain pasta with vegetables"],
  snacks: ["Banana", "Melon cup", "Plain pretzels", "Rice cakes", "Plain oatmeal", "Plain crackers"],
  avoid: ["Tomato sauce, salsa, ketchup, and pizza sauce", "Citrus and pineapple", "Spicy or fried foods", "Chocolate and mint", "Coffee, soda, carbonation, and alcohol", "Large meals close to bedtime"]
};

const $ = id => document.getElementById(id);
const el = {
  question: $("questionInput"), answer: $("answerCard"), strict: $("strictMode"),
  vegetarian: $("vegetarianMode"), noDairy: $("noDairyMode"), copyStatus: $("copyStatus"),
  logInput: $("logInput"), logOutput: $("logOutput"), setup: $("setupPanel")
};
let lastQuestion = "What is a gentle low-acid lunch?";
let lastAnswer = "";

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"
})[char]);

function preferences() {
  return { strict: el.strict.checked, vegetarian: el.vegetarian.checked, noDairy: el.noDairy.checked };
}

function savePreferences() {
  localStorage.setItem("lowAcidPrefs", JSON.stringify(preferences()));
}

function loadPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem("lowAcidPrefs") || "{}");
    el.strict.checked = Boolean(saved.strict);
    el.vegetarian.checked = Boolean(saved.vegetarian);
    el.noDairy.checked = Boolean(saved.noDairy);
  } catch (_) {}
}

function filterDairy(items) {
  return preferences().noDairy
    ? items.filter(item => !/yogurt|cottage cheese|dairy|milk|cheese/i.test(item))
    : items;
}

function render(title, badge, text, items = []) {
  lastAnswer = `${title}: ${text} ${items.join("; ")}`;
  el.answer.innerHTML = `
    <div class="answer-header"><h2>${escapeHtml(title)}</h2><span class="badge">${escapeHtml(badge)}</span></div>
    <div class="answer-block"><p>${escapeHtml(text)}</p></div>
    ${items.length ? `<div class="answer-block"><h3>Try these</h3><ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>` : ""}
  `;
}

function answer(question) {
  const query = question.trim().toLowerCase();
  lastQuestion = question.trim() || lastQuestion;
  if (!query) return render("Ask me something first", "ready", "Try a food, snack, lunch, or grocery-store question.");

  const food = foods.find(entry => entry.keys.some(key => query.includes(key)));
  if (food) {
    const strictWarning = preferences().strict && food.status === "maybe"
      ? " Strict flare-up mode is on, so use a gentler default today."
      : "";
    return render(`About ${food.keys[0]}`, food.status, food.text + strictWarning, filterDairy(food.ideas));
  }

  if (/avoid|bad|trigger/.test(query)) return render("Common trigger-prone foods", "avoid", "Individual triggers vary, but these are common.", common.avoid);
  if (/snack|quick/.test(query)) return render("Snack ideas", preferences().strict ? "strict" : "safe-ish", "Keep portions modest and pair dry foods with water.", filterDairy(common.snacks));
  if (/publix|store|grocery/.test(query)) {
    const items = preferences().vegetarian ? common.vegetarian : common.lunch;
    return render("Grocery-store plan", "store mode", "Choose simple ingredients and mild preparation.", filterDairy(items));
  }
  if (/lunch|meal|eat/.test(query)) {
    const items = preferences().vegetarian ? common.vegetarian : common.lunch;
    return render("Low-acid lunch ideas", "practical", "Aim for lower-fat, non-spicy, non-tomato choices.", filterDairy(items));
  }
  render("Best local guess", "general", "Choose a small, lower-fat, non-spicy meal. Oatmeal, banana, melon, rice, potatoes, plain crackers, pretzels, and mild proteins are common defaults.");
}

async function copyPrompt() {
  const prefs = preferences();
  const prompt = `Low-acid food question: ${lastQuestion}\nPreferences: ${prefs.strict ? "strict flare-up; " : ""}${prefs.vegetarian ? "vegetarian; " : ""}${prefs.noDairy ? "no dairy; " : ""}\nCurrent local guidance: ${lastAnswer || "No answer yet."}`;
  try {
    await navigator.clipboard.writeText(prompt);
    el.copyStatus.textContent = "Copied to the clipboard.";
  } catch (_) {
    el.copyStatus.textContent = "Clipboard access was unavailable.";
  }
}

function getLog() {
  try { return JSON.parse(localStorage.getItem("lowAcidLog") || "[]"); }
  catch (_) { return []; }
}

function showLog() {
  const log = getLog();
  el.logOutput.innerHTML = log.length
    ? log.map(item => `<div class="log-item"><strong>${escapeHtml(item.date)}</strong><br>${escapeHtml(item.text)}</div>`).join("")
    : "<p>No trigger notes yet.</p>";
}

function saveLog() {
  const text = el.logInput.value.trim();
  if (!text) return;
  const log = getLog();
  log.unshift({ text, date: new Date().toLocaleString() });
  localStorage.setItem("lowAcidLog", JSON.stringify(log.slice(0, 50)));
  el.logInput.value = "";
  showLog();
}

$("askButton").addEventListener("click", () => answer(el.question.value));
el.question.addEventListener("keydown", event => { if (event.key === "Enter") answer(el.question.value); });
document.querySelectorAll(".chip").forEach(button => button.addEventListener("click", () => {
  el.question.value = button.dataset.prompt;
  answer(button.dataset.prompt);
}));
[el.strict, el.vegetarian, el.noDairy].forEach(input => input.addEventListener("change", savePreferences));
$("copyPromptButton").addEventListener("click", copyPrompt);
$("installHelp").addEventListener("click", () => el.setup.classList.toggle("hidden"));
$("saveLogButton").addEventListener("click", saveLog);
$("showLogButton").addEventListener("click", showLog);
$("clearLogButton").addEventListener("click", () => {
  if (confirm("Clear the local trigger log on this phone?")) {
    localStorage.removeItem("lowAcidLog");
    showLog();
  }
});

loadPreferences();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(() => {});
