    // ******************
    // SHOPPING-LIST.HTML
    // ******************


$(document).ready(function () {
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