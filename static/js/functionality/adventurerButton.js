let step = 0

function loadInitialText(adventurer){
    visited = []
    if(sessionStorage.getItem("visited") !== null){
        visited = JSON.parse(sessionStorage.getItem("visited"))
    }
    console.log(`SessionStorage: ${visited}`)

    if (visited.includes(adventurer)){
        document.getElementById("introText").hidden="hidden"
        document.getElementById("adventurerSpeech").innerText = "Welcome back, what can I help you with?";
        document.getElementById("continueAdventurerSpeech").hidden = "hidden"
        document.getElementById("exploreButtons").removeAttribute("hidden");
    }
    else if (adventurer === "stephanie"){
        visited.push(adventurer)
        console.log(`You've visited: ${visited}`)
        sessionStorage.setItem("visited", JSON.stringify(visited));
        document.getElementById("introText").innerText = "You approach the young woman seated at a corner table, papers scattered in front of her.  A plate of brownie crumbs beside her, a small glass with little milk left in, and a small mechanical dragon perched on her shoulder are her companions as she continues to ponder her work. Sensing your presence she greets you."
        document.getElementById("adventurerSpeech").innerText = "Well met, traveler. By your presence, I assume you need a developer?"
    } else {
        visited.push(adventurer)
        console.log(`You've visited: ${visited}`)
        sessionStorage.setItem("visited", JSON.stringify(visited));
        document.getElementById("introText").innerText = "Louise's Intro Here"
        document.getElementById("adventurerSpeech").innerText = "Louise's Text Here"
    }
}

function changeText() {
    if (step === 0) {
        document.getElementById("introText").hidden="hidden"
        document.getElementById("adventurerSpeech").innerText = "Let me tell you a story or two...";
        document.getElementById("continueAdventurerSpeech").hidden = "hidden"
        document.getElementById("exploreButtons").removeAttribute("hidden");
        step++;
    }
}