let button = document.getElementsByClassName("collapsible");

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

let loremArticle = document.getElementById("loremArticle");
let farAwayArticle = document.getElementById("farAwayArticle");
let ciceroArticle = document.getElementById("ciceroArticle");
let wetherArticle = document.getElementById("wetherArticle");
let pangramArticle = document.getElementById("pangramArticle");

let openLorem = () => {
    loremArticle.scrollIntoView();
}

let openFarAway = () => {
    farAwayArticle.scrollIntoView();
}

let openCicero = () => {
    ciceroArticle.scrollIntoView();
}

let openWether = () => {
    wetherArticle.scrollIntoView();
}

let openPangram = () => {
    pangramArticle.scrollIntoView();
}