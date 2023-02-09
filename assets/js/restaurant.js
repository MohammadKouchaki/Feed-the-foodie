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
    });

    // *******************
    // DISPLAY RESTAURANTS
    // *******************

    var searchFormEl = $("#search-form");
    var searBtnEl = $("#search-btn");
    var restaurantEl = $("#restaurant-section");
    var newSearchEl = $("#new-search");
    var newSearchBtnEl = $("#new-search-btn");
    var saveBtnEl = $(".save-btn");

    searBtnEl.on("click", function (event) {
        event.preventDefault();
        restaurantEl.removeAttr("hidden");
        newSearchEl.removeAttr("hidden");
        searchFormEl.attr("hidden", "hidden");
    })

    // *****************************
    // SAVE RESTAURANT TO FAVOURITES
    // *****************************

    function saveRestaurant(data) {
        var restIdSave = data

        // An empty array is created first
        var restaurantSaved = [];

        // If local storage is NOT empty, the existing data is added to the recipeSaved array
        var alreadyInStorage = localStorage.getItem("restaurant");
        if (alreadyInStorage !== null) {
            restaurantSaved = JSON.parse(alreadyInStorage);
        }

        // Check if the new recipe to be saved already exists in local storage
        if (!restaurantSaved.includes(restIdSave)) {
            restaurantSaved.push(restIdSave);
            // recipeSaved is added to local storage with a key of "recipe"
            localStorage.setItem("restaurant", JSON.stringify(restaurantSaved));
        }
    }

    saveBtnEl.on("click", function () {
        var idSave = $(this).attr("data-id");
        saveRestaurant(idSave);
    })

    // **********
    // NEW SEARCH
    // **********

    newSearchBtnEl.on("click", function () {
        location.reload();
    })

})