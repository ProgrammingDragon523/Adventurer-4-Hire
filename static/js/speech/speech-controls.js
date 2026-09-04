import { barkeep_speech, stephanie_speech, louise_speech } from "./speech-text.js";
import { STEPHANIE } from "../helpers/constants.js";
import { tavernChat } from "../pages/adventurer-landing-page.js";
import { getAdventurer, getPage } from "../helpers/url-parsers.js";

/* Welcome Page  */
let step = 0
function barKeepIntro() {
    if (step === 0) {
        document.getElementById("narrator").style.display = "none"
        document.getElementById("characterSpeech").innerText = barkeep_speech.intro2;
        step++;
    }
    else if (step === 1) {
        document.getElementById("characterSpeech").innerText = barkeep_speech.intro3;
        step++;
    } else {
        window.location.href = "tavern"
    }
}

/* Tavern Page  */
function barKeepTavern() {
    document.getElementById("characterSpeech").innerText = barkeep_speech.tavern;
    document.getElementById("continue").style.display = "none"
}

/* General Set Speech  */
export function setSpeech(adventurer, page) {
    if (page === "cast-sending-stone") {
        document.getElementById("characterSpeech").innerText = barkeep_speech.sendingStone
    } else if (page === "tavern") {
        tavernChat(adventurer)
    } else {
        document.getElementById("characterSpeech").innerText = adventurer === STEPHANIE ? stephanie_speech[page] : louise_speech[page]
    }
}

/* changeText function for continue button  */
function changeText() {
    const currentUrl = window.location.href.split("/");
    if (currentUrl.includes("welcome")) {
        barKeepIntro()
    } else {
        let page = getPage(currentUrl)
        let adventurer = getAdventurer(currentUrl)
        setSpeech(adventurer, page)
    }
}

window.barKeepTavern = barKeepTavern
window.changeText = changeText
