import stephanieData from "../../data/stephanie_resume.json" with { type: "json" };
import louiseData from "../../data/louise_resume.json" with { type: "json" };

const adventurerData = [stephanieData, louiseData]

function getExperience(firstProJob){
    const firstJobMonthString = firstProJob.split(" ")[0]
    const firstJobYears = firstProJob.split(" ")[1]
    const firstJobMonthNum= new Date(`${firstJobMonthString} 1, ${firstJobYears}`).getMonth() + 1;
    
    const currentMonth = new Date().getMonth()+1
    const currentYear = new Date().getFullYear()
    
    let yearsExp = 0
    let monthExp = 0

    if(firstJobMonthNum === currentMonth) {
        yearsExp = currentYear - firstJobYears
    }   
    else if(firstJobMonthNum > currentMonth){
        yearsExp = currentYear - firstJobYears -1
        monthExp = 12 - (firstJobMonthNum - currentMonth)
    }
    else{
        yearsExp = currentYear - firstJobYears
        monthExp = currentMonth 
    }
    return {
        monthExp:monthExp,
        yearsExp:yearsExp
    }
}

function loadResumeData(){
    /* Load in Name and Picture */
    for (let i = 0; i < adventurerData.length; i++){
        let data = adventurerData[i]
        const firstName = data.personal_info.name.first;
        const firstNameLower = firstName.toLowerCase()
        const fullName = firstName + " " + data.personal_info.name.last
        const picture = new URL(`static/images/${firstName}.jpg`, window.location.origin);
        console.log(`Loading ${firstName}`)

        /* Set HTML Values */
        document.getElementById(`${firstNameLower}Name`).innerHTML=fullName
        document.getElementById(`${firstNameLower}Title`).innerHTML=data.personal_info.dnd_title
        document.getElementById(`${firstNameLower}Img`).src = picture
        document.getElementById(`${firstNameLower}FactOne`).innerHTML=data.personal_info.job_style
        document.getElementById(`${firstNameLower}FactTwo`).innerHTML=data.education.degrees[0].degree

        /* Calculate and Set Years of Experience */
        const experience = getExperience(data.experience.first_professional_job_start)
        if(experience.monthExp>0){
            document.getElementById(`${firstNameLower}FactThree`).innerHTML=`${experience.yearsExp} years ${experience.monthExp} months industry experience`
        } else {
            document.getElementById(`${firstNameLower}FactThree`).innerHTML=`${experience.yearsExp} years industry experience`
        }
    }
}

loadResumeData()