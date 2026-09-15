import stephanieData from "../../data/stephanie_resume.json" with { type: "json" };
import louiseData from "../../data/louise_resume.json" with { type: "json" };

const adventurerData = [stephanieData, louiseData]

function getYearsExperience(firstProJob) {
    const firstJobMonthString = firstProJob.split(" ")[0]
    const firstJobYears = firstProJob.split(" ")[1]
    const firstJobMonthNum = new Date(`${firstJobMonthString} 1, ${firstJobYears}`).getMonth() + 1;

    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

    let yearsExp = 0
    let monthExp = 0

    if (firstJobMonthNum === currentMonth) {
        yearsExp = currentYear - firstJobYears
    }
    else if (firstJobMonthNum > currentMonth) {
        yearsExp = currentYear - firstJobYears - 1
        monthExp = 12 - (firstJobMonthNum - currentMonth)
    }
    else {
        yearsExp = currentYear - firstJobYears
        monthExp = currentMonth
    }
    return {
        monthExp: monthExp,
        yearsExp: yearsExp
    }
}

function loadTavernPage() {
    let intros = document.getElementById("introCards")
    for (let i = 0; i < adventurerData.length; i++) {
        let data = adventurerData[i]
        const firstName = data.personal_info.name.first;
        const firstNameLower = firstName.toLowerCase();
        const lastName = data.personal_info.name.last;
        const lastNameLower = lastName.toLocaleLowerCase();
        const fullName = firstName + " " + data.personal_info.name.last;
        const id = firstNameLower + "-" + lastNameLower

        const dndTitle = data.personal_info.dnd_title;

        const picture = new URL(`static/images/${firstName}.jpg`, window.location.origin);
        console.log(`Loading ${firstName}`)

        const fact1 = data.personal_info.job_style
        const fact2 = data.education[0].highest_degree
        /* Calculate and Set Years of Experience */
        let fact3 = ""
        const experience = getYearsExperience(data.experience.first_professional_job_start)
        if (experience.monthExp > 0) {
            fact3 = `${experience.yearsExp} years ${experience.monthExp} months industry experience`
        } else {
            fact3 = `${experience.yearsExp} years industry experience`
        }

        const container = document.createElement("div",{id:id})

        const name = document.createElement("h2")
        name.innerText = fullName
        container.appendChild(name)

        const title = document.createElement("h3")
        title.innerText = dndTitle
        container.appendChild(title)

        const img = document.createElement("img")
        img.src = picture
        container.appendChild(img)

        const f1 = document.createElement("p")
        f1.innerText = fact1
        container.appendChild(f1)

        const f2 = document.createElement("p")
        f2.innerText = fact2
        container.appendChild(f2)

        const f3 = document.createElement("p")
        f3.innerText = fact3
        container.appendChild(f3)

        const link = document.createElement("a")
        link.id = id;
        link.href = `${window.location.origin}/the-programming-dragon/tavern/${id}`;

        "/the-programming-dragon/tavern"
        link.adventurer = id
        link.class = "btn btn-primary"
        link.innerText = `Approach ${firstName}`
        container.appendChild(link)

        console.log(container)

        intros.appendChild(container)
         /*
        <div id={id}>
            <h2>{fullName}</h2>
            <h3>{dndTitle}</h3>
            <img scr={picture}></img>
            <p>{fact1}</p>
            <p>{fact2}</p>
            <p>{fact3}</p>
            <a href="{{ url_for('adventurerOverview', adventure=id) }}" class="btn btn-primary">
                Approach {{ firstName }}
            </a>
        </div>*/
    }
}

window.loadTavernPage = loadTavernPage