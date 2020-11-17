(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function addTooltip(elementId, text, delayBeforeShow, delayAfterShow) {
  //Getting the tooltip required element
  const element = document.getElementById(elementId);

  //Creating the base element
  const base = document.getElementById("tooltip");

  //Defining the offset distance
  const offsetDistance = 35;

  //Adding stylesheet
  base.classList.add("tooltip");

  element.addEventListener("mouseover", (event) => {
    // Checking if tooltip is empty or not.
    if (text != null) {
      base.innerHTML = text;

      // Checking for any "tooltip" element
      if (base.style.display == "inline-block") {
        base.style.display = "none"; // Hiding old tooltip
      }

      //Setting the timeout before the tooltip shows
      setTimeout(() => {
        base.style.top = element.offsetTop + offsetDistance + 'px';
        base.style.left = element.offsetLeft + offsetDistance + 'px';
        base.style.display = 'inline-block';
        document.body.appendChild(base);
      }, delayBeforeShow);
    }
  });

  element.addEventListener("mouseleave", (event) => {
    //Setting the timeout before the tooltip is being removes
    setTimeout(() => {
      base.style.display = "none"; //Hiding the tooltip
    }, delayAfterShow);
  });
}

exports.addTooltip = addTooltip;
},{}],2:[function(require,module,exports){
var addTooltip = require("../node_modules/@mhitrov/customtooltip/scripts/script.js");

addTooltip.addTooltip(
  "submitButton",
  "Use this button to submit the form",
  0,
  3000
);
addTooltip.addTooltip(
  "resetButton",
  "Use this button to reset the form",
  0,
  3000
);

},{"../node_modules/@mhitrov/customtooltip/scripts/script.js":1}]},{},[2]);
