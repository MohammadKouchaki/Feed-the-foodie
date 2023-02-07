$(document).ready(function () {
    // ******************
    // STYLING FOR NAVBAR
    // ******************

    var menuBtn = document.getElementById('menu-button');
    var menu = document.getElementById('menu');
    var barsIcon = document.getElementById('bars');
    var xmarkIcon = document.getElementById('xmark');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        barsIcon.classList.toggle('hidden');
        xmarkIcon.classList.toggle('hidden');
    })


    // *************************
    // DISPLAY RECIPE FAVOURITES
    // *************************

    function displayRecipe(data) {
        // The contents of this div are dynamically created with JS
        var htmlRec =
            `<div data-meal="${data.id}" class="p-6 flex flex-col items-stretch space-y-6 md:w-1/2 lg:w-1/3"
                <div class="card bg-lightGray rounded-3xl drop-shadow-md">
                    <a id="recipe-link-${data.id}" href="#" target="_blank" class="class="flex flex-col-reverse items-stretch text-left h-64 rounded-t-3xl bg-[url('${data.image}')] bg-center bg-no-repeat bg-cover">
                        <div class="recipe-title p-3 text-lg">
                            <h3 id="recipe-heading-${data.id}"></h3>
                        </div>
                    </a>
                    <div class="p-6">
                        <button data-meal="${data.id}" class="delete-btn-rec p-2 w-20 text-center text-white bg-darkOrange rounded-full hover:bg-lightOrange"><i data-meal="${data.id}" class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            </div>`

        // The html variable is added to the div created in HTML
        $("#fav-recipes-container").append(htmlRec);
        $("#recipe-heading-" + data.id).text(data.title);
        $("#recipe-link-" + data.idMeal).attr("href", data.sourceUrl);
    }

    // Event listener for the delete recipe button
    $(document).on("click", ".delete-btn-rec", function (event) {
        var recipeDeleted = $(event.target).data("meal");
        var recipeStored = JSON.parse(localStorage.getItem("recipe"));
        // Create a new array to be saved to local storage
        var newRecipeStored = []

        // Loop through every item in local storage, if the recipe in storage does NOT match the recipe being deleted, add it to the new array
        for (var i = 0; i < recipeStored.length; i++) {
            if (recipeDeleted !== parseInt(recipeStored[i])) {
                newRecipeStored.push(recipeStored[i]);
            }
        }
        // The new array gets saved to local storage
        localStorage.setItem("recipe", JSON.stringify(newRecipeStored));
    })

    function savedRecipes() {
        // Retrieve the stored recipes from localStorage
        var storedRecipe = JSON.parse(localStorage.getItem("recipe"));
        var recipeId;

        // If recipes were retrieved from localStorage, update the div for favourites
        if (storedRecipe !== null) {
            recipeId = storedRecipe;
        } else {
            return;
        }

        var urlWithRecipeId

        // For as many IDs as are saved to local storage fetch the API based on the specific ID saved and display it to the screen
        for (var i = 0; i < recipeId.length; i++) {
            urlWithId = "https://api.spoonacular.com/recipes/" + recipeId[i] + "/information?&apiKey=34486790fc234b2daa001d801bc76511"
            fetch(urlWithRecipeId)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    displayRecipe(data);
                })
        }
    }

    // *****************************
    // DISPLAY RESTAURANT FAVOURITES
    // *****************************

    function displayRestaurant(data, photoData) {
        // The contents of this div are dynamically created with JS
        var htmlRest =
            `<div data-rest="${data.location_id}" class="p-6 flex flex-col items-stretch space-y-6 md:w-1/2 lg:w-1/3">
                <div class="card bg-lightGray rounded-3xl drop-shadow-md">
                    <a id="restaurant-link-${data.location_id}" href="#" target="_blank"
                        class="flex flex-col-reverse items-stretch text-left h-64 rounded-t-3xl bg-[url('${photoData.data[0].images.medium.url}')] bg-center bg-no-repeat bg-cover ">
                        <div class="recipe-title p-3 text-lg">
                            <h3 id="restaurant-heading-${data.location_id}"></h3>
                        </div>
                    </a>
                    <div class="p-6">
                        <button data-rest="${data.location_id}" class="delete-btn-rest p-2 w-20 text-center text-white bg-darkOrange rounded-full hover:bg-lightOrange">
                        <i data-rest="${data.location_id}" class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            </div>`

        // The html variable is added to the div created in HTML
        $("#fav-restaurant-container").append(htmlRest);
        $("#restaurant-heading" + data.location_id).text(data.name);
        $("#restaurant-link-" + data.location_id).attr("href", data.web_url);
    }

    function savedRestaurants() {
        // Retrieve the stored recipes from localStorage
        var storedRestaurant = JSON.parse(localStorage.getItem("restaurant"));
        var restaurantId;
        // If recipes were retrieved from localStorage, update the div for favourites
        if (storedRestaurant !== null) {
            restaurantId = storedRestaurant;
        } else {
            return;
        }

        var urlWithRestId
        var urlWithRestIdPhoto
        // For as many IDs as are saved to local storage fetch the API based on the specific ID saved and display it to the screen
        for (var i = 0; i < restaurantId.length; i++) {
            urlWithRestId = "https://api.content.tripadvisor.com/api/v1/location/" + restaurantId[i] + "/details?key=2D3652D5BC3F451F8D340C99078D1247&language=en&currency=CAD'"
            urlWithRestIdPhoto = "https://api.content.tripadvisor.com/api/v1/location/" + restaurantId[i] + "/photos?key=2D3652D5BC3F451F8D340C99078D1247&language=en"

            fetch(urlWithRestId)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    fetch(urlWithRestIdPhoto)
                        .then(function (response) {
                            return response.json()
                        })
                        .then(function (photoData) {
                            displayRestaurant(data, photoData)
                        })
                })
        }
    }

    // Event listener for the delete restauran button
    $(document).on("click", ".delete-btn-rest", function(event) {
        var restaurantDeleted = $(event.target).data("rest");
        var restaurantStored = JSON.parse(localStorage.getItem("restaurant"));

        //Create a new array to be saved to local storage
        var newRestaurantStored = []

        //Loop through every item in local storage, if the recipe in storage does NOT match the recipe being deleted, add it to the new array
        for (var i = 0; i < restaurantStored.length; i++) {
            if (restaurantDeleted !== parseInt(restaurantStored[i])) {
                newRestaurantStored.push(restaurantStored[i]);
            }
        }
        // The new array gets saved to local storage
        localStorage.setItem("restaurant", JSON.stringify(newRestaurantStored));
    })


    // Init function

    function init() {
        savedRecipes();
        savedRestaurants();
    }

    init();

});
