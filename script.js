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