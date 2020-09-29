let openBtn = document.getElementsByClassName("openSideNav")[0];
let closeBtn = document.getElementsByClassName("closeBtn")[0];

const showNav = () => {
    document.querySelector(".sideNav").style.width = "20%";
    document.getElementById('mainContent').style.width = "80%";
    document.getElementById('navbar').style.width = "80%";
    document.getElementById('mainContent').style.marginLeft = "20%";
    document.getElementById('navbar').style.marginLeft = "20%";
}

const hideNav = () => {
    document.querySelector(".sideNav").style.width = "0%";
    document.getElementById('mainContent').style.width = "100%";
    document.getElementById('navbar').style.width = "100%";
    document.getElementById('mainContent').style.marginLeft = "0%";
    document.getElementById('navbar').style.marginLeft = "0%";
}

openBtn.addEventListener("click", () => {
    showNav();
});

closeBtn.addEventListener("click", () => {
    hideNav();
});