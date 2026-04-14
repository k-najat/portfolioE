// --- 1. Animation Typewriter ---
const phrases = ["Développeuse Web Full Stack .", "Technicienne en Développement Digital  ", "Licence Fondamentale en Audiovisuel, option Son  "];
let i = 0, j = 0;
let currentPhrase = [];
let isDeleting = false, isEnd = false;
const element = document.getElementById('typewriter');

function loop() {
    if (!element) return;
    element.innerHTML = currentPhrase.join('') + '<span class="cursor">|</span>';
    if (i < phrases.length) {
        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j]); j++;
        }
        if (isDeleting && j > 0) {
            currentPhrase.pop(); j--;
        }
        if (j === phrases[i].length) { isEnd = true; isDeleting = true; }
        if (isDeleting && j === 0) {
            currentPhrase = []; isDeleting = false; i++;
            if (i >= phrases.length) i = 0;
        }
    }
    const speed = isEnd ? 1500 : isDeleting ? 50 : 100;
    isEnd = false;
    setTimeout(loop, speed);
}
loop();

// --- 2. Dark/Light Theme ---
const themeBtn = document.getElementById("theme");
if (themeBtn) {
    themeBtn.onclick = function () {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");
        themeBtn.innerHTML = isLight ? '<i class="fa-regular fa-moon"></i>' : '<i class="fa-regular fa-sun"></i>';
        themeBtn.className = isLight ? "btn btn-outline-dark" : "btn btn-outline-light";
    };
}

// --- 3. Animation de Révélation (Scroll Reveal) ---
const observerOptions = {
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // On arrête d'observer une fois l'animation déclenchée (optionnel)
            // observer.unobserve(entry.target);
        } else {
            // Optionnel : retirer la classe pour rejouer l'animation
            // entry.target.classList.remove('active');
        }
    });
}, observerOptions);

function updateRevealElements() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => revealObserver.observe(el));
}

// Lancer l'observation au chargement
document.addEventListener('DOMContentLoaded', updateRevealElements);

