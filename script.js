const factEl = document.getElementById("fact");
const imgEl = document.getElementById("catImage");
const generateBtn = document.getElementById("generateBtn");
const shareXBtn = document.getElementById("shareX");
const countEl = document.getElementById("count");
const cardBg = document.getElementById("cardBg");

let wisdomCount = 0;
let currentFact = "";

async function getCat() {
  try {
    const factRes = await fetch("https://catfact.ninja/fact");
    const factData = await factRes.json();

    const imgRes = await fetch("https://api.thecatapi.com/v1/images/search");
    const imgData = await imgRes.json();

    currentFact = factData.fact;

    factEl.textContent = currentFact;

    const imageUrl = imgData[0].url;

    imgEl.src = imageUrl;
    cardBg.style.backgroundImage = `url(${imageUrl})`;

    factEl.scrollTop = 0;

    wisdomCount++;
    countEl.textContent = wisdomCount;

    updateShareLink();

  } catch (error) {
    factEl.textContent = "The cat is sleeping. Try again.";
  }
}

function updateShareLink() {
  const text = `Senior Cat Architect says:\n"${currentFact}"`;
  shareXBtn.href =
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(text);
}

generateBtn.addEventListener("click", getCat);

getCat();