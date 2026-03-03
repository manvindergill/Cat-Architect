const factEl = document.getElementById("fact");
const imgEl = document.getElementById("catImage");
const btn = document.getElementById("generateBtn");
const countEl = document.getElementById("count");
const bgBlur = document.getElementById("bgBlur");

let history = [];
let currentIndex = -1;
let count = 0;

async function loadCat() {
  try {
    factEl.textContent = "Loading wisdom...";

    const catRes = await fetch("https://api.thecatapi.com/v1/images/search");
    const catData = await catRes.json();
    const catUrl = catData[0].url;

    const factRes = await fetch("https://catfact.ninja/fact");
    const factData = await factRes.json();

    const newEntry = {
      image: catUrl,
      fact: factData.fact
    };

    history.push(newEntry);
    currentIndex = history.length - 1;

    displayCurrent();

    count++;
    countEl.textContent = count;

  } catch (error) {
    factEl.textContent = "Failed to load wisdom. Try again.";
  }
}

function displayCurrent() {
  const current = history[currentIndex];
  imgEl.src = current.image;
  bgBlur.style.backgroundImage = `url(${current.image})`;
  factEl.textContent = current.fact;
}

function showPrevious() {
  if (currentIndex > 0) {
    currentIndex--;
    displayCurrent();
  }
}

function showNext() {
  if (currentIndex < history.length - 1) {
    currentIndex++;
    displayCurrent();
  } else {
    loadCat();
  }
}

btn.addEventListener("click", loadCat);

loadCat();

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance < -50) {
    showNext();       // Swipe left → new wisdom
  }

  if (swipeDistance > 50) {
    showPrevious();   // Swipe right → previous wisdom
  }
}