import stephanieData from "../../data/stephanie_resume.json" with { type: "json" };
import louiseData from "../../data/louise_resume.json" with { type: "json" };

let page = 0
let adventurerData = {
    "stephanie-vaccaro": stephanieData.experience.jobs,
    "louise-allen": louiseData.experience.jobs
}

function getJobDuration(start,end){
    const startMonthString = start.split(" ")[0]
    const startJobYears = start.split(" ")[1]
    const startMonthNum= new Date(`${startMonthString} 1, ${startJobYears}`).getMonth() + 1;

    const endMonthString = end.split(" ")[0]
    const endJobYears = end.split(" ")[1]
    const endMonthNum= new Date(`${endMonthString} 1, ${endJobYears}`).getMonth() + 1;
    
    
    let yearsExp = 0
    let monthExp = 0

    if(startMonthNum === endMonthNum) {
        yearsExp = endJobYears - startJobYears
    }   
    else if(startMonthNum > endMonthNum){
        yearsExp = endJobYears - startJobYears - 1 
        monthExp = 12 - (endMonthNum - firstJobMonthNum)
    }
    else{
        yearsExp = endMonthNum - startMonthNum
        monthExp = endMonthNum
    }
    return {
        monthExp:monthExp,
        yearsExp:yearsExp
    }
}


/* THIS ISNT WORKING JUST YET */
function loadData(pageData){
    document.getElementById("jobTitle").innerText = pageData["title"];
    document.getElementById("company").innerText = pageData.company_name;

    let endDate = pageData.ended
    let endText = pageData.ended

    if (endDate === ""){
        endDate = `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`
        endText = "Present"
    }
    document.getElementById("dates").innerHTML=`${pageData.started} - ${endText}`
    let jobDuration = getJobDuration(pageData.started, pageData.ended)
    if(jobDuration.monthExp>0){
        document.getElementById("years").innerHTML=`${jobDuration.yearsExp} years ${jobDuration.monthExp} months`
    } else {
        document.getElementById("years").innerHTML=`${jobDuration.yearsExp} years`
    }
    
    let skillsList = document.getElementById("skills")
    let skills = pageData.technical_env
    skills.innerHTML=""

    for(let i = 0; i < skills.length; i++){
        const listItem = document.createElement("li");
        listItem.innerHTML = skills[i];
        skillsList.appendChild(listItem)
    }

    document.getElementById("description").innerHTML=pageData.overview

    let highlightsList = document.getElementById("highlights")
    let highlights = pageData.highlights
    highlights.innerHTML=""

    for(let i = 0; i < highlights.length; i++){
        const listItem = document.createElement("li");
        listItem.innerHTML = highlights[i];
        highlightsList.appendChild(listItem)
    }
}


function pageFlip(direction) {
    if(direction === 1){//Page Forward
        page++;
        pageData = adventurerData[adventurer][page]
        if(page>=pageData.length){
            document.getElementById("PageForward").hidden="hidden"
        }
        if(page>0){
            document.getElementById("PageBackward").hidden=""
        }
    } else { //Page Backward
        page--;
        pageData = adventurerData[adventurer][page]
        if(page<pageData.length){
            document.getElementById("PageForward").hidden=""
        }
        if(page<=0){
            document.getElementById("PageBackward").hidden="hidden"
        }
    }
    loadData(pageData)
}

window.pageFlip = pageFlip
document.getElementById("PageBackward").hidden="hidden"

const currentUrl = window.location.href.split("/");
const adventurer = currentUrl[currentUrl.length-2]
console.log(adventurer)
let pageData = adventurerData[adventurer][page]
console.log(`Page # ${page}:${JSON.stringify(pageData)}`)
loadData(pageData)
