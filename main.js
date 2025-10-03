document.getElementById("contact-form")?.addEventListener("submit", function(e){
  e.preventDefault();
  const data = new FormData(this);
  const entry = {
    name: data.get("name"),
    email: data.get("email"),
    message: data.get("message"),
    date: new Date().toISOString()
  };
  const messages = JSON.parse(localStorage.getItem("piggery-contacts")||"[]");
  messages.push(entry);
  localStorage.setItem("piggery-contacts", JSON.stringify(messages));
  document.getElementById("contact-success").style.display = "block";
  this.reset();
});