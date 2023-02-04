$(document).ready(function () {
    var mealDBApi = "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=";
    var meatsEl = $("#meats");
    var vegetablesEl = $("#vegetables");
    var fruitsEl = $("#fruits");
    var beansEl = $("#beans")
    var submitBtnEl = $("button");

    // Event listener for the submit button
    submitBtnEl.on("click", function (event) {
        event.preventDefault();
        var newUrl = ""

        if (meatsEl.val() !== null && vegetablesEl.val() !== null && fruitsEl.val() !== null && beansEl.val() !== null) {
            newUrl = `${mealDBApi}${meatsEl.val()},${vegetablesEl.val()},${fruitsEl.val()},${beansEl.val()}`;
        } else if (meatsEl.val() !== null && vegetablesEl.val() !== null && fruitsEl.val() !== null && beansEl.val() === null) {
            newUrl = `${mealDBApi}${meatsEl.val()},${vegetablesEl.val()},${fruitsEl.val()}`;
        } else if (meatsEl.val() !== null && vegetablesEl.val() !== null && fruitsEl.val() === null && beansEl.val() === null) {
            newUrl = `${mealDBApi}${meatsEl.val()},${vegetablesEl.val()}`;
        } else if ((meatsEl.val() !== null && vegetablesEl.val() === null && fruitsEl.val() === null && beansEl.val() === null)) {
            newUrl = `${mealDBApi}${meatsEl.val()}`;
        } else {
            newUrl = "https://www.themealdb.com/api/json/v2/9973533/random.php"
        }
        
        console.log(newUrl)

        fetch(newUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
            })
    })

});