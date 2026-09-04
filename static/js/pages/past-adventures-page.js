import { getJobDuration } from "../helpers/data-manipulation.js";
import { buildHTMLListFromData } from "../helpers/html-builders.js";
import stephanieData from "../../data/stephanie_resume.json" with { type: "json" };
import louiseData from "../../data/louise_resume.json" with { type: "json" };
import { getAdventurer } from "../helpers/url-parsers.js";
import { STEPHANIE } from "../helpers/constants.js";

let page = 0

function getWorkExperience(adventurer) {
    let adventurerData = adventurer === STEPHANIE ? stephanieData.experience.jobs : louiseData.experience.jobs
    return adventurerData[page]
}

export function loadWorkExperienceByPage() {
    const currentUrl = window.location.href.split("/");
    const adventurer = getAdventurer(currentUrl)

    let pageData = getWorkExperience(adventurer)

    document.getElementById("jobTitle").innerText = pageData.title;
    document.getElementById("company").innerText = pageData.company_name;

    let endDate = pageData.current ? `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}` : pageData.ended

    let endText = pageData.current ? "Present" : endDate

    document.getElementById("dates").innerHTML = `${pageData.started} - ${endText}`

    let jobDuration = getJobDuration(pageData.started, endDate)
    if (jobDuration.monthExp > 0) {
        document.getElementById("years").innerHTML = `${jobDuration.yearsExp} years ${jobDuration.monthExp} months`
    } else {
        document.getElementById("years").innerHTML = `${jobDuration.yearsExp} years`
    }

    let skills = pageData.technical_env
    if (skills.length === 0) {
        document.getElementById("technical_environment").style.display = "none"
    } else {
        document.getElementById("technical_environment").style.display = "block"
        let skillsList = document.getElementById("skills")
        buildHTMLListFromData(skillsList, skills)
    }

    document.getElementById("description").innerHTML = pageData.overview

    let highlights = pageData.highlights
    if (highlights.length === 0) {
        document.getElementById("highlights_container").style.display = "none"
    } else {
        document.getElementById("highlights_container").style.display = "block"
        let highlightsList = document.getElementById("highlights")
        buildHTMLListFromData(highlightsList, highlights)
    }
}

function pageFlip(direction) {
    let forwardButton = document.getElementById("PageForward")
    let backButton = document.getElementById("PageBackward")

    direction === 1 ? page++ : page--

    let firstPage = 0
    page === firstPage ? backButton.style.display = "none" : backButton.style.display = "block"


    let lastPage = adventurerData[adventurer].length - 1
    page === lastPage ? forwardButton.style.display = "none" : forwardButton.style.display = "block"

    loadWorkExperienceByPage()
}

function loadPastAdventuresPage() {
    document.getElementById("PageBackward").style.display = "none";
    loadWorkExperienceByPage()
}

window.loadPastAdventuresPage = loadPastAdventuresPage
window.pageFlip = pageFlip
