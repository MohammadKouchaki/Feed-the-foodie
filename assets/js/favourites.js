$(document).ready(function () {
    var mealDBAPIById = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
    var recipeDivEl = $(".recipe");
    var recipeHeadingEl

    function displayRecipe(data) {
        
        // The contents of this div are dynamically created with JS
        var html = '<h2 id="recipe-heading" class="my-4 font-bold">' + recipeHeadingEl + '</h2>' +
            '<h3 id="recipe-ingredients-heading" class="my-2 font-medium">Ingredients</h3>' +
            '<ul id="recipe-ingredients-list"></ul>' +
            '<h3 id="recipe-instructions-heading" class="my-2 font-medium">Instructions</h3>' +
            '<p id="recipe-instructions"></p>' +
            '<a id="recipe-link" href="#" target="_blank" class="my-2 font-medium">This the link to the recipe</a>' +
            '<button id="delete-recipe" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-6">Delete this recipe</button>' +
            '<ol id="recipe-info">' +
            '<li id="cuisine"></li>' +
            '<li id="category"></li>' +
            '<li id="tags"></li>' + 
            '</ol>';

        // The html variable is added to the div created in HTML
        recipeDivEl.append(html);

        recipeHeadingEl = $("#recipe-heading").text(data.strMeal);
        // $("#recipe-instructions").text(data.strInstructions);
        // $("#recipe-link").attr("href", data.strSource);
        // $("#cuisine").text(data.strArea);
        // $("#category").text(data.strCategory);
        // $("#tags").text(data.strTags);

        for (var i = 1; i < 22; i++) {
            var strIng = "strIngredient" + i;
            var strMeas = "strMeasure" + i;
            if (data[strIng] === "") {
                return;
            } else if (data[strIng] === null) {
                return;
            } else {
                $("#recipe-ingredients-list").append("<li>" + data[strMeas] + " " + data[strIng] + "<li");
            }
        };
    }

    var recipeId;

    function fetchById(newURL) {
        // Retrieve the stored recipes from localStorage
        var storedRecipe = JSON.parse(localStorage.getItem("recipe"));

        // If recipes were retrieved from localStorage, update the div for favourites
        if (storedRecipe !== null) {
            recipeId = storedRecipe;
        } else {
            return;
        }

        // For as many id as are saved to local storage fetch the API based on the specific ID saved and display it to the screen
        fetch(newURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayRecipe(data.meals[0]);
            })

    }

    function init() {
        var newURL
        var storageId = JSON.parse(localStorage.getItem("recipe"))
        for (var i = 0; i < storageId.length; i++) {
            newURL = mealDBAPIById + storageId[i]
            fetchById(newURL);
        }
    }

    init()

    // const tempEl = document.getElementById("temp")
    
    // fetch(queryURL)
    // .then(function (response) {
    //     return response.json();
    // })
    // .then(function (data) {
    //     // console.log(data);
    //     todayweatherEl.classList.remove("d-none");
    //     // Parse response to display current weather
    //     const currentDate = new Date(data.dt * 1000);
    //     const day = currentDate.getDate();
    //     const month = currentDate.getMonth() + 1;
    //     const year = currentDate.getFullYear();
    //     nameEl.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ") ";
    //     let weatherPic = data.weather[0].icon;
    //     currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
    //     currentPicEl.setAttribute("alt", data.weather[0].description);
    //     currentTempEl.innerHTML = "Temperature: " + k2f(data.main.temp) + " &#176F";
    //     currentHumidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";
    //     currentWindEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";

});
