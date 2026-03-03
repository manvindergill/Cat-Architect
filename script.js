const factEl = document.getElementById("fact");
const imgEl = document.getElementById("catImage");
const generateBtn = document.getElementById("generateBtn");
const shareBtn = document.getElementById("shareBtn");
const countEl = document.getElementById("count");

let wisdomCount = 0;
let currentFact = "";

async function getCat() {

  factEl.classList.add("fade-out");
  imgEl.classList.add("fade-out");

  try {
    const factRes = await fetch("https://catfact.ninja/fact");
    const factData = await factRes.json();

    const imgRes = await fetch("https://api.thecatapi.com/v1/images/search");
    const imgData = await imgRes.json();

    setTimeout(() => {
      currentFact = factData.fact;
      factEl.textContent = currentFact;
      imgEl.src = imgData[0].url;

      factEl.classList.remove("fade-out");
      imgEl.classList.remove("fade-out");

      wisdomCount++;
      countEl.textContent = wisdomCount;
    }, 400);

  } catch (error) {
    factEl.textContent = "The cat is sleeping. Try again.";
    factEl.classList.remove("fade-out");
    imgEl.classList.remove("fade-out");
  }
}

function shareOnX() {
  if (!currentFact) return;

  const tweet = `Senior Cat Architect says:\n"${currentFact}"`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
  window.open(url, "_blank");
}

generateBtn.addEventListener("click", getCat);
shareBtn.addEventListener("click", shareOnX);

getCat();