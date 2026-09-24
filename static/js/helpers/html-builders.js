import { STEPHANIE } from "./constants.js";
import { getAdventurer, getPage } from "./url-parsers.js";

export function buildHTMLListFromData(element, data) {
  element.innerText = "";
  for (let i = 0; i < data.length; i++) {
    const listItem = document.createElement("li");
    listItem.innerText = data[i];
    element.appendChild(listItem);
  }
}

function formatName(adventurer) {
  return adventurer === STEPHANIE ? "Stephanie" : "Louise";
}

function formatPageName(page) {
  console.log(`Current Page is ${page}`);
  switch (page) {
    case "pastAdventures":
      return "Past Adventures";
    case "skillsAndPowers":
      return "Skills and Powers";
    case "credentials":
      return "Credentials";
    case "spellScrolls":
      return "Spell Scrolls";
    case "sideQuests":
      return "Side Quests";
  }
}

export function setPageTitle() {
  let adventurer = getAdventurer();
  let page = getPage();
  document.getElementById("pageTitle").innerHTML =
    `${formatName(adventurer)}\'s ${formatPageName(page)}`;
}
