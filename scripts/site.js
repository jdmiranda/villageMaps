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
     .on('mouseover', function(e) {
    e.layer.openPopup();
     })
     .on('mouseout', function(e) {
     e.layer.closePopup();
     })
  .bindPopup('Journey Church')
    .addTo(map);
    
var villageLayer = [];
var title = 'village';
var markers = new L.MarkerClusterGroup();
var groups;
var groupTypes;
var filterGroups = [];
var geocoder = new google.maps.Geocoder();
var url = 'http://localhost:8080/json/groups.json'
var json = $.getJSON('https://s3.amazonaws.com/journeyfranklin/groups.json', function(data)
{
    
    var groups = data.groups.group;
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
                    entry.lat = results[0].geometry.location.lat();
                    entry.lng = results[0].geometry.location.lng();
                    filterGroups.push(entry);
                    addMarker(entry);
                }
            });
   
        }
    })
});

//Here's what i'm trying to accomplish  https://www.mapbox.com/mapbox.js/example/v1.0.0/listing-marker-clusters/

function addMarker(m){
      var content = '<h2>'+ m.name + '<\/h2>' +
        '<p>Address: ' + m.meeting_address + '<br \/>' +
        'Time: ' + m.meeting_time + '<br\/>' +
        'Day: ' + m.meeting_day + '<br\/>' + 
        'Frequency: ' + m.meeting_frequency +
        '<\/p>' ;
    
              L.mapbox.featureLayer({
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            properties: {
                'marker-color': '#548cba',
                'marker-size': 'medium',
                'marker-symbol': 'building'
            },
            geometry: {
                type: 'Point',
                coordinates: [ m.lng, m.lat]
            }
        }]
    })
    .on('mouseover', function(e) {
    e.layer.openPopup();
     })
     .on('mouseout', function(e) {
     e.layer.closePopup();
     })
    .bindPopup(content)
    .addTo(map);          
}
