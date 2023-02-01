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
            $("form").append('<div id="alert" role="alert" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error! You have to type something. Please try again.</div>')
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
        saveIngredient();
    });
});