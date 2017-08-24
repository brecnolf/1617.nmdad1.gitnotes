var Mobility = {
    $content: $('.content'),
    $form: $('form'),

    toggleLoading: function(){
        // Toggle loading indicator
        this.$content.toggleClass('content--loading');
         
        // Toggle the submit button so we don't get double submissions
        // http://stackoverflow.com/questions/4702000/toggle-input-disabled-attribute-using-jquery
        this.$form.find('button').prop('disabled', function(i, v) { return !v; });
    },
};

 
$(document).ready(function(){
    Mobility.$form.on('submit', function(e){
        e.preventDefault();
        Mobility.toggleLoading(); // call the loading function
    });
});

// Locatie van browser ophalen.
                
var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -51.082, lng: 3.574 },
        zoom: 11
    });

    var ctaLayer = new google.maps.KmlLayer({
        url: 'https://dl.dropboxusercontent.com/u/21787985/Parkinglocaties.kml',
        map: map
    });

    ctaLayer.addListener('click', function (kmlEvent) {
        var text = kmlEvent.featureData.description;
        showInContentWindow(text);
    });

    var taxiLayer = new google.maps.KmlLayer({
        url: 'https://dl.dropboxusercontent.com/u/21787985/Taxilocaties.kml',
        map: map
    });

    taxiLayer.addListener('click', function (kmlEvent) {
        var text = kmlEvent.featureData.description;
        showInContentWindow(text);
    });

    var stationsLayer = new google.maps.KmlLayer({
        url: 'https://dl.dropboxusercontent.com/u/21787985/Stations.kml',
        map: map
    });

    stationsLayer.addListener('click', function (kmlEvent) {
        var text = kmlEvent.featureData.description;
        showInContentWindow(text);
    });

    var laadpuntLayer = new google.maps.KmlLayer({
        url: 'https://dl.dropboxusercontent.com/u/21787985/Laadpunten.kml',
        map: map
    });

    laadpuntLayer.addListener('click', function (kmlEvent) {
        var text = kmlEvent.featureData.description;
        showInContentWindow(text);
    });

    var fietsdienstLayer = new google.maps.KmlLayer({
        url: 'https://dl.dropboxusercontent.com/u/21787985/Fietsdienstverlening.kml',
        map: map
    });

    fietsdienstLayer.addListener('click', function (kmlEvent) {
        var text = kmlEvent.featureData.description;
        showInContentWindow(text);
    });



    function showInContentWindow(text) {
        var sidediv = document.getElementById('content-window');
        sidediv.innerHTML = text;
    }
    infoWindow = new google.maps.InfoWindow;


    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Uw locatie');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }



}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}