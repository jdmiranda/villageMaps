var village;
  function sendEmail(subject, body)
    {
      window.open('mailto:jeremy.d.miranda@gmail.com?subject=' + subject + '&body=' + body);
    }
(function () {
    "use strict";

    L.mapbox.accessToken = 'pk.eyJ1IjoiYW1icmlhc2hpciIsImEiOiJjaWZ0MXAybDcwZ3I2dHRseWI3NjAyMTZ2In0.eD7uxIRAY9ifI6ecnkiu-g';
    var map = L.mapbox.map('map', 'mapbox.streets').setView([35.914539, -86.847597], 13).addControl(L.mapbox.geocoderControl('mapbox.places', {
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
                    coordinates: [-86.847597, 35.914539]
                }
            }]
        })
        .on('click', function (e) {
           swal('Journey Church');
        })
        .addTo(map);

    /////////////////////////////////////////////////////

    function processJsonGroups(data) {
  var groups = data.groups.group;
  var i, j, tempAry, chunk = 10;
  for (i = 0; i < groups.length; i+=chunk) {
    tempAry = groups.slice(i, i+chunk);
    // do whatever
    tempAry.forEach(processEntry);
    map.addLayer(markers);
  }
  function processEntry (entry, idx, ary) {
    window.setTimeout(function() {
      if (entry.status != "Active") {
        return;
      }
      if (entry.meeting_address == "") {
        return;
      }
      if (entry.name.includes("Neighborhood")) {
        var address = entry.meeting_address + "," + entry.meeting_city + "," + entry.meeting_postcode;
        console.log(address);

        geocoder.geocode({'address': address}, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            entry.lat = results[0].geometry.location.lat();
            entry.lng = results[0].geometry.location.lng();
            filterGroups.push(entry);
            addMarker(entry);
          }
        });
      }
    }, 4000*idx);
  }
}


    function addMarker(m) {

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
    var name = "Name";
    var address = "Adress, City State, Zip";
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
                    text: "Click the send email button to open up your email client and take the first step in getting connected." ,
                    html: true,
                    showCancelButton: true,
                    confirmButtonText: "Send email",
                    cancelButtonText: "Back to map",
                    closeOnConfirm: false,
                    closeOnCancel: true
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            var subject = village.name;
                            var body = "My name is " + name + ". Please get me in touch with someone from the " + village.name +  ". My phone is " + phone + " and my address is " + address + ". I look forward to hearing from you.";
                           sendEmail(subject, body);
                            swal("Thank You!", "Someone from this Village will reach out in the next few days to tell you more and answer any question you might have. - Village Staff", "success");
                     }
                    });
            }

    }
    doIt();
}
