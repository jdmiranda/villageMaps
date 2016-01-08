(function () {
    "use strict";


    L.mapbox.accessToken = 'pk.eyJ1IjoiYW1icmlhc2hpciIsImEiOiJjaWZ0MXAybDcwZ3I2dHRseWI3NjAyMTZ2In0.eD7uxIRAY9ifI6ecnkiu-g';
    var map = L.mapbox.map('map', 'mapbox.streets').setView([35.9292, -86.8575], 13).addControl(L.mapbox.geocoderControl('mapbox.places', {
        autocomplete: true })),
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
            if (entry.name.includes("Neighborhood")) {
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
    

    function addMarker(m) {
        var content = '<h2>' + m.name + '<\/h2>' +
            '<p> Please click the CONNECT button below to receive more information about this specific Village.' +
            '<button onclick="myFunction()">Connect</button>' + '<\/p>'
            ;


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

// function filter() {
//     var inputText = $('#filter_text').val();
//       alert("i was called");
//    var m;
//       geocoder.geocode({'address': inputText}, function (results, status) {
//                     if (status == google.maps.GeocoderStatus.OK) {
//                         m.lat = results[0].geometry.location.lat();
//                         m.lng = results[0].geometry.location.lng();
//                     }});

//                     L.mapbox
//         .featureLayer({
//             type: 'FeatureCollection',
//             features: [{
//                 type: 'Feature',
//                 properties: {
//                     'marker-color': '#548cba',
//                     'marker-size': 'large',
//                     'marker-symbol': 'religious-christian'
//                 },
//                 geometry: {
//                     type: 'Point',
//                     coordinates: [m.lat, m.lng]
//                 }
//             }]
//         })
//         .addTo(map);
//}

//}
var village;


function myFunction(){
    var name = "Name";
    var address = "Address";
    var email = "Email";
    var phone = "Phone";
    
    function doIt(){
        
        swal({   
             title: "Your about to get connected!",   
             type: 'input',
             html: true ,
            showCancelButton: true,   
            closeOnConfirm: false,   
            animation: "slide-from-top",   
            inputPlaceholder: name }, 
            
            function(inputValue){   
                if (inputValue === false) return false;      
                if (inputValue === "") {     
                    swal.showInputError("You need to write your name!");     return false   
                    }  
                    name = inputValue;
                    getAddy();
            
               });

                    
                      
        function getAddy(){
                      swal({   
             title: "Finding out where you live! To plug you in the right village.",   
             type: 'input',
             html: true ,
            showCancelButton: true,   
            closeOnConfirm: false,   
            animation: "slide-from-top",   
            inputPlaceholder: address }, 
            
            function(inputValue){   
                if (inputValue === false) return false;      
                if (inputValue === "") {     
                    swal.showInputError("You need to write your address!");     return false   
                    }     
                    address = inputValue;
                     getEmail();
                     });
            }
            
            function getEmail(){
                               swal({   
             title: "Grabbing your email so we can get in touch.",   
             type: 'input',
             html: true ,
            showCancelButton: true,   
            closeOnConfirm: false,   
            animation: "slide-from-top",   
            inputPlaceholder: email }, 
            
            function(inputValue){   
                if (inputValue === false) return false;      
                if (inputValue === "") {     
                    swal.showInputError("You need to write your email address!");     return false   
                    }     
                    email = inputValue;
                     getPhone();
                     });
            }
            
            function getPhone(){
                               swal({   
             title: "Last thing is your phone so we can give you a ring-a-ding.",   
             type: 'input',
             html: true ,
            showCancelButton: true,   
            closeOnConfirm: false,   
            animation: "slide-from-top",   
            inputPlaceholder: phone }, 
            
            function(inputValue){   
                if (inputValue === false) return false;      
                if (inputValue === "") {     
                    swal.showInputError("You need to write your phone number!");     return false   
                    }     
                    phone = inputValue;
                     confirmContactInfo();
                     });
            }
            
            function confirmContactInfo(){
                swal({   
                    title: "Sweet!",   
                    text: "Here's what we got: </br> " +
                   // village.name + "</br>" +
                     name + "</br> " + 
                    address + "</br>" +
                    email + "</br>" +
                    phone + "</br>",   
                    html: true,
                    showCancelButton: true,
                    confirmButtonText: "Looks good, Connect me!",   
                    cancelButtonText: "No, I've got cold feet!",   
                    closeOnConfirm: false,   
                    closeOnCancel: true
                    },
                    function(isConfirm){   
                        if (isConfirm) {     
                            swal("Sent!", "We super stoked to get in touch with you.", "success");
                     }
                    });
            }
    
    }
    function setVillage(m)
{
    village = m;
    myFunction();
};
    doIt();
}
