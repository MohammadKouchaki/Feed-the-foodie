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
    var saveBtnEl = $(".save-recipe-btn")
    var shopBtnEl = $(".save-shopping-btn");
    var newSearchBtnEl = $("#new-search-btn")

    // ***************
    // DISPLAY RECIPES
    // ***************

    function displayRecipe(data) {
        // Display recipes
        $("#recipe-display").removeAttr("hidden");
        // Hide search options
        $("#search").attr("hidden", "hidden");

        // Recipe 1
        $("#save-recipe-btn1").attr("data-id", data[0].id);
        $("#recipe-heading1").text(data[0].title)
        $("#recipe-img1").attr("class", `flex flex-col items-stretch h-64 bg-[url('${data[0].image}')] bg-center bg-no-repeat bg-cover rounded-t-3xl md:w-1/3 md:h-auto md:rounded-t-none md:rounded-tl-3xl`)
        $("#recipe-ingredients-list1").text()
        $("#save-shopping-btn1").attr("data-id", data[0].id);


        // Recipe 2
        $("#save-recipe-btn2").attr("data-id", data[1].id);
        $("#recipe-heading2").text(data[1].title)
        $("#recipe-img2").attr("class", `flex flex-col items-stretch h-64 bg-[url('${data[1].image}')] bg-center bg-no-repeat bg-cover rounded-t-3xl md:w-1/3 md:h-auto md:rounded-t-none md:rounded-tl-3xl`)
        $("#recipe-ingredients-list2").text()
        $("#save-shopping-btn2").attr("data-id", data[1].id);


        // Recipe 3
        $("#save-recipe-btn3").attr("data-id", data[2].id);
        $("#recipe-heading3").text(data[2].title)
        $("#recipe-img3").attr("class", `flex flex-col items-stretch h-64 bg-[url('${data[2].image}')] bg-center bg-no-repeat bg-cover rounded-t-3xl md:w-1/3 md:h-auto md:rounded-t-none md:rounded-tl-3xl`)
        $("#recipe-ingredients-list3").text()
        $("#save-shopping-btn3").attr("data-id", data[2].id);

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

    // *************************************
    // SAVE ALL INGREDIENTS TO SHOPPING LIST
    // *************************************

    function toShoppingList(data) {
        var recipeIdShop = data

        // An empty array is created first
        var ingredientsSavedAll = []

        // If local storage is NOT empty, the existing data is added to the ingredientsSavedAll array
        var alreadyInStorageAll = localStorage.getItem("ingredient");
        if (alreadyInStorageAll !== null) {
            ingredientsSavedAll = JSON.parse(alreadyInStorageAll);
        }

        var spoonacularUrlId = "https://api.spoonacular.com/recipes/" + recipeIdShop + "/information?&apiKey=34486790fc234b2daa001d801bc76511"

        fetch(spoonacularUrlId)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                // For every new ingredient needed to be saved, check if it already exists in local storage
                for (var i = 0; i < data.extendedIngredients.length; i++) {
                    if (!ingredientsSavedAll.includes(data.extendedIngredients[i].name)) {
                        ingredientsSavedAll.push(data.extendedIngredients[i].name);
                    }
                }
                localStorage.setItem("ingredient", JSON.stringify(ingredientsSavedAll));
            })
    }



    shopBtnEl.on("click", function (event) {
        var idShop = $(this).attr("data-id");
        toShoppingList(idShop);
    })

    // *************************
    // SAVE RECIPE TO FAVOURITES
    // *************************

    function saveRecipe(data) {
        var recipeIdSave = data

        // An empty array is created first
        var recipeSaved = [];

        // If local storage is NOT empty, the existing data is added to the recipeSaved array
        var alreadyInStorage = localStorage.getItem("recipe");
        if (alreadyInStorage !== null) {
            recipeSaved = JSON.parse(alreadyInStorage);
        }

        // Check if the new recipe to be saved already exists in local storage
        if (!recipeSaved.includes(recipeIdSave)) {
            recipeSaved.push(recipeIdSave);
            // recipeSaved is added to local storage with a key of "recipe"
            localStorage.setItem("recipe", JSON.stringify(recipeSaved));
        }



    }

    saveBtnEl.on("click", function () {
        var idSave = $(this).attr("data-id");
        saveRecipe(idSave);
    })

    // **********
    // NEW SEARCH
    // **********

    newSearchBtnEl.on("click", function () {
        location.reload();
    })

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