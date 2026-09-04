import { stephanie_speech, louise_speech, narrator_speech } from "../speech/speech-text.js";
import { STEPHANIE, LOUISE } from "../helpers/constants.js";

function loadAdventurerLandingPage(adventurer) {
    let visited = []
    let firstVisit = false;
    document.getElementById("exploreButtons").style.display = "none"

    // Pull visited if exists
    if (sessionStorage.getItem("visited") !== null) {
        visited = JSON.parse(sessionStorage.getItem("visited"));
    }

    // If we haven't visited before...
    if (!visited.includes(adventurer)) {
        visited.push(adventurer);
        sessionStorage.setItem("visited", JSON.stringify(visited));
        firstVisit = true;
    }

    // Set character text based on page visit
    let speechText = adventurer === STEPHANIE ? stephanie_speech : louise_speech;
    let narratorText = adventurer === STEPHANIE ? narrator_speech.stephanie : narrator_speech.louise;
    if (firstVisit) {
        document.getElementById("narrator").innerText = narratorText
        document.getElementById("characterSpeech").innerText = speechText.intro1
    } else {
        document.getElementById("narrator").style.display = "none"
        document.getElementById("continue").style.display = "none"
        document.getElementById("exploreButtons").style.display = "block"
        document.getElementById("characterSpeech").innerText = speechText.tavern
    }
}

export function tavernChat(adventurer) {
    let speechText = adventurer === STEPHANIE ? stephanie_speech : louise_speech;
    document.getElementById("narrator").style.display = "none"
    document.getElementById("continue").style.display = "none"
    document.getElementById("exploreButtons").style.display = "block"
    if (document.getElementById("characterSpeech").innerText === speechText.intro1) {
        document.getElementById("characterSpeech").innerText = speechText.intro2
    } else {
        document.getElementById("characterSpeech").innerText = speechText.tavern
    }
}
window.loadAdventurerLandingPage = loadAdventurerLandingPage
