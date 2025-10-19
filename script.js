// BACK TO TOP BUTTON
(function () {
  // Create button once
  const btn = document.createElement("button");
  btn.id = "backToTop";
  btn.textContent = "↑";
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 15px",
    fontSize: "20px",
    display: "none",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#4a6964",
    color: "#fff",
    cursor: "pointer",
    zIndex: "9999",
    boxShadow: "0 8px 18px rgba(0,0,0,.2)"
  });
  document.body.appendChild(btn);

  function toggle() {
    btn.style.display = window.scrollY > 200 ? "block" : "none";
  }

  window.addEventListener("scroll", toggle);
  window.addEventListener("load", toggle);

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();


// MULTILINGUAL GREETING ANIMATION 
(function () {

  const greetings = [
    "Hello, my name is Emily!",          // English
    "Hola, mi nombre es Emily!",         // Spanish
    "Bonjour, je m'appelle Emily!",      // French
    "Hallo, mein Name ist Emily!",       // German
    "Ciao, mi chiamo Emily!",            // Italian
    "Hej, jag heter Emily!",             // Swedish
    "Hallo, mijn naam is Emily!"         // Dutch
  ];

  const el = document.getElementById("greeting");
  if (!el) return; // Exit if element not found

  let i = 0;


  (function setTimeOfDay() {

    const hour = new Date().getHours();
    let messageENG = "Hello";
    if (hour < 12) messageENG = "Good morning";
    else if (hour < 18) messageENG = "Good afternoon";
    else if (hour < 20) messageENG = "Good evening";
    else messageENG = "Good night";
    el.textContent = `${messageENG}, I'm Emily Hatten`;


  })();


  function rotate() {
    el.style.opacity = 0;
    setTimeout(() => {
      i = (i + 1) % greetings.length;
      el.textContent = greetings[i];
      el.style.opacity = 1;
    }, 500);
  }

  setInterval(rotate, 3000);
})();


// COLLAPSIBLE SECTIONS
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}