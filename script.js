const factEl = document.getElementById("fact");
const imgEl = document.getElementById("catImage");
const btn = document.getElementById("generateBtn");
const countEl = document.getElementById("count");
const bgBlur = document.getElementById("bgBlur");
const shareBtn = document.getElementById("shareX");

let count = 0;

async function loadCat() {
  try {
    factEl.textContent = "Loading wisdom...";

    const catRes = await fetch("https://api.thecatapi.com/v1/images/search");
    const catData = await catRes.json();
    const catUrl = catData[0].url;

    imgEl.src = catUrl;
    bgBlur.style.backgroundImage = `url(${catUrl})`;

    const factRes = await fetch("https://catfact.ninja/fact");
    const factData = await factRes.json();

    factEl.textContent = factData.fact;

    count++;
    countEl.textContent = count;

  } catch (error) {
    factEl.textContent = "Failed to load wisdom. Try again.";
  }
}

btn.addEventListener("click", loadCat);

shareBtn.addEventListener("click", () => {
  const text = `${factEl.textContent} 🐱`;
  const url = window.location.href;

  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    "_blank"
  );
});

loadCat();