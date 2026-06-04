let step = 0

function changeText() {
    if (step === 0) {
        document.getElementById("introText").hidden="hidden"
        document.getElementById("barkeepSpeech").innerText = "What can I get you? Water? Tea? Ale? Hmm?";
        step++;
    }
    else if (step === 1) {
        document.getElementById("barkeepSpeech").innerText = "Oh! You are looking for SOMEONE not something. Need a job doin’ eh?";
        step++;
    } else {
        document.getElementById("barkeepSpeech").innerText = "Well, you’ve come to the right Tavern. Here are our resident “for-hires”. Feel free to speak with them.";
        document.getElementById("continue").hidden = "hidden"
        document.getElementById("idCards").removeAttribute("hidden");
    }
}