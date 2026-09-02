let step = 0

function changeText() {
    if (step === 0) {
        document.getElementById("Narrator").hidden="hidden"
        document.getElementById("barkeepSpeech").innerText = "What can I get you? Water? Tea? Ale? Hmm?";
        step++;
    }
    else if (step === 1) {
        document.getElementById("barkeepSpeech").innerText = "Oh! You are looking for SOMEONE not something. Need a job doin’ eh?";
        step++;
    } else {
        window.location.href="tavern"
    }
}