let openBtn = document.getElementsByClassName("openSideNav")[0];
let closeBtn = document.getElementsByClassName("closeBtn")[0];

const showNav = () => {
    document.querySelector(".sideNav").style.width = "300px";
    document.querySelector('.main-content').style.marginLeft = "300px";
}

const hideNav = () => {
    document.querySelector(".sideNav").style.width = "0";
    document.querySelector('.main-content').style.marginLeft = "0px";
}

openBtn.addEventListener("click", () => {
    console.log(1)
    showNav();
});

closeBtn.addEventListener("click", () => {
    hideNav();
});