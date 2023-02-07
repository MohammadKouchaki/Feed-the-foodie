var menuBtn = document.getElementById('menu-button');
var menu = document.getElementById('menu');
var barsIcon = document.getElementById('bars');
var xmarkIcon = document.getElementById('xmark');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    barsIcon.classList.toggle('hidden');
    xmarkIcon.classList.toggle('hidden');
});