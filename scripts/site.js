(function () {
    L.mapbox.accessToken = 'pk.eyJ1IjoiYW1icmlhc2hpciIsImEiOiJjaWZ0MXAybDcwZ3I2dHRseWI3NjAyMTZ2In0.eD7uxIRAY9ifI6ecnkiu-g';
    var map = L.mapbox.map('map', 'mapbox.pencil').setView([35.9292, -86.8575], 9),
        json = $.getJSON('https://s3.amazonaws.com/journeyfranklin/groups.json', processJsonGroups),
        url = 'http://localhost:8080/json/groups.json',
        title = 'village',
        groups = null,
        groupTypes = null,
        villageLayer = [],
        filterGroups = [],
        markers = new L.MarkerClusterGroup(),
        geocoder = new google.maps.Geocoder();

    // Add church marker
    L.mapbox
        .featureLayer({
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
                    coordinates: [-86.8594, 35.9318]
                }
            }]
        })
        .on('mouseover', function (e) {
            e.layer.openPopup();
        })
        .on('mouseout', function (e) {
            e.layer.closePopup();
        })
        .bindPopup('Journey Church')
        .addTo(map);

    /////////////////////////////////////////////////////

    function processJsonGroups(data) {
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
        });
        map.addLayer(markers);
    }

    //Here's what i'm trying to accomplish  https://www.mapbox.com/mapbox.js/example/v1.0.0/listing-marker-clusters/
    function addMarker(m) {
        var content = '<h2>' + m.name + '<\/h2>' +
            '<p>Address: ' + m.meeting_address + '<br \/>' +
            'Time: ' + m.meeting_time + '<br\/>' +
            'Day: ' + m.meeting_day + '<br\/>' +
            'Frequency: ' + m.meeting_frequency + '<br\/>' +
            '<br\/>' +
            '<button id="get-info" onclick="infoButtonClicked();">Get Info</button>' +
            '<\/p>';

        var marker = L.marker(
            new L.LatLng(m.lat, m.lng),
            {
                icon: L.mapbox.marker.icon({'marker-symbol': 'building', 'marker-color': '0044FF'}),
                title: m.name
            });

        marker.bindPopup(content);
        markers.addLayer(marker);
    }
}());

function filter() {
    var inputText = $('#filter_text').val();
    alert("Filter text: " + inputText);
}

function infoButtonClicked() {
    alert("info button clicked");
}