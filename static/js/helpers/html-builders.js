export function buildHTMLListFromData(element, data) {
    element.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        const listItem = document.createElement("li");
        listItem.innerHTML = data[i];
        element.appendChild(listItem)
    }
}