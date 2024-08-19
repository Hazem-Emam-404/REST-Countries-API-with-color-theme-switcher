const filterBox = document.querySelector(".filter-box");
const darkMode = document.querySelector(".mode");
const searchBox = document.querySelector(".search");
const countriesCont = document.querySelector(".country-countainer .container");
const filterLists = document.querySelector(".filter-lists  ul");



filterBox.addEventListener("click", function () {

    if ((filterLists.style.display === "")) {
        filterLists.style.display = "flex";
    }
    else if ((filterLists.style.display === "flex")) {
        filterLists.style.display = "";
    }
});


filterLists.addEventListener("click", function (event) {

    if(event.target == "li")
});