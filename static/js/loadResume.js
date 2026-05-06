import stephanieData from "../data/stephanie_resume.json" with { type: "json" };

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
    else if(firstJobMonthNum < currentMonth){
        yearsExp = currentYear - firstJobYears
        monthExp = currentMonth - firstJobMonthNum
    }
    else{
        yearsExp = currentYear - firstJobYears - 1
        monthExp = currentMonth
    }
    return {
        monthExp:monthExp,
        yearsExp:yearsExp
    }
}

function loadResumeData(data){
    /* Load in Name and Picture */
    const firstName = data.personal_info.name.first
    const firstNameLower = firstName.toLowerCase()
    const fullName = firstName + " " + data.personal_info.name.last
    const picture = new URL(`static/images/${firstName}.jpg`, window.location.origin);

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

    /* Set Button Value */
    document.getElementById(`approach${firstName}`).innerHTML=`Approach ${firstName}`
}

loadResumeData(stephanieData)