

var groups;
var groupTypes;
var filterGroups = [];
var geocoder = new google.maps.Geocoder();
var url = 'http://localhost:8080/json/groups.json'
var json = $.getJSON('https://s3.amazonaws.com/journeyfranklin/groups.json', function(data)
{
    
    var groups = data.groups.group;
    console.log(data.groups.group.length);
    groups.forEach(function (entry) {
        if (entry.status != "Active") {
            return;
        }

        if (entry.meeting_address == "") {
            return;
        }
        if (entry.name.includes("Village")) {
            var address = entry.meeting_address + "," + entry.meeting_city + "," + entry.meeting_postcode;

            geocoder.geocode({'address': address}, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    entry.latitude = results[0].geometry.location.lat();
                    entry.longitude = results[0].geometry.location.lng();

                }
            });

            filterGroups.push(entry);
        }
    })
});


// function parseGroups(json) {
//     groups = groups.group;
//     groups.forEach(function (entry) {
//         if (entry.status != "Active") {
//             return;
//         }

//         if (entry.meeting_address == "") {
//             return;
//         }
//         if (entry.name.includes("Village")) {
//             var address = entry.meeting_address + "," + entry.meeting_city + "," + entry.meeting_postcode;

//             geocoder.geocode({'address': address}, function (results, status) {

//                 if (status == google.maps.GeocoderStatus.OK) {
//                     entry.latitude = results[0].geometry.location.lat();
//                     entry.longitude = results[0].geometry.location.lng();

//                 }
//             });

//             filterGroups.push(entry);
//         }
//     })
// };
// var a = parseGroups(json.responseJSON);

// var j = function readSingleFile(e) {
//     var file = e.target.files[0];
//     if (!file) {
//         return;
//     }
//     var reader = new FileReader();
//     reader.onload = function (e) {
//         var contents = e.target.result;
//         groups = JSON.parse(contents);
//         groups = groups.groups.group;
//         groups.forEach(function (entry) {
//             if (entry.status != "Active") {
//                 return;
//             }

//             if (entry.meeting_address == "") {
//                 return;
//             }
//             if (entry.name.includes("Village")) {
//                 var address = entry.meeting_address + "," + entry.meeting_city + "," + entry.meeting_postcode;

//                 geocoder.geocode({'address': address}, function (results, status) {

//                     if (status == google.maps.GeocoderStatus.OK) {
//                         entry.latitude = results[0].geometry.location.lat();
//                         entry.longitude = results[0].geometry.location.lng();

//                     }
//                 });

//                 filterGroups.push(entry);
//             }
//         });
//     };
//     reader.readAsText(file)
// };


// document.getElementById('file-input')
//     .addEventListener('change', j, false);
    
//     L.mapbox.accessToken = 'pk.eyJ1IjoiYW1icmlhc2hpciIsImEiOiJjaWZ0MXAybDcwZ3I2dHRseWI3NjAyMTZ2In0.eD7uxIRAY9ifI6ecnkiu-g';
// var map = L.mapbox.map('map', 'mapbox.pencil')
//     .setView([35.9292, -86.8575], 9);


L.mapbox.accessToken = 'pk.eyJ1IjoiYW1icmlhc2hpciIsImEiOiJjaWZ0MXAybDcwZ3I2dHRseWI3NjAyMTZ2In0.eD7uxIRAY9ifI6ecnkiu-g';
var map = L.mapbox.map('map', 'mapbox.pencil')
    .setView([35.9292, -86.8575], 9);


var featureLayer = L.mapbox.featureLayer({
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            properties: {
                'marker-color': '#548cba',
                'marker-size': 'large',
                'marker-symbol': 'religious-christian'
            },
            geometry: {
                type: 'Point',
                coordinates: [ -86.8594, 35.9318]
            }
        }]
    })
  .bindPopup('data about group here')
    .addTo(map);

// The HTML we put in bindPopup doesn't exist yet, so we can't just say
// $('#mybutton'). Instead, we listen for click events on the map element which
// will bubble up from the tooltip, once it's created and someone clicks on it.
$('#map').on('click', '.trigger', function() {
    alert('something goes here');
});

