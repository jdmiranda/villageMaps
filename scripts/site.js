

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
                    entry.lat = results[0].geometry.location.lat();
                    entry.lng = results[0].geometry.location.lng();
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
                coordinates: [ entry.lng, entry.lng]
            }
        }]
    })
  .bindPopup('data about group here')
    .addTo(map); 
                }
            });

            filterGroups.push(entry);
      
        }
    })
});
