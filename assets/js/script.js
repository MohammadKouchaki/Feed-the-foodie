$(document).ready(function () {
    var mealDBApi = "https://www.themealdb.com/api/json/v2/9973533/filter.php?";
    var meatsEl = $("#meats");
    var vegetablesEl = $("#vegetables");
    var fruitsEl = $("#fruits");
    var beansEl = $("#beans")
    var submitBtnIEl = $("#ingredients-btn");
    var submitBtnCEl = $("#cuisine-btn")
    var cuisineEl = $("#cuisine")

    // Event listener for the submit button (ingredients)
    submitBtnIEl.on("click", function (event) {
        event.preventDefault();
        var newUrlIngredients = ""

        if (meatsEl.val() !== null && vegetablesEl.val() !== null && fruitsEl.val() !== null && beansEl.val() !== null) {
            newUrlIngredients = `i=${mealDBApi}${meatsEl.val()},${vegetablesEl.val()},${fruitsEl.val()},${beansEl.val()}`;
        } else if (meatsEl.val() !== null && vegetablesEl.val() !== null && fruitsEl.val() !== null && beansEl.val() === null) {
            newUrlIngredients = `i=${mealDBApi}${meatsEl.val()},${vegetablesEl.val()},${fruitsEl.val()}`;
        } else if (meatsEl.val() !== null && vegetablesEl.val() !== null && fruitsEl.val() === null && beansEl.val() === null) {
            newUrlIngredients = `i=${mealDBApi}${meatsEl.val()},${vegetablesEl.val()}`;
        } else if ((meatsEl.val() !== null && vegetablesEl.val() === null && fruitsEl.val() === null && beansEl.val() === null)) {
            newUrlIngredients = `i=${mealDBApi}${meatsEl.val()}`;
        } else {
            newUrlIngredients = "https://www.themealdb.com/api/json/v2/9973533/random.php"
        }

        console.log(newUrlIngredients)

        fetch(newUrlIngredients)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
            })
    })

    // Event listener for the submit button (cuisine)
    submitBtnCEl.on("click", function (event) {
        event.preventDefault();
        var newUrlCuisine = mealDBApi + "a=" + cuisineEl.val();

        console.log(newUrlCuisine)


        fetch(newUrlCuisine)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
            })
    })

});