$(document).ready(function () {
    var mealDBAPIById = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="

    function displayRecipe(data) {
        // The contents of this div are dynamically created with JS
        console.log(data);
        var html = 
            '<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">' +
            '<div class="flex flex-col items-center pb-10">' +
            '<h2 id="recipe-heading-' + data.idMeal + '" class="mt-4 text-xl font-medium text-gray-900 dark:text-white"></h2>' +
            // The ingredients and instructions are optional
            // '<h3 id="recipe-ingredients-heading-' + data.idMeal + '" class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Ingredients</h3>' +
            // '<ul id="recipe-ingredients-list-' + data.idMeal + '"></ul>' +
            // '<h3 id="recipe-instructions-heading-' + data.idMeal + '" class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Instructions</h3>' +
            // '<p id="recipe-instructions-' + data.idMeal + '" class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>' +
            '<div class="flex mt-4 space-x-3 md:mt-6">' +
            '<a id="recipe-link-' + data.idMeal + '" href="#" target="_blank" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Link to the recipe<svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a>' +
            '<button id="delete-recipe-' + data.idMeal + '" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Delete this recipe</button>' + '</div></div></div>'

        // The html variable is added to the div created in HTML
        $("#fav-recipes-container").append(html);

        $("#recipe-heading-" + data.idMeal).text(data.strMeal);
        $("#recipe-instructions-" + data.idMeal).text(data.strInstructions);
        $("#recipe-link-" + data.idMeal).attr("href", data.strSource);
        $("#cuisine-" + data.idMeal).text(data.strArea);
        $("#category-" + data.idMeal).text(data.strCategory);

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


        // For as many id as are saved to local storage fetch the API based on the specific ID saved and display it to the screen
        for (var i = 0; i < recipeId.length; i++) {
            fetch(mealDBAPIById + recipeId[i])
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    displayRecipe(data.meals[0]);
                })
        }
    }

    init();

});
