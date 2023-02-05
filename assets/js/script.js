$(document).ready(function () {
    var spoonacularUrlIng = "https://api.spoonacular.com/recipes/findByIngredients?number=3&ignorePantry=true&apiKey=34486790fc234b2daa001d801bc76511&ingredients=";
    var spoonacularUrlCui = "https://api.spoonacular.com/recipes/complexSearch?number=3&apiKey=34486790fc234b2daa001d801bc76511&cuisine=";
    var spoonacularUrlMeal = "https://api.spoonacular.com/recipes/complexSearch?number=3&apiKey=34486790fc234b2daa001d801bc76511&type="

    var meatsEl = $("#meats");
    var vegetablesEl = $("#vegetables");
    var fruitsEl = $("#fruits");
    var othersEl = $("#others")
    var submitBtnIEl = $("#ingredients-btn");
    var submitBtnCEl = $("#cuisine-btn")
    var cuisineEl = $("#cuisine");
    var submitBtnMealEl = $("#meal-btn");
    var mealEl = $("#meal");


    // ***************
    // DISPLAY RECIPES
    // ***************

    function displayRecipe(data) {
        $("#recipe-display").removeAttr("hidden");

        // Recipe 1
        $("#recipe-heading1").text(data[0].title)
        $("#recipe-img1").attr("src", data[0].image)
        $("#recipe-ingredients-list1").text()


        // Recipe 2
        $("#recipe-heading2").text(data[1].title)
        $("#recipe-img2").attr("src", data[1].image)
        $("#recipe-ingredients-list2").text()


        // Recipe 3
        $("#recipe-heading3").text(data[2].title)
        $("#recipe-img3").attr("src", data[2].image)
        $("#recipe-ingredients-list3").text()

    }

    function getInfo(data) {
        var spoonacularUrlId1 = "https://api.spoonacular.com/recipes/" + data[0].id + "/information?&apiKey=34486790fc234b2daa001d801bc76511"
        var spoonacularUrlId2 = "https://api.spoonacular.com/recipes/" + data[1].id + "/information?&apiKey=34486790fc234b2daa001d801bc76511"
        var spoonacularUrlId3 = "https://api.spoonacular.com/recipes/" + data[2].id + "/information?&apiKey=34486790fc234b2daa001d801bc76511"

        // Recipe 1
        fetch(spoonacularUrlId1)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                $("#recipe-instructions1").append(data.instructions);
                for (var i = 0; i < data.extendedIngredients.length; i++) {
                    $("#recipe-ingredients-list1").append(`<li>${data.extendedIngredients[i].measures.us.amount} ${data.extendedIngredients[i].measures.us.unitShort} ${data.extendedIngredients[i].name}</li>`);
                };
            })

        // Recipe 2
        fetch(spoonacularUrlId2)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                $("#recipe-instructions2").append(data.instructions);
                for (var i = 0; i < data.extendedIngredients.length; i++) {
                    $("#recipe-ingredients-list2").append(`<li>${data.extendedIngredients[i].measures.us.amount} ${data.extendedIngredients[i].measures.us.unitShort} ${data.extendedIngredients[i].name}</li>`);
                };
            })

        // Recipe 2
        fetch(spoonacularUrlId3)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                $("#recipe-instructions3").append(data.instructions);
                for (var i = 0; i < data.extendedIngredients.length; i++) {
                    $("#recipe-ingredients-list3").append(`<li>${data.extendedIngredients[i].measures.us.amount} ${data.extendedIngredients[i].measures.us.unitShort} ${data.extendedIngredients[i].name}</li>`);
                };
            })
    }



    // ********************
    // SEARCH BY INGREDIENT
    // ********************

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

        fetch(newUrlIngredients)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayRecipe(data);
                getInfo(data);
            })
    })

    // *****************
    // SEARCH BY CUISINE
    // *****************

    // Event listener for the submit button (cuisine)
    submitBtnCEl.on("click", function (event) {
        event.preventDefault();

        var newUrlCuisine = spoonacularUrlCui + cuisineEl.val();

        fetch(newUrlCuisine)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayRecipe(data.results);
                getInfo(data.results);
            })
    })

    // *******************
    // SEARCH BY MEAL TYPE
    // *******************

    submitBtnMealEl.on("click", function (event) {
        event.preventDefault();

        var newUrlMeal = spoonacularUrlMeal + mealEl.val();

        fetch(newUrlMeal)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayRecipe(data.results);
                getInfo(data.results);
            })
    })



});