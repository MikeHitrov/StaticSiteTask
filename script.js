let button = document.getElementsByClassName("collapsible");

button[0].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = document.getElementsByClassName("content");

    if (content[0].style.display === "block") {
        content[0].style.display = "none";
    } else {
        content[0].style.display = "block";
    }
});

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