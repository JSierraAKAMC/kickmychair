const KICK_IMAGE_PATH = "KickMyC/kick.jpg";
const NO_KICK_IMAGE_PATH = "KickMyC/no_kick.jpg";

let counterElement: HTMLHeadingElement;
let chairImageElement: HTMLImageElement;

let clicks: number = 0;
let kickTimeout: undefined | null | number = null;

function updateClickCounter(): void {
  if (counterElement) {
    counterElement.innerText = String(clicks);
  }
}

function setKickImage(isKicking: boolean = false): void {
  if (chairImageElement) {
    chairImageElement.src = isKicking ? KICK_IMAGE_PATH : NO_KICK_IMAGE_PATH;
  }
}

function kick(timeout: number = 150) {
  if (!chairImageElement) {
    return;
  }

  if (kickTimeout) {
    clearTimeout(kickTimeout);
  } else {
    setKickImage(true);
  }

  kickTimeout = setTimeout(() => {
    setKickImage(false);
    kickTimeout = null;
  }, timeout);
}

function addClicks(amount: number): void {
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
  counterElement = document.getElementById("counter") as HTMLHeadingElement;
  chairImageElement = document.getElementById(
    "chair-content"
  ) as HTMLImageElement;
}

window.addEventListener("load", () => {
  getElements();
  loadClicks();
});

window.addEventListener("beforeunload", saveClicks);
