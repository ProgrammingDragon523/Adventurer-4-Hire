import stephanieData from "../../data/stephanie_resume.json" with { type: "json" };
import louiseData from "../../data/louise_resume.json" with { type: "json" };
import { getJobDuration } from "../helpers/dataManipulation.js";
import { buildHTMLListFromData } from "../helpers/htmlBuilders.js";

function loadData(pageData) {
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
    if(skills.length === 0){
        document.getElementById("technical_enviroment").style.display="none"
    } else {
        document.getElementById("technical_enviroment").style.display="block"
        let skillsList = document.getElementById("skills")
        buildHTMLListFromData(skillsList, skills)
    }
    
    document.getElementById("description").innerHTML = pageData.overview

    let highlights = pageData.highlights
    if(highlights.length === 0){
        document.getElementById("highlights_container").style.display="none"
    } else {
        document.getElementById("highlights_container").style.display="block"
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


    pageData = adventurerData[adventurer][page]
    loadData(pageData)
}

window.pageFlip = pageFlip
document.getElementById("PageBackward").style.display = "none";

let page = 0
let adventurerData = {
    "stephanie-vaccaro": stephanieData.experience.jobs,
    "louise-allen": louiseData.experience.jobs
}
const currentUrl = window.location.href.split("/");
const adventurer = currentUrl[currentUrl.length - 2]

let pageData = adventurerData[adventurer][page]
loadData(pageData)
