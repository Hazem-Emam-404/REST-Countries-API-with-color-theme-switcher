const filterBox = document.querySelector(".filter-box");
const darkMode = document.querySelector(".mode");
const darkModeIcon = document.querySelector(".mode i");
const searchBox = document.querySelector(".search-filter .container .search");
const searchInput = document.querySelector(
  ".search-filter .container .search input"
);
const searchElement = document.querySelector(
  ".search-filter .container .search .search-results "
);
const countriesCont = document.querySelector(".country-countainer .container");
const filterLists = document.querySelector(".filter-lists  ul");
const suggestionsList = document.querySelector(
  ".search-filter .container .search ul"
);
const countryBox = document.querySelector(
  ".country-countainer .container .box"
);
let filterListItem;
const nav = document.querySelector(".nav");
let Box;
let allCountries;
let active = false;
let currentRegion = "ALL"

/*functions*/

async function filterRegions(region) {
  document.querySelector(".filter-box label").textContent = region;
  filterLists.style.display = "";
  countriesCont.innerHTML = "";
  let countries;
  if (region !== "ALL") {
    countries = await fetch(`https://restcountries.com/v3.1/region/${region}`);
  } else {
    countries = await fetch("https://restcountries.com/v3.1/all");
  }
  const countriesData = await countries.json();
  if (region == "ALL") allCountries = countriesData;
  countriesData.forEach((country) => {
    const html = `\n<div class="box">
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
  Box = document.querySelectorAll(".box");
  if (active) {
    Box.forEach((country) => country.classList.add("DarkModeElementsShadow"));
  } else {
    Box.forEach((country) =>
      country.classList.remove("DarkModeElementsShadow")
    );
  }
}

function diplaySuggestions(suggestions) {
  suggestionsList.innerHTML = "";
  for (let i = 0; i < 15; i++) {
    if (suggestions[i]) {
      const html = `<li class='result'>${suggestions[i]}</li>`;
      suggestionsList.insertAdjacentHTML("beforeend", html);
    } else {
      break;
    }
  }
  document.querySelector(
    ".search-filter .container .search .search-results"
  ).style.display = "block";
  if (active) {
    const suggest = document.querySelectorAll(".result");
    console.log(suggestionsList);
    suggest.forEach((sug) => sug.classList.add("DarkModeElements"));
  } else {
    const suggest = document.querySelectorAll(".result");

    suggest.forEach((sug) => sug.classList.remove("DarkModeElements"));
  }

  darkMode.addEventListener('click',function(e){
    e.preventDefault();
    if (active) {
      const suggest = document.querySelectorAll(".result");
      console.log(suggestionsList);
      suggest.forEach((sug) => sug.classList.add("DarkModeElements"));
    } else {
      const suggest = document.querySelectorAll(".result");
  
      suggest.forEach((sug) => sug.classList.remove("DarkModeElements"));
    }

  })
}

async function dipslayCountry(diplayedCountry) {
  try {
    let response = await fetch(
      `https://restcountries.com/v3.1/name/${diplayedCountry}`
    );
    let countries = await response.json();
    console.log(countries);
    let exactCountry = countries.filter(
      (country) =>
        country.name.common.toLowerCase() == diplayedCountry.toLowerCase()
    );
    console.log(exactCountry[0]);
    console.log(diplayedCountry);

    if (exactCountry[0].name.common.toLowerCase() != diplayedCountry.toLowerCase())
      throw new Error("Invalid name");
    countriesCont.innerHTML = "";
    const html = `<div class="box">
                <img src=${exactCountry[0].flags.png} alt=${exactCountry[0].flags.alt}>
                <h3>${exactCountry[0].name.common}</h3>
                <ul class="info">
                    <li><span>Population: </span> ${exactCountry[0].population}</li>
                    <li><span>Region: </span> ${exactCountry[0].continents[0]}</li>
                    <li><span>Capital: </span> ${exactCountry[0].capital}</li>
                </ul>
            </div>`;
    countriesCont.insertAdjacentHTML("beforeend", html);
    suggestionsList.style.display = "none";
    searchInput.value = "";
    const dark = document.querySelector(".box");
    console.log(dark);
    if (active) {
      dark.classList.add("DarkModeElementsShadow");
    } else {
      dark.classList.remove("DarkModeElementsShadow");
    }
    darkMode.addEventListener("click", function () {
      if (active) {
        dark.classList.add("DarkModeElementsShadow");
      } else {
        dark.classList.remove("DarkModeElementsShadow");
      }
    });
  } catch (err) {
    alert("invalid country name");
  }
}

/*Event Listneres*/

filterBox.addEventListener("click", function () {
  if (filterLists.style.display === "") {
    filterLists.style.display = "flex";
    if (active) {
      filterListItem = document.querySelectorAll(".filter-lists ul li");
      filterListItem.forEach((item) => item.classList.add("DarkModeElements"));
    } else {
      filterListItem = document.querySelectorAll(".filter-lists ul li");
      filterListItem.forEach((item) =>
        item.classList.remove("DarkModeElements")
      );
    }
  } else if (filterLists.style.display === "flex") {
    filterLists.style.display = "";
  }
});

filterLists.addEventListener("click", function (event) {
  let text = event.target.tagName;
  text = text.toLowerCase();
  if (text === "li") {
    let region = event.target.textContent;
    currentRegion = region;
    filterRegions(region);
  }
});

// searchBox.addEventListener('click',function(){
//     let country=searchBox.textContent.toLowerCase();

// })

darkMode.addEventListener("click", function (e) {
  e.preventDefault();
  active = !active;
  document.body.classList.toggle("DarkModeBody");
  // $("body *").toggleClass('DarkModeElements');
  console.log(nav);
  nav.classList.toggle("DarkModeElementsShadow");
  console.log(searchBox);
  searchBox.classList.toggle("DarkModeElementsShadow");
  filterBox.classList.toggle("DarkModeElementsShadow");
  darkMode.classList.toggle("DarkModeElements");
  searchInput.classList.toggle("DarkModeElements");
  suggestionsList.classList.toggle("DarkModeElements");
  console.log(filterLists.style.display);
  if (filterLists.style.display == "flex") {
    filterListItem = document.querySelectorAll(".filter-lists ul li");
    console.log(filterListItem);
    filterListItem.forEach((item) => item.classList.add("DarkModeElements"));
  }
  Box.forEach((country) => country.classList.toggle("DarkModeElementsShadow"));
  /* --- country page ----*/
  document.querySelector(".country-page .back-button").classList.toggle("DarkModeElementsShadow");
  $(".country-page .contry-border").toggleClass("DarkModeElementsShadow");
  if(active){
    document.querySelector('.mode span').textContent='Light Mode';
  }
  else{
    document.querySelector('.mode span').textContent='Dark Mode';
  }
});

searchInput.addEventListener("input", function (e) {
  e.preventDefault();
  const searchValue = searchInput.value.toLowerCase();
  const countriesToDisplay = allCountries.filter((country) => {
    return country.name.common.toLowerCase().startsWith(searchValue);
  });
  const countryNames = countriesToDisplay.map((country) => country.name.common);
  diplaySuggestions(countryNames);
});

searchBox.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Enter") {
    e.preventDefault();
    let name = searchInput.value.toLowerCase();
    if (name) {
      dipslayCountry(name);
    }
  }
});

document.addEventListener("click", function (e) {
  if (!e.target.closest(".search")) {
    suggestionsList.style.display = "none";
  } else {
    if (searchInput.value == "") {
      suggestionsList.innerHTML = "";
    }
    suggestionsList.style.display = "block";
  }
  if (!e.target.closest(".filter-box")) {
    filterLists.style.display = "";
  }
});

searchElement.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("hello");
  let name = e.target.closest(".result");
  if (name) {
    let countryName = name.textContent;
    dipslayCountry(countryName);
  }
});

filterRegions("ALL");


//----------------------------------- move to the selected country page ------------------------------




async function dipslayCountryInCountryPage(diplayedCountry) {
  try {
    let response = await fetch(
      `https://restcountries.com/v3.1/name/${diplayedCountry.toLowerCase()}`
    );
    let countries = await response.json();
    console.log(countries);
    let exactCountry = countries.filter(
      (country) =>
        country.name.common.toLowerCase() == diplayedCountry.toLowerCase()
    );
    // console.log(exactCountry);
    // console.log(diplayedCountry);
    if (exactCountry[0].name.common != diplayedCountry)
      throw new Error("Invalid name");
    container = document.querySelector(".country-page .container2");
    container.innerHTML = "";



  
  // get sub region
  let subregion;
  if (exactCountry[0].subregion) {
    subregion = exactCountry[0].subregion;
  }
  else {
    subregion = exactCountry[0].continents[0];
  }
  //-------------------------------

  // get languages
  let languages = Object.values(exactCountry[0].languages);
  languages = languages.join(', ')
  // ----------------------

    // get border countries
    let borderCountries = "";
    let borderCountriesArray = exactCountry[0].borders;
    if (borderCountriesArray) {
      for (let i = 0; i < borderCountriesArray.length; i++) {
        borderCountries += ('<div class="contry-border">' + borderCountriesArray[i] + '</div>\n');
      }
    }
    const html = `<div class="image-div"><img src=${
      exactCountry[0].flags.png
    } alt=${exactCountry[0].flags.alt}></div>
          <h2 class="country-name">${exactCountry[0].name.common}</h2>
          <div class="country-info" id="info-1">
            <ul class="info">
              <li><span>Native Name:</span> ${
                exactCountry[0].name.nativeName[
                  Object.keys(exactCountry[0].name.nativeName)[0]
                ].common
              }</li>
              <li><span>Population:</span> ${exactCountry[0].population}</li>
              <li><span>Region:</span> ${exactCountry[0].continents[0]}</li>
              <li><span>Sub Region:</span> ${subregion}</li >
              <li><span>Capital:</span> ${exactCountry[0].capital}</li>
            </ul>
          </div>
          <div class="country-info" id="info-2">
              <ul class="info">
                <li><span>Top Level Domain:</span> ${exactCountry[0].tld[0]}</li>
                <li><span>Currencies:</span> ${
                  exactCountry[0].currencies[
                    Object.keys(exactCountry[0].currencies)[0]
                  ].name
                } &nbsp;${
      exactCountry[0].currencies[Object.keys(exactCountry[0].currencies)[0]]
        .symbol
    }</li>
                <li><span>Languages:</span> ${languages}</li>
              </ul>
          </div>
          <div class="border-contries">
            <div id="border-word">Border Countries: </div>
            <div class="border-countries2">
              ${borderCountries}
            </div>  
            </div>
        </div>  
      </div>`;
    container.insertAdjacentHTML("beforeend", html);

        if (active) {
            document
              .querySelector(".country-page .back-button")
              .classList.add("DarkModeElementsShadow");
            $(".country-page .contry-border").addClass(
              "DarkModeElementsShadow"
            );
        } else {
            document
              .querySelector(".country-page .back-button")
              .classList.remove("DarkModeElementsShadow");
            $(".country-page .contry-border").removeClass(
              "DarkModeElementsShadow"
            );
        }
  } catch (err) {
    alert("invalid country name");
  }
}


document.querySelector(".country-countainer").addEventListener("click", function (event) {
    if (event.target.closest(".box") && !event.target.closest("ul.info")) {
      let targetBox = event.target.closest(".box");
      let countryName = targetBox.querySelector("h3").textContent;
      dipslayCountryInCountryPage(countryName);
      console.log(countryName);
      document.querySelector(".home-page").classList.add("hidden");
      document.querySelector(".country-page").classList.remove("hidden");
    }
  });

$("button.back-button").on('click', function () {
  document.querySelector(".home-page").classList.remove("hidden");
  document.querySelector(".country-page").classList.add("hidden");
  document.querySelector(".country-page .container2").innerHTML = "";
});

