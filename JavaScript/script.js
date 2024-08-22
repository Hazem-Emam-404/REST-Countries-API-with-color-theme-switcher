const filterBox = document.querySelector(".filter-box");
const darkMode = document.querySelector(".mode");
const searchBox = document.querySelector(".search-filter .container .search");
const countriesCont = document.querySelector(".country-countainer .container");
const filterLists = document.querySelector(".filter-lists  ul");
const nav = document.querySelector(".nav");



/*functions*/
async function filterRegions(region) {
  document.querySelector(".filter-box label").textContent = region;
  filterLists.style.display = "";
  countriesCont.innerHTML = "";
  let countries;
  if (region !== "ALL") {
     countries = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );
  } else {
     countries = await fetch("https://restcountries.com/v3.1/all");
  }
  const countriesData = await countries.json();
  console.log(countriesData);
  countriesData.forEach((country) => {
    const html = `<div class="box">
                <img src=${country.flags.png} alt=${country.flags.alt}>
                <h3>${country.name.common}</h3>
                <ul class="info">
                    <li><span>Population: </span> ${country.population}</li>
                    <li><span>Region: </span> ${country.continents[0]}</li>
                    <li><span>Capital: </span> ${country.capital}</li>
                </ul>
            </div>`;
    countriesCont.insertAdjacentHTML("beforeend", html);
  });
}

/*Event Listneres*/

filterBox.addEventListener("click", function () {
  if (filterLists.style.display === "") {
    filterLists.style.display = "flex";
  } else if (filterLists.style.display === "flex") {
    filterLists.style.display = "";
  }
});

filterLists.addEventListener("click", function (event) {
  let text = event.target.tagName;
  text = text.toLowerCase();
  if (text === "li") {
    let region = event.target.textContent;

    filterRegions(region);
  }
});

// searchBox.addEventListener('click',function(){
//     let country=searchBox.textContent.toLowerCase();


// })

darkMode.addEventListener('click',function(){
    document.body.classList.toggle('DarkModeBody');
    // $("body *").toggleClass('DarkModeElements');
    console.log(nav);
    nav.classList.toggle("DarkModeElements");
    console.log(searchBox);
    searchBox.classList.toggle("DarkModeElements");
    filterBox.classList.toggle("DarkModeElements");
    // $(".box").toggleClass('DarkModeElements');



})

filterRegions("ALL");
