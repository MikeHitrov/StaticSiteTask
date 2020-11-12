function addTooltip(elementId, text, delayBeforeShow, delayAfterShow) {
  //Getting the tooltip required element
  const element = document.getElementById(elementId);

  //Creating the base element
  const base = document.createElement("tooltip");

  //Adding stylesheet
  base.classList.add("tooltip");

  element.addEventListener("mouseover", (event) => {
    // Checking if tooltip is empty or not.
    if (text != null) {
      base.innerHTML = text;

      // Checking for any "tooltip" element
      if (document.getElementsByTagName("tooltip")[0]) {
        document.getElementsByTagName("tooltip")[0].remove(); // Removing old tooltip
      }

      //Setting the timeout before the tooltip shows
      setTimeout(() => {
        document.body.appendChild(base);
      }, delayBeforeShow);
    }
  });

  element.addEventListener("mouseleave", (event) => {
    //Setting the timeout before the tooltip is being removes
    setTimeout(() => {
      document.getElementsByTagName("tooltip")[0].remove(); //Removing the tooltip
    }, delayAfterShow);
  });
}
