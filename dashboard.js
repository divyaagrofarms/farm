let pigs = JSON.parse(localStorage.getItem("piggery-pigs") || "[]");

const pigList = document.getElementById("pig-list");
const pigCount = document.getElementById("pig-count");
const feedDisplay = document.getElementById("feed-display");
const form = document.getElementById("pig-form");

function renderPigs() {
  pigList.innerHTML = "";
  pigs.forEach(pig => {
    const div = document.createElement("div");
    div.className = "pig-card";
    div.innerHTML = `
      <span>🐷 <b>${pig.name}</b> — Age: ${pig.age}m, Weight: ${pig.weight}kg</span>
      <button onclick="deletePig(${pig.id})">Remove</button>
    `;
    pigList.appendChild(div);
  });
  pigCount.textContent = `Total pigs: ${pigs.length}`;
  updateFeed();
}

function updateFeed() {
  let total = pigs.reduce((sum, p) => sum + (p.weight * 0.03 || 0), 0);
  feedDisplay.textContent = `${total.toFixed(2)} kg per day`;
}

form?.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(form);
  const pig = {
    id: Date.now(),
    name: data.get("name"),
    age: Number(data.get("age")),
    weight: Number(data.get("weight"))
  };
  pigs.push(pig);
  localStorage.setItem("piggery-pigs", JSON.stringify(pigs));
  form.reset();
  renderPigs();
});

function deletePig(id) {
  pigs = pigs.filter(p => p.id !== id);
  localStorage.setItem("piggery-pigs", JSON.stringify(pigs));
  renderPigs();
}

renderPigs();