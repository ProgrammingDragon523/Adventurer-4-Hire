import { LOUISE, STEPHANIE } from "./constants.js"

export function getPage(currentUrl) {
    if (currentUrl.includes("past-adventures")) {
        return "pastAdventures"
    }
    if (currentUrl.includes("skills-and-powers")) {
        return "skillsAndPowers"
    }
    if (currentUrl.includes("credentials")) {
        return "credentials"
    }
    if (currentUrl.includes("spell-scrolls")) {
        return "spellScrolls"
    }
    if (currentUrl.includes("side-quests")) {
        return "sideQuests"
    }
    if (currentUrl.includes("cast-sending-stone")) {
        return "sendingStone"
    }
    return "tavern"
}

export function getAdventurer(currentUrl) {
    if (currentUrl.includes(STEPHANIE)) return STEPHANIE;
    if (currentUrl.includes(LOUISE)) return LOUISE;
    return "barkeep";
}