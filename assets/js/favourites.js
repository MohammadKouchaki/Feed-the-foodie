$(document).ready(function () {
    function displayRecipe(data) {
        // The contents of this div are dynamically created with JS
        var html =
            '<article class="overflow-hidden rounded-lg shadow-lg">' 
            
            +

            '<img alt="Photo of a recipe" class="block h-auto w-full" id="recipe-img-' + data.id + '>' 
            
            +

            '<div class="flex items-center justify-between leading-tight p-2 md:p-4">'
            
            +  
            
            '<h1 class="text-lg" id="recipe-heading-' + data.id + '>Recipe Title</h1>'

            +

            '</div>'
           
            +

            '<div class="flex items-center justify-between leading-none p-2 md:p-4">'

            +

            '<a id="recipe-link-' + data.id + '" class="flex items-center no-underline px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"          href="#" target="_blank">Link to the recipe<svg aria-hidden="true"           class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"            xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"           clip-rule="evenodd"></path></svg></a>'                    
            
            +

            '<a data-meal=' + data.id + ' id="delete-recipe-' + data.id + '"               class="no-underline text-grey-darker hover:text-red-darkdelete-btn inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Delete this recipe</a>'

            +

            '</div></article>'


        // The html variable is added to the div created in HTML
        $("#fav-recipes-container").append(html);

        $("#recipe-heading-" + data.id).text(data.title);
        $("#recipe-img-" + data.id).attr("src", data.image);
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
