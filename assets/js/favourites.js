$(document).ready(function () {
    var menuBtn = document.getElementById('menu-button');
    var menu = document.getElementById('menu');
    var barsIcon = document.getElementById('bars');
    var xmarkIcon = document.getElementById('xmark');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        barsIcon.classList.toggle('hidden');
        xmarkIcon.classList.toggle('hidden');
    })


    function displayRecipe(data) {
        // The contents of this div are dynamically created with JS
        var html =
            `<div data-meal="${data.id}" class="p-6 flex flex-col items-stretch space-y-6 md:w-1/2 lg:w-1/3">
                <a id="recipe-link-${data.id}" href="#" class="flex flex-col-reverse items-stretch text-left h-64 bg-[url(${data.image})] bg-center bg-no-repeat bg-cover">
                    <div class="recipe-title p-3 text-lg">
                        <h3 id="recipe-heading-${data.id}"></h3>
                    </div>
                </a>
                <button class="delete-btn p-2 w-20 text-center text-white bg-darkOrange rounded-full hover:bg-lightOrange"><i class="fa-solid fa-trash-can"></i></button>
            </div>`


        // The html variable is added to the div created in HTML
        $("#fav-recipes-container").append(html);
        $("#recipe-heading-" + data.id).text(data.title);
        $("#recipe-link-" + data.idMeal).attr("href", data.sourceUrl);
    }

    // Event listener for the delete recipe button
    $(document).on("click", ".delete-btn", function (event) {
        var recipeDeleted = $(this).attr("data-meal");
        var recipeStored = JSON.parse(localStorage.getItem("recipe"));
        // Create a new array to be saved to local storage
        var newRecipeStored = []

        // Loop through every item in local storage, if the recipe in storage does NOT match the recipe being deleted, add it to the new array
        for (var i = 0; i < recipeStored.length; i++) {
            if (recipeDeleted !== recipeStored[i]) {
                newRecipeStored.push(recipeStored[i]);
            }
        }
        // The new array gets saved to local storage
        localStorage.setItem("recipe", JSON.stringify(newRecipeStored));
        location.reload();
    })


    function init() {
        // Retrieve the stored recipes from localStorage
        var storedRecipe = JSON.parse(localStorage.getItem("recipe"));
        var recipeId;

        // If recipes were retrieved from localStorage, update the div for favourites
        if (storedRecipe !== null) {
            recipeId = storedRecipe;
        } else {
            return;
        }


        // For as many IDs as are saved to local storage fetch the API based on the specific ID saved and display it to the screen
        for (var i = 0; i < recipeId.length; i++) {
            fetch("https://api.spoonacular.com/recipes/" + recipeId[i] + "/information?&apiKey=34486790fc234b2daa001d801bc76511")
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    displayRecipe(data);
                    console.log(data);
                })
        }
    }

    init();

});
