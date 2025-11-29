// BACK TO TOP BUTTON
(function () {
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


// GREETING ANIMATION 
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
function firstParagraphHeight(contentEl) {
  const collapsible = contentEl.closest('.collapsible');
  const aboutHeader = collapsible.querySelector('.about-header');
  const firstP = contentEl.querySelector('p:first-of-type');
  
  if (!firstP) return 0;
  
  let totalHeight = 0;
  
  // Add about-header height if it exists (includes photo and h2)
  if (aboutHeader) {
    const headerRect = aboutHeader.getBoundingClientRect();
    const headerStyles = getComputedStyle(aboutHeader);
    const headerMB = parseFloat(headerStyles.marginBottom) || 0;
    const headerMT = parseFloat(headerStyles.marginTop) || 0;
    totalHeight += headerRect.height + headerMB + headerMT;
  }
  
  // Add first paragraph height (just the text paragraph, not photo containers)
  const pRect = firstP.getBoundingClientRect();
  const pStyles = getComputedStyle(firstP);
  const pMB = parseFloat(pStyles.marginBottom) || 0;
  const pMT = parseFloat(pStyles.marginTop) || 0;
  totalHeight += pRect.height + pMB + pMT;
  
  // Add a bit of extra space to show there's more content
  totalHeight += 20;
  
  return Math.ceil(totalHeight);
}

function setupCollapsible(coll) {
  const content = coll.querySelector('.content');
  const btn = coll.querySelector('.toggler');

  // Markup hygiene
  if (!content || !btn) return;

  // Initialize heights after layout
  const init = () => {
    const collapsed = firstParagraphHeight(content);
    // Start collapsed with first paragraph showing
    content.style.maxHeight = collapsed + 'px';
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Show more';
    coll.classList.remove('open');
    // Store collapsed height for reuse
    coll._collapsed = collapsed;
  };

  // Expand/Collapse with smooth animation
  const toggle = () => {
    const isOpen = coll.classList.contains('open');

    // Recalculate full height every time 
    const prevMax = content.style.maxHeight;
    content.style.maxHeight = 'none';
    const full = content.scrollHeight;
    content.style.maxHeight = prevMax;

    if (isOpen) {
      // COLLAPSE
      content.style.maxHeight = full + 'px'; 
      requestAnimationFrame(() => {
        content.style.maxHeight = coll._collapsed + 'px';
      });
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Show more';
      coll.classList.remove('open');
    } else {
      // EXPAND
      content.style.maxHeight = coll._collapsed + 'px'; 
      requestAnimationFrame(() => {
        content.style.maxHeight = full + 'px';
      });
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = 'Show less';
      coll.classList.add('open');
    }
  };

  // Recompute collapsed height on resize 
  const onResize = () => {
    const wasOpen = coll.classList.contains('open');
    const collapsed = firstParagraphHeight(content);
    coll._collapsed = collapsed;

    if (wasOpen) {
      // Keep expanded
      content.style.maxHeight = 'none';
      const full = content.scrollHeight;
      content.style.maxHeight = full + 'px';
    } else {
      // Keep collapsed
      content.style.maxHeight = collapsed + 'px';
    }
  };

  init();
  btn.addEventListener('click', toggle);
  // Observe size changes to content itself
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(onResize);
    ro.observe(content);
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);
}

// Enable JS-specific styles
document.documentElement.classList.add('js-ready');

// Setup all collapsible sections on page load
window.addEventListener('load', () => {
  document.querySelectorAll('[data-collapsible]').forEach(setupCollapsible);
});

// BROWSER DETECTION
function whichBrowser() {
if (isFirefox()) {
return "Firefox";
} else if (isEdge()) {
return "Edge";
} else if (isIE()) {
return "Internet Explorer";
} else if (isOpera()) {
return "Opera";
} else if (isVivaldi()) {
return "Vivalid";
} else if (isChrome()) {
return "Chrome";
} else if (isSafari()) {
return "Safari";
} else {
return "Unknown";
}
}

function agentHas(keyword) {
return navigator.userAgent.toLowerCase().search(keyword.toLowerCase()) > -1;
}

function isIE() {
return !!document.documentMode;
}

function isSafari() {
return (!!window.ApplePaySetupFeature || !!window.safari) && agentHas("Safari") && !agentHas("Chrome") && !agentHas("CriOS");
}

function isChrome() {
return agentHas("CriOS") || agentHas("Chrome") || !!window.chrome;
}

function isFirefox() {
return agentHas("Firefox") || agentHas("FxiOS") || agentHas("Focus");
}

function isEdge() {
return agentHas("Edg");
}

function isOpera() {
return agentHas("OPR");
}

function isVivaldi() {
return agentHas("Vivaldi");
}