$(document).ready(function () {
    var mealDBAPIById = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
    var recipeDivEl = $(".recipe");

    function displayRecipe(data) {
        // The contents of this div are dynamically created with JS
        console.log(data);
        var html = '<h2 id="recipe-heading-' + data.idMeal + '" class="my-4 font-bold">Recipe title</h2>' +
            '<h3 id="recipe-ingredients-heading-' + data.idMeal + '" class="my-2 font-medium">Ingredients</h3>' +
            '<ul id="recipe-ingredients-list-' + data.idMeal + '"></ul>' +
            '<h3 id="recipe-instructions-heading-' + data.idMeal + '" class="my-2 font-medium">Instructions</h3>' +
            '<p id="recipe-instructions-' + data.idMeal + '"></p>' +
            '<a id="recipe-link-' + data.idMeal + '" href="#" target="_blank" class="my-2 font-medium">This the link to the recipe</a>' +
            '<button id="delete-recipe-' + data.idMeal + '" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-6">Delete this recipe</button>' +
            '<ol id="recipe-info-' + data.idMeal + '">' +
            '<li id="cuisine-' + data.idMeal + '"></li>' +
            '<li id="category-' + data.idMeal + '"></li>' +
            '<li id="tags-' + data.idMeal + '"></li>' +
            '</ol>';

        // The html variable is added to the div created in HTML
        recipeDivEl.append(html);

        $("#recipe-heading-"+ data.idMeal).text(data.strMeal);
        $("#recipe-instructions-"+ data.idMeal).text(data.strInstructions);
        $("#recipe-link-"+ data.idMeal).attr("href", data.strSource);
        $("#cuisine-"+ data.idMeal).text(data.strArea);
        $("#category-"+ data.idMeal).text(data.strCategory);
        $("#tags-"+ data.idMeal).text(data.strTags);

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
