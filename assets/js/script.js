$(document).ready(function () {
    // ********************
    // SEARCH BY INGREDIENT
    // ********************

    var spoonacularUrlIng = "https://api.spoonacular.com/recipes/findByIngredients?number=3&ignorePantry=true&apiKey=34486790fc234b2daa001d801bc76511&ingredients=";
    var spoonacularUrlCui = "https://api.spoonacular.com/recipes/complexSearch?number=3&apiKey=34486790fc234b2daa001d801bc76511&cuisine=";

    var meatsEl = $("#meats");
    var vegetablesEl = $("#vegetables");
    var fruitsEl = $("#fruits");
    var othersEl = $("#others")
    var submitBtnIEl = $("#ingredients-btn");
    var submitBtnCEl = $("#cuisine-btn")
    var cuisineEl = $("#cuisine")

    // Event listener for the submit button (ingredients)
    submitBtnIEl.on("click", function (event) {
        event.preventDefault();
        var newUrlIngredients = ""

        // Meat yes
        if (meatsEl.val() !== null) {
            newUrlIngredients = `${spoonacularUrlIng}${meatsEl.val()}`;
            // Meat yes, Vegetables yes
            if (vegetablesEl.val() !== null) {
                newUrlIngredients = `${spoonacularUrlIng}${meatsEl.val()},${vegetablesEl.val()}`;
                // Meat yes, Vegetables yes, Fruit yes
                if (fruitsEl.val() !== null) {
                    newUrlIngredients = `${spoonacularUrlIng}${meatsEl.val()},${vegetablesEl.val()},${fruitsEl.val()}`;
                    // Meat yes, Vegetables yes, Fruit yes, Other yes
                    if (othersEl.val() !== null) {
                        newUrlIngredients = `${spoonacularUrlIng}${meatsEl.val()},${vegetablesEl.val()},${fruitsEl.val()},${othersEl.val()}`;
                    }
                // Meat yes, Vegetables yes, Fruit no
                } else {
                    // Meat yes, Vegetables yes, Fruit no, Others yes
                    if (othersEl.val() !== null) {
                        newUrlIngredients = `${spoonacularUrlIng}${meatsEl.val()},${vegetablesEl.val()},${othersEl.val()}`;
                    }
                }
                // Meat yes, Vegetables no
            } else {
                // Meat yes, Vegetables no, Fruit yes
                if (fruitsEl.val() !== null) {
                    newUrlIngredients = `${spoonacularUrlIng}${meatsEl.val()},${fruitsEl.val()}`;
                    // Meat yes, Vegetables no, Fruit yes, Others yes
                    if (othersEl.val() !== null) {
                        newUrlIngredients = `${spoonacularUrlIng}${meatsEl.val()},${fruitsEl.val()},${othersEl.val()}`;
                    }
                    // Meat yes, Vegetables no, Fruit no
                } else {
                    // Meat yes, Vegetables no, Fruit no, Others yes
                    if (othersEl.val() !== null) {
                        newUrlIngredients = `${spoonacularUrlIng}${meatsEl.val()},${othersEl.val()}`;
                    }
                }
            }
            // Meat no 
        } else {
            // Meat no, Vegetables yes
            if (vegetablesEl.val() !== null) {
                newUrlIngredients = `${spoonacularUrlIng}${vegetablesEl.val()}`;
                // Meat no, Vegetables yes, Fruit yes
                if (fruitsEl.val() !== null) {
                    newUrlIngredients = `${spoonacularUrlIng}${vegetablesEl.val()},${fruitsEl.val()}`;
                    // Meat no, Vegetables yes, Fruit yes, Others yes
                    if (othersEl.val() !== null) {
                        newUrlIngredients = `${spoonacularUrlIng}${vegetablesEl.val()},${fruitsEl.val()},${othersEl.val()}`;
                    }
                    // Meat no, Vegetables yes, Fruit no
                } else {
                    // Meat no, Vegetables yes, Fruit no, Others yes
                    if (othersEl.val() !== null) {
                        newUrlIngredients = `${spoonacularUrlIng}${vegetablesEl.val()},${othersEl.val()}`;
                    }
                }
                // Meat no, Vegetables no
            } else {
                // Meat no, Vegetables no, Fruit yes
                if (fruitsEl.val() !== null) {
                    newUrlIngredients = `${spoonacularUrlIng},${fruitsEl.val()}`;
                    // Meat no, Vegetables no, Fruit yes, Others yes
                    if (othersEl.val() !== null) {
                        newUrlIngredients = `${spoonacularUrlIng},${fruitsEl.val()},${othersEl.val()}`;
                    }
                    // Meat no, Vegetables no, Fruit no
                } else {
                    // Meat no, Vegetables no, Fruit no, Others yes
                    if (othersEl.val() !== null) {
                        newUrlIngredients = `${spoonacularUrlIng},${othersEl.val()}`;
                    }
                }
            }

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



    // *****************
    // SEARCH BY CUISINE
    // *****************

    // Event listener for the submit button (cuisine)
    submitBtnCEl.on("click", function (event) {
        event.preventDefault();

        var newUrlCuisine = spoonacularUrlCui + cuisineEl.val()

        fetch(newUrlCuisine)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
            })
    })

    // *******************
    // SEARCH BY MEAL TYPE
    // *******************

});