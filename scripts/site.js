var village;
(function () {
    "use strict";

    L.mapbox.accessToken = 'pk.eyJ1IjoiYW1icmlhc2hpciIsImEiOiJjaWZ0MXAybDcwZ3I2dHRseWI3NjAyMTZ2In0.eD7uxIRAY9ifI6ecnkiu-g';
    var map = L.mapbox.map('map', 'mapbox.streets').setView([35.914539, -86.847597], 13).addControl(L.mapbox.geocoderControl('mapbox.places', {
        autocomplete: true })),
     json = $.getJSON('http://villagemapserver.herokuapp.com/neighborhoods', processJsonGroups);
    var markers = new L.MarkerClusterGroup();
    var geocoder = new google.maps.Geocoder();

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
                    coordinates: [-86.847597, 35.914539]
                }
            }]
        })
        .on('click', function (e) {
           swal({
            title: 'Journey Church',
            text: 'Sunday 5pm. 828 Murfreesboro Rd, Franklin, TN 37064.' ,
            confirmButtonText: 'Back to map',
            closeOnConfirm: true
           });
        })
        .addTo(map);

    /////////////////////////////////////////////////////

    function processJsonGroups(data) {
    data.forEach(addMarker);
    map.addLayer(markers);
}
    function addMarker(m) {
      if (isNaN(m.lat) || isNaN(m.lng)) return;

        var marker = L.marker(
            new L.LatLng(m.lat, m.lng),
            {
                icon: L.mapbox.marker.icon({'marker-symbol': 'building', 'marker-color': '0044FF'}),
                title: m.name
            });

        marker.on('click', function(e){
            village = m;

            swal({
                  title: m.name,
                  text:'Please click the Connect button below to receive more information about this specific Village.',
                  showCancelButton: true,
                  confirmButtonText: "Connect",
                  cancelButtonText: "Back to map",
                  closeOnConfirm: false,
                  closeOnCancel: true
                },

                function(isConfirm){
                    if (isConfirm) {
                        getUserData();
                    }
                }
            );
        });
        markers.addLayer(marker);
    }
 }());

function getUserData(){
    var name = "First Last";
    var email = "you@Email.com";
    var address = "Adress, City State, Zip";
    var phone = "(xxx) xxx-xxxx";

    function doIt(){

        swal({
             title: "You're about to get connected! Enter your name. ",
             type: 'input',
             html: true ,
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: name },

            function(inputValue){
                if (inputValue === false) return false;
                if (inputValue === "") {
                    swal.showInputError("You need to write your name!");     return false;
                    }
                    name = inputValue;
                    getEmail();

               });

               function getEmail(){
                 swal({
                      title: "Please add your email address.",
                      type: 'input',
                      html: true ,
                     showCancelButton: true,
                     closeOnConfirm: false,
                     animation: "slide-from-top",
                     inputPlaceholder: email },

                     function(inputValue){
                         if (inputValue === false) return false;
                         if (inputValue === "") {
                             swal.showInputError("You need to write your Email!");     return false;
                             }
                             email = inputValue;
                             getAddy();
                        });
               }

        function getAddy(){
                      swal({
             title: "Now enter your address.",
             type: 'input',
             html: true ,
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: address },

            function(inputValue){
                if (inputValue === false) return false;
                if (inputValue === "") {
                    swal.showInputError("You need to write your address!");     return false;
                    }
                    address = inputValue;
                     getPhone();
                     });
            }

            function getPhone(){
                               swal({
             title: "Last step . . . enter your phone number.",
             type: 'input',
             html: true ,
            showCancelButton: true,
            confirmButtonText:"Submit",
            cancelButtonText: "Back to map",
            closeOnConfirm: false,
            closeOnCancel: true,
            animation: "slide-from-top",
            inputPlaceholder: phone },

            function(inputValue){
                if (inputValue === false) return false;
                if (inputValue === "") {
                    swal.showInputError("You need to write your phone number!");     return false;
                    }
                    phone = inputValue;
                        console.log("submit");
                          var body = "My name is " + name + ". Please get me in touch with someone from the " + village.name +  ". My phone is " + phone + " and my address is " + address + ". I look forward to hearing from you.";
                         $.post('http://villagemapserver.herokuapp.com/email', {sender: email, subject: village.name, body: body });
                          swal("Thank You!", "Someone from this Village will reach out in the next few days to tell you more and answer any questions you might have. - Village Staff", "success");
                 })
            };
    }
    doIt();
}
