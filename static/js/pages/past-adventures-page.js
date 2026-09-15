import { getJobDuration } from "../helpers/data-manipulation.js";
import { buildHTMLListFromData, setPageTitle } from "../helpers/html-builders.js";
import stephanieData from "../../data/stephanie_resume.json" with { type: "json" };
import louiseData from "../../data/louise_resume.json" with { type: "json" };
import { getAdventurer } from "../helpers/url-parsers.js";
import { STEPHANIE } from "../helpers/constants.js";
import { setSpeech } from "../speech/speech-controls.js";

let page = 0

function getWorkExperience(adventurer) {
    let adventurerData = adventurer === STEPHANIE ? stephanieData.experience.jobs : louiseData.experience.jobs
    return adventurerData[page]
}

export function loadWorkExperienceByPage() {
    const adventurer = getAdventurer()

    let pageData = getWorkExperience(adventurer)

    document.getElementById("jobTitle").innerText = pageData.title;
    document.getElementById("company").innerText = pageData.company_name;
    document.getElementById("location").innerText = pageData.location;

    let endDate = pageData.current ? `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}` : pageData.ended

    let endText = pageData.current ? "Present" : endDate

    document.getElementById("dates").innerText = `${pageData.started} - ${endText}`

    let jobDuration = getJobDuration(pageData.started, endDate)
    if (jobDuration.monthExp > 0) {
        document.getElementById("years").innerText = `${jobDuration.yearsExp} years ${jobDuration.monthExp} months`
    } else {
        document.getElementById("years").innerText = `${jobDuration.yearsExp} years`
    }

    let skills = pageData.technical_env
    if (skills.length === 0) {
        document.getElementById("technicalEnvironment").style.display = "none"
    } else {
        document.getElementById("technicalEnvironment").style.display = "block"
        let skillsList = document.getElementById("skills")
        buildHTMLListFromData(skillsList, skills)
    }

    document.getElementById("description").innerText = pageData.overview

    let highlights = pageData.highlights
    if (highlights.length === 0) {
        document.getElementById("highlightsContainer").style.display = "none"
    } else {
        document.getElementById("highlightsContainer").style.display = "block"
        let highlightsList = document.getElementById("highlights")
        buildHTMLListFromData(highlightsList, highlights)
    }
}

function pageFlip(direction) {
    let forwardButton = document.getElementById("pageForward")
    let backButton = document.getElementById("pageBackward")

    direction === 1 ? page++ : page--

    let firstPage = 0
    page === firstPage ? backButton.style.display = "none" : backButton.style.display = "block"

    const adventurer = getAdventurer()
    let lastPage = adventurer === STEPHANIE ? stephanieData.experience.jobs.length - 1 : louiseData.experience.jobs.length - 1

    page === lastPage ? forwardButton.style.display = "none" : forwardButton.style.display = "block"

    loadWorkExperienceByPage()
}

function loadPastAdventuresPage() {
    document.getElementById("pageBackward").style.display = "none";
    setPageTitle()
    setSpeech()
    loadWorkExperienceByPage()
}

window.loadPastAdventuresPage = loadPastAdventuresPage
window.pageFlip = pageFlip
