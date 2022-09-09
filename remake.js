var KICK_IMAGE_PATH = "KickMyC/kick.jpg";
var NO_KICK_IMAGE_PATH = "KickMyC/no_kick.jpg";
var counterElement;
var chairImageElement;
var clicks = 0;
var kickTimeout = null;
function updateClickCounter() {
    if (counterElement) {
        counterElement.innerText = String(clicks);
    }
}
function setKickImage(isKicking) {
    if (isKicking === void 0) { isKicking = false; }
    if (chairImageElement) {
        chairImageElement.src = isKicking ? KICK_IMAGE_PATH : NO_KICK_IMAGE_PATH;
    }
}
function kick(timeout) {
    if (timeout === void 0) { timeout = 150; }
    if (!chairImageElement) {
        return;
    }
    if (kickTimeout) {
        clearTimeout(kickTimeout);
    }
    else {
        setKickImage(true);
    }
    kickTimeout = setTimeout(function () {
        setKickImage(false);
        kickTimeout = null;
    }, timeout);
}
function addClicks(amount) {
    clicks += amount;
    updateClickCounter();
}
function onKickClick() {
    addClicks(1);
    kick();
}
function loadClicks() {
    addClicks(Number(localStorage.getItem("clicks")) || 0);
}
function saveClicks() {
    localStorage.setItem("clicks", String(clicks));
}
function getElements() {
    counterElement = document.getElementById("counter");
    chairImageElement = document.getElementById("chair-content");
}
window.addEventListener("load", function () {
    getElements();
    loadClicks();
});
window.addEventListener("beforeunload", saveClicks);
