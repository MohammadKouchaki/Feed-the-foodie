$(document).ready(function () {

    // ***********
    // SAMPLE.HTML
    // ***********

    var submitBtnEl = $("#submitbtn");
    var inputEl = $("#ingredients-input");


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
            $("form").append('<div id="alert" role="alert" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-4 rounded">Error! You have to type something. Please try again.</div>')
            return
        } else {
            // The new ingredient is added to the ingredientsSaved array
            ingredientsSaved.push(inputEl.val());
            // ingredientsSaved is added to local storage with a key of "ingredient"
            localStorage.setItem("ingredient", JSON.stringify(ingredientsSaved));
        };
    }


    // Event listener for the submit button
    submitBtnEl.on("click", function (event) {
        event.preventDefault();
        $("#alert").remove();
        saveIngredient();
    });


    // ******************
    // SHOPPING-LIST.HTML
    // ******************

    var clearBtnEl = $("#clear-btn");
    var listEl = $("#ingredients-list");
    var printEl = $("#print-btn");

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