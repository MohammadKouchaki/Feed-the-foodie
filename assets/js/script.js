$(document).ready(function () {
    var submitBtnEl = $("#submitbtn");
    var inputEl = $("#ingredients-input");
    var clearBtnEl = $("#clear-btn");
    var listEl = $("#ingredients-list");
    var printEl = $("#print-btn");

    // ***************************
    // INGREDIENTS / SHOPPING LIST
    // ***************************

    // Function to save new ingredients to local storage
    function saveIngredient() {
        // An empty array is created first
        var ingredientsSaved = [];

        // If local storage is NOT empty, the existing data is added to the ingredientsSaved array
        var alreadyInStorage = localStorage.getItem("ingredient");
        if (alreadyInStorage !== null) {
            ingredientsSaved = JSON.parse(alreadyInStorage);
        }

        // If the input box is blank, the value will not be saved and an alert box will pop up
        if (inputEl.val().trim() === "") {
            // $("form").append('<div id="alert" role="alert" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-4 rounded">Error! You have to type something. Please try again.</div>')
            return
        } else {
            // The new ingredient is added to the ingredientsSaved array
            ingredientsSaved.push(inputEl.val());
            // ingredientsSaved is added to local storage with a key of "ingredient"
            localStorage.setItem("ingredient", JSON.stringify(ingredientsSaved));
        };
    }


    // Event listener for the submit button
    submitBtnEl.on("click", function () {
        $("#alert").remove();
        saveIngredient();
        listEl.append("<li><input type='checkbox'id='" + inputEl.val() + "'>  " + ingredientsSaved[i] + "</li>");
        inputEl.val("");
    });


    // The following function renders items in a list as <li> elements
    function createList() {
        var ingredientsSaved = JSON.parse(localStorage.getItem("ingredient"))
        // Render a new li for each score
        for (var i = 0; i < ingredientsSaved.length; i++) {
            listEl.append("<li><input type='checkbox'id='" + ingredientsSaved[i] + "'>  " + ingredientsSaved[i] + "</li>");
        }
    }

    // Event listener and function to clear the shopping list
    clearBtnEl.on("click", function () {
        localStorage.clear();
        listEl.html("");
    })

    // Event listener and function to print the shopping list
    printEl.on("click", function () {
        window.print();
    })


    // **************
    // RECIPE DISPLAY
    // **************

    var mealDBAPI = "https://www.themealdb.com/api/json/v1/1/random.php";
    var recipeHeadingEl = $("#recipe-heading");
    var ingListEl = $("#recipe-ingredients-list");
    var recStepEl = $("#recipe-instructions");
    var recLinkEl = $("#recipe-link");
    var cuisineEl = $("#cuisine");
    var categoryEl = $("#category");
    var tagsEl = $("#tags");
    var saveRepBtnEl = $("#recipe-save-btn");

    fetch(mealDBAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayRecipe(data.meals[0]);
            console.log(data.meals[0])
        })

    var recipeId

    function displayRecipe(data) {
        recipeHeadingEl.text(data.strMeal);
        recStepEl.text(data.strInstructions);
        recLinkEl.attr("href", data.strSource);
        cuisineEl.text(data.strArea);
        categoryEl.text(data.strCategory);
        tagsEl.text(data.strTags);

        recipeId = data.idMeal;

        for (var i = 1; i < 22; i++) {
            var strIng = "strIngredient" + i;
            var strMeas = "strMeasure" + i;
            if (data[strIng] === "") {
                return;
            } else if (data[strIng] === null) {
                return;
            } else {
                ingListEl.append("<li>" + data[strMeas] + " " + data[strIng] + "<li");
            }
        };
    }

    // Function to save the recipe Id to local storage
    function saveRecipe() {
        // An empty array is created first
        var recipeSaved = [];

        // If local storage is NOT empty, the existing data is added to the recipeSaved array
        var alreadyInStorage = localStorage.getItem("recipe");
        if (alreadyInStorage !== null) {
            recipeSaved = JSON.parse(alreadyInStorage);
        }

        // The new recipe Id is added to the recipeSaved array
        recipeSaved.push(recipeId);
        // recipeSaved is added to local storage with a key of "recipe"
        localStorage.setItem("recipe", JSON.stringify(recipeSaved));
    }

    // Event listener for the save the recipe button
    saveRepBtnEl.on("click", saveRecipe)

    // This function is being called below and will run when the page loads
    function init() {
        // Retrieve the stored ingredients from localStorage
        var storedIngredients = JSON.parse(localStorage.getItem("ingredient"));

        // If ingredients were retrieved from localStorage, update the shopping list array to it
        if (storedIngredients !== null) {
            ingredientsSaved = storedIngredients;
        } else {
            return;
        }
        createList();
    }

    init();


});