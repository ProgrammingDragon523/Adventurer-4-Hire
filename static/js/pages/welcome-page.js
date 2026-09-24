import { barkeep_speech, narrator_speech } from "../speech/speech-text.js";

function loadTavernWelcome() {
  document.getElementById("narrator").innerText = narrator_speech.intro;
  document.getElementById("characterSpeech").innerText = barkeep_speech.intro1;
}
window.loadTavernWelcome = loadTavernWelcome;
