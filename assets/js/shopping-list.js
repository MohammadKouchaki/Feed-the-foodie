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

    var clearBtnEl = $("#clear-btn");
    var listEl = $("#ingredients-list");
    var printEl = $("#print-btn");
    var inputEl = $("#ingredients-input");
    var submitBtnEl = $("#submit-btn")


    // *************************
    // ADD MORE TO SHOPPING LIST
    // *************************

    // Function to save new ingredients to local storage
    function saveIngredient() {
        // An empty array is created first
        var ingredientsSavedOne = [];

        // If local storage is NOT empty, the existing data is added to the ingredientsSavedOne array
        var alreadyInStorageOne = localStorage.getItem("ingredient");
        if (alreadyInStorageOne !== null) {
            ingredientsSavedOne = JSON.parse(alreadyInStorageOne);
        }

        // If the input box is blank, the value will not be saved
        if (inputEl.val().trim() === "") {
            return
        } else {
            // The new ingredient is added to the ingredientsSavedOne array
            ingredientsSavedOne.push(inputEl.val());
            // ingredientsSavedOne is added to local storage with a key of "ingredient"
            localStorage.setItem("ingredient", JSON.stringify(ingredientsSavedOne));
        };
    }


    // Event listener for the submit button
    submitBtnEl.on("click", function () {
        saveIngredient();
        listEl.append("<li><input type='checkbox'id='" + inputEl.val() + "'>  " + ingredientsSaved[i] + "</li>");
        inputEl.val("");
    });


    // *********************
    // DISPLAY SHOPPING LIST
    // *********************

    // The following function renders items in a list as <li> elements
    function createList() {
        var ingredientsSaved = JSON.parse(localStorage.getItem("ingredient"));
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


    // Init function

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