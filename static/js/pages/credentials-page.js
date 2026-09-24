import { setPageTitle } from "../helpers/html-builders.js";
import { getAdventurer } from "../helpers/url-parsers.js";
import { setSpeech } from "../speech/speech-controls.js";
import stephanieData from "../../data/stephanie_resume.json" with { type: "json" };
import louiseData from "../../data/louise_resume.json" with { type: "json" };
import { STEPHANIE } from "../helpers/constants.js";
import { buildHTMLListFromData } from "../helpers/html-builders.js";

function loadCredentialsPage() {
  setPageTitle();
  setSpeech();

  let adventurer = getAdventurer();
  let credentials =
    adventurer === STEPHANIE ? stephanieData.education : louiseData.education;

  let eduList = document.getElementById("educationContainer");

  /*
        <div id={id}>
            <h2>{schoolName}</h2>
            <h3>{gradYear} {degree} {honors}</h3>
            <h4> {program} </h4>
            <p> {about_program}...(Repeat for each degree from school)
            <h3> Organizations </h3>
            <h4> {orgName} </h4>
            <ul>
                <li>{title} {start} - {end} </li>...
            </ul>
        </div>
    */
  for (let i = 0; i < credentials.length; i++) {
    let credential = credentials[i];
    const id = `school_${i}`;
    const school = credential.school;
    const degrees = credential.degrees;
    const orgs = credential.organizations;

    const eduSubContainer = document.createElement("div");
    eduSubContainer.id = id;

    const schoolName = document.createElement("h2");
    schoolName.innerText = school;
    eduSubContainer.appendChild(schoolName);

    /* Build Degree List */
    for (let d = 0; d < degrees.length; d++) {
      const degree = degrees[d];
      const gradYear = degree.grad_year;
      const degreeLevel = degree.degree;
      const honors = degree.honors;
      const program = degree.program;
      const about_program = degree.about_program;

      const degreeDiv = document.createElement("div");
      degreeDiv.id = `degree_${d}`;

      const degreeInfo = document.createElement("h3");
      degreeInfo.innerText = `${gradYear} ${degreeLevel}`;
      degreeDiv.appendChild(degreeInfo);

      if (honors !== "") {
        const honorsTitle = document.createElement("h3");
        honorsTitle.innerText = honors;
        degreeDiv.appendChild(honorsTitle);
      }

      const programName = document.createElement("h4");
      programName.innerText = program;
      degreeDiv.appendChild(programName);

      const programInfo = document.createElement("p");
      programInfo.innerText = about_program;
      degreeDiv.appendChild(programInfo);

      eduSubContainer.appendChild(degreeDiv);
      eduSubContainer.appendChild(document.createElement("br"));
    }

    const orgsDiv = document.createElement("div");

    const orgsSectionTitle = document.createElement("h3");
    orgsSectionTitle.innerText = "Organizations";
    orgsDiv.appendChild(orgsSectionTitle);

    for (let o = 0; o < orgs.length; o++) {
      const orgData = orgs[o];
      const orgDiv = document.createElement("div");

      const orgName = document.createElement("h4");
      orgName.innerText = orgData.org_name;
      orgDiv.appendChild(orgName);

      let titles = [];

      for (let t = 0; t < orgData.titles.length; t++) {
        let title = orgData.titles[t];
        let titleText = `${title.title} ${title.start}-${title.end}`;
        titles.push(titleText);
      }
      const organizationsList = document.createElement("ul");
      buildHTMLListFromData(organizationsList, titles);
      orgDiv.appendChild(organizationsList);
      orgsDiv.appendChild(orgDiv);
    }
    eduSubContainer.appendChild(orgsDiv);
    eduList.appendChild(eduSubContainer);
  }
}

window.loadCredentialsPage = loadCredentialsPage;
