var searchEl = document.getElementById("search");
var photosEl = document.getElementById("photos");
var distanceEl = document.getElementById("distance");
var cuisineEl = document.getElementById("cuisine");
var cityEl = document.getElementById("city");
var mapEl = document.querySelector(".map");
var buttonEl = document.querySelector(".button");
var imageEl = document.getElementById("image");
var locationEl = document.getElementById("location");





//function to get lat and long of the city
var latLong = 'http://api.openweathermap.org/geo/1.0/direct?q=amsterdam&limit=5&appid=7d1b285353ccacd5326159e04cfab063'

fetch(latLong)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var lat = localStorage.setItem('lat', data[0].lat * 1);
        var long = localStorage.setItem('long', data[0].lon * 1);
    })


//function to get restaurant name and location based on the cuisine and city within set radius 
APIkey1 = "2D3652D5BC3F451F8D340C99078D1247";

//var advisorUrl = 'https://cors-anywhere.herokuapp.com/https://api.content.tripadvisor.com/api/v1/location/search?key=' + APIkey1 + '&searchQuery=' + food + '&category=restaurant&latLong=' + lat+','+Long + '&radius=' + radius + '&radiusUnit=km&language=en'
var advisorUrl = 'https://cors-anywhere.herokuapp.com/https://api.content.tripadvisor.com/api/v1/location/search?key=' + APIkey1 + '&searchQuery=seafood&category=restaurant&latLong=42.381027,-71.08678&radius=50&radiusUnit=km&language=en'
fetch(advisorUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (i = 0; i < data.length; i++) {
            var local_id = localStorage.setItem('locationId[i]', data.data[i].location_id * 1);
            console.log(data);//data includes city and distance

        }
    })

//function to get the detail for the restaurant based on the location id
function renderInfo() {
    var locationId = JSON.parse(localStorage.getItem(locationId[i] * 1))
    var queryUrl = 'https://cors-anywhere.herokuapp.com/https://api.content.tripadvisor.com/api/v1/location/' + locationId[i] + '/photos?key=' + APIkey1 + '&language=en'

    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (i = 0; i < data.length; i++) {
                var images = localStorage.setItem("image[i]", JSON.srtingify(data.see_all_phtos[i]));
                var address = localStorage.setItem("address[i]", JSON.stringify(data.data.address[i]));
                var ratingImg = localStorage.setItem("ratingImg[i]", JSON.stringify(data.rating_image_url[i]));
                var rating = localStorage.setItem("rating[i]", JSON.stringify(data.rating[i]));
                var contact = localStorage.setItem("phone[i]", JSON.stringify(data.phone[i]));
                var url = localStorage.setItem("website[i]", JSON.stringify(data.data.website[i]));
                var price = localStorage.setItem("price[i]", JSON.stringify(data.price[i]));
                console.log(data);
            }
        })

    function infoText() {
        for (i = 0; i < data.length; i++) {
            JASON.parse(localStorage.getItem(image[i]));
            imageEl[i].setAttribute('src', images[i]);
            JASON.parse(localStorage.getItem(address[i]));
            addressEl[i].textContent = JASON.parse(localStorage.getItem('address[i]'));
            JASON.parse(localStorage.getItem(ratingImage[i]))
            ratingEl[i].setAttribute('src', ratingImage[i]);
            ratingNum[i].textContent = JASON.parse(localStorage.getItem(rating[i]));
            contactEl[i].textContent = JASON.parse(localStorage.getItem(phone[i]));

        }

    }


    // if (data.cuisine.localized_names !== "null") {
    // photosEl.setAttribute("src", "data.original.url")
    // } else {
    // alert("please choose a food couisine!")
    // }
    // renderPicture();
}


//get info for map
APIkey2 = "AIzaSyCLiiiOP1OEJwlRD3d0NgaOc_-xHo10TB8"

function renderMap() {
    var queryUrl = "https://maps.googleapis.com/maps/api/js?key=" + APIkey2 + "&callback=initMap&v=weekly"
    fetch(queryUrl)
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

var map;
function initMap() {
    var lat = localStorage.getItem('lat');
    var long = localStorage.getItem('long');
    map = new google.maps.Map(document.querySelector(".map-1"), {
        center: { lat: lat * 1, lng: long * 1 },
        zoom: 8,

    });

}
window.initMap = initMap;




/*searchEl.addEventListener("click", function (event) {
    event.preventDefault()
var food = cuisineEl.value;
var city = cityEl.value;
var radius = distanceEl.value;
if(food === nul || city === null || radius === null){
    alert(Please Enter A valid Input!)
}else{
    localStorage.setItem('food',food);
    localSorage.setItem('city',city);
    localStorage.setItem('radius',radius);
    renderInfo();
    chooseRestaurant();
    initMap();
}});

photosEl.addEventListener("click", function (event) {
    event.stopPropagation();
    
    photosEl.setAttribute("src", "https:/");//to be completed
    photosEl.setAttribute("href", "_blank");

})*/


















