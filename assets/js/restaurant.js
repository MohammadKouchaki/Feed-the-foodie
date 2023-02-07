var searchEl = document.getElementById("search");
var photosElOne = document.getElementById("photos-1");
var photosElTwo = document.getElementById("photos-2");
var photosElThree = document.getElementById("photos-3");
var distanceEl = document.getElementById("distance");
var cuisineEl = document.getElementById("cuisine");
var cityEl = document.getElementById("city");
var mapElOne = document.querySelector(".map-1");
var mapElTwo = document.querySelector(".map-2");
var mapElThree = document.querySelector(".map-3");
var buttonElOne = document.querySelector(".button-1");
var buttonElTwo = document.querySelector(".button-2");
var buttonElThree = document.querySelector(".button-3");
var imageElOne = document.getElementById("image-1");
var imageElTwo = document.getElementById("image-2");
var imageElThree = document.getElementById("image-3");
var locationElOne = document.getElementById("location-1");
var locationElTwo = document.getElementById("location-2");
var locationElThree = document.getElementById("location-3");
var ratingImageOne = document.getElementById("rating-img-1");
var ratingImageTwo = document.getElementById("rating-img-2");
var ratingImageThree = document.getElementById("rating-img-3");


//function to get lat and long of the selected city
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
var advisorUrl = 'https://api.content.tripadvisor.com/api/v1/location/search?key=' + APIkey1 + '&searchQuery=seafood&category=restaurant&latLong=42.381027,-71.08678&radius=50&radiusUnit=km&language=en'

fetch(advisorUrl, {
    method: "GET", 
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json',
    }
}
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (i = 0; i < data.length; i++) {
            var location_id = localStorage.setItem('locationId[i]', data.data[i].location_id * 1);
            console.log(data);//data includes city and distance

        }
    }))

//function to get the detail for the restaurant based on the location id fetched in the previous step
function renderInfo() {
    food = ""
    city = ""
    radius = ""
    for (i = 0; i < data.length; i++) {
        var locationId = JSON.parse(localStorage.getItem(locationId[i] * 1))
        var queryUrl = 'https://cors-anywhere.herokuapp.com/https://api.content.tripadvisor.com/api/v1/location/' + locationId[i] + '/photos?key=' + APIkey1 + '&language=en'
    }
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (i = 0; i < data.length; i++) {
                localStorage.setItem("image[i]", JSON.srtingify(data.see_all_phtos[i]));
                localStorage.setItem("address[i]", JSON.stringify(data.data.address[i]));
                localStorage.setItem("ratingImg[i]", JSON.stringify(data.rating_image_url[i]));
                localStorage.setItem("rating[i]", JSON.stringify(data.rating[i]));
                var contact = localStorage.setItem("phone[i]", JSON.stringify(data.phone[i]));
                var url = localStorage.setItem("website[i]", JSON.stringify(data.data.website[i]));
                var price = localStorage.setItem("price[i]", JSON.stringify(data.price[i]));
                console.log(data);
            }
        })

    function infoText() {
        for (i = 0; i < data.length; i++) {
            var images = JASON.parse(localStorage.getItem(image[i]));
            imageEl[i].setAttribute('src', images[i]);
            addressEl[i].textContent = JASON.parse(localStorage.getItem(address[i]));
            var ratingImg = JASON.parse(localStorage.getItem(ratingImage[i]))
            ratingEl[i].setAttribute('src', ratingImage[i]);
            ratingNum[i].textContent = JASON.parse(localStorage.getItem(rating[i]));
            contactEl[i].textContent = JASON.parse(localStorage.getItem(phone[i]));

        }

    }


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

searchEl.addEventListener("click", function (event) {
    event.preventDefault()
    var food = cuisineEl.value;
    var city = cityEl.value;
    var radius = distanceEl.value;
    if (food === " " || city === " " || radius === " ") {
        alert('Please Enter A valid Input!')
    } else {
        localStorage.setItem('food', food);
        localStorage.setItem('city', city);
        localStorage.setItem('radius', radius);
        renderInfo();
        textInfo();
        initMap();
    }
});

//This renders the map for three restaurants
var map;
function initMap() {
    for (i = 0; i < 4; i++) {
        var lat = localStorage.getItem('lat');
        var long = localStorage.getItem('long');
        map = new google.maps.Map(document.querySelector(".map-[i]"), {
            center: { lat: lat * 1, lng: long * 1 },
            zoom: 8,
        });
    }
}
window.initMap = initMap;


















