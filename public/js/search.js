const trackSection = document.querySelector(".results");
const searchSection = document.querySelector(".search-containor");
const searchButton = document.querySelector(".searchButton");
const backButton = document.querySelector(".backButton");

searchButton.addEventListener("click", () => {
    searchSection.classList.add("unactive");
    trackSection.classList.add("active");

})

backButton.addEventListener("click", () => {
    trackSection.classList.remove("active");
    searchSection.classList.remove("unactive");

})


