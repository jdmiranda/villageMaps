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
       json = [{"_id":"56a9f1025e7cad420da7d1d9","id":"313318c5-6de0-11e5-af42-0673d9c9b5d6","name":"Fieldstone Neighborhood","address":"712 Mockingbird Dr.,Franklin,37069","lat":35.972845,"lng":-86.9074569,"__v":0},{"_id":"56a9f1025e7cad420da7d1d8","id":"7f7bb1c8-6d23-11e5-af42-0673d9c9b5d6","name":"Canterbury Neighborhood","address":"2408 Tapestry Ct.,Thompson Station,37179","lat":35.8177867,"lng":-86.8813967,"__v":0},{"_id":"56a9f1015e7cad420da7d1d5","id":"d4e7a01d-6d22-11e5-af42-0673d9c9b5d6","name":"Franklin Green/Boyd Mill Neighborhood","address":"3231 Gardendale Dr,Franklin,37064","lat":35.920621,"lng":-86.912114,"__v":0},{"_id":"56a9f1015e7cad420da7d1d6","id":"b28dfe6a-6d23-11e5-af42-0673d9c9b5d6","name":"Spring Hill South Neighborhood","address":"1803 Covey Rise Ct,Spring Hill,37174","lat":35.74817300000001,"lng":-86.88085699999999,"__v":0},{"_id":"56a9f1025e7cad420da7d1d7","id":"fd50001b-6de4-11e5-af42-0673d9c9b5d6","name":"Split Log Neighborhood","address":"7 Oxmoor Ct,Brentwood,37027","lat":35.975798,"lng":-86.73572899999999,"__v":0},{"_id":"56a9f1025e7cad420da7d1da","id":"de5adc5e-6ddf-11e5-af42-0673d9c9b5d6","name":"Pinkerton Neighborhood","address":"1000 Hickory Ridge Dr.,Franklin,37064","lat":35.921988,"lng":-86.851066,"__v":0},{"_id":"56a9f1055e7cad420da7d1db","id":"191d5b80-6deb-11e5-af42-0673d9c9b5d6","name":"Edmondson Neighborhood","address":"679 Huntington Parkway,Nashville,37211","lat":36.049109,"lng":-86.736785,"__v":0},{"_id":"56a9f1055e7cad420da7d1dc","id":"b7a0e75c-6dea-11e5-af42-0673d9c9b5d6","name":"Old Hickory Neighborhood","address":"5790 Brentwood Trace,Brentwood,37027","lat":36.038848,"lng":-86.775841,"__v":0},{"_id":"56a9f1055e7cad420da7d1dd","id":"f1d86ce3-70ea-11e5-af42-0673d9c9b5d6","name":"Murfreesboro Neighborhood","address":"3210 Chinoe Dr.,Murfreesboro,37129","lat":35.9096277,"lng":-86.4215237,"__v":0},{"_id":"56a9f1055e7cad420da7d1de","id":"7fafbe21-6deb-11e5-af42-0673d9c9b5d6","name":"Harding Neighborhood","address":"438 Coventry Dr.,Nashville,37211","lat":36.079775,"lng":-86.735925,"__v":0},{"_id":"56a9f1095e7cad420da7d1df","id":"a3de17ec-6de3-11e5-af42-0673d9c9b5d6","name":"Cool Springs Neighborhood","address":"154 Allenhurst Circle,Franklin,37067","lat":35.9402169,"lng":-86.80019800000001,"__v":0},{"_id":"56a9f1095e7cad420da7d1e1","id":"2891459f-6dec-11e5-af42-0673d9c9b5d6","name":"Green Hills Neighborhood","address":"3507 Wilbur Place,Nashville,37204","lat":36.109736,"lng":-86.78222,"__v":0},{"_id":"56a9f1095e7cad420da7d1e0","id":"ac0e48ab-6dda-11e5-af42-0673d9c9b5d6","name":"Forrest Crossing Neighborhood","address":"642 Tynebrae Dr.,Franklin,37064","lat":35.900454,"lng":-86.83658899999999,"__v":0},{"_id":"56a9f1095e7cad420da7d1e2","id":"36594487-87c1-11e5-b35f-066776a6309b","name":"Harding Girls Neighborhood","address":"5034 Montclair Dr.,Nashville,37211","lat":36.068174,"lng":-86.753463,"__v":0},{"_id":"56a9f1095e7cad420da7d1e3","id":"ff637788-6dee-11e5-af42-0673d9c9b5d6","name":"East Nashville Neighborhood","address":"808 A Riverside Dr.,Nashville,37206","lat":36.179916,"lng":-86.72623,"__v":0},{"_id":"56a9f1095e7cad420da7d1e4","id":"71040a08-6d23-11e5-af42-0673d9c9b5d6","name":"Thompson Station North Neighborhood","address":"3401 Colebrooke Dr.,Thompson Station,37179","lat":35.8297311,"lng":-86.8941024,"__v":0},{"_id":"56a9f10d5e7cad420da7d1e5","id":"f3c75047-6ded-11e5-af42-0673d9c9b5d6","name":"Fairview Neighborhood","address":"7203 Rye Ct.,Fairview,37062","lat":35.96756,"lng":-87.13153299999999,"__v":0},{"_id":"56a9f10d5e7cad420da7d1e6","id":"55c10277-6de9-11e5-af42-0673d9c9b5d6","name":"Lenox Village Neighborhood","address":"502 Cedar Pointe Parkway,Antioch,37013","lat":36.0463637,"lng":-86.6682407,"__v":0},{"_id":"56a9f10d5e7cad420da7d1e7","id":"097aaac9-6d23-11e5-af42-0673d9c9b5d6","name":"Jim Warren Neighborhood","address":"428 Boyd Mill Ave,Franklin,37064","lat":35.922648,"lng":-86.8816756,"__v":0},{"_id":"56a9f10d5e7cad420da7d1e8","id":"7ff0ebc8-6dd6-11e5-af42-0673d9c9b5d6","name":"South Buckner Neighborhood","address":"1709 Whitt Dr.,Spring Hill,37174","lat":35.777183,"lng":-86.92475300000001,"__v":0},{"_id":"56a9f10d5e7cad420da7d1e9","id":"768c3724-6dee-11e5-af42-0673d9c9b5d6","name":"Bellevue Neighborhood","address":"7252 Hwy 70 S,Nashville,37221","lat":36.0738513,"lng":-86.9299162,"__v":0},{"_id":"56a9f1115e7cad420da7d1ea","id":"56653100-6ddd-11e5-af42-0673d9c9b5d6","name":"South Carothers Neighborhood","address":"8011 Monte Bella Pl,Franklin,37067","lat":35.9056088,"lng":-86.8216691,"__v":0},{"_id":"56a9f1115e7cad420da7d1eb","id":"7753e902-6de4-11e5-af42-0673d9c9b5d6","name":"Moores Landing Neighborhood","address":"938 McKays Ct.,Brentwood,37027","lat":35.9685127,"lng":-86.8276721,"__v":0},{"_id":"56a9f1115e7cad420da7d1ec","id":"80b8000e-6dec-11e5-af42-0673d9c9b5d6","name":"Airport Neighborhood","address":"401 Springview Dr.,Nashville,37214","lat":36.157274,"lng":-86.686002,"__v":0},{"_id":"56a9f1115e7cad420da7d1ed","id":"29b59abf-6d23-11e5-af42-0673d9c9b5d6","name":"Franklin High Neighborhood","address":"1020 Brink Place,Franklin,37064","lat":35.9362179,"lng":-86.881896,"__v":0},{"_id":"56a9f1115e7cad420da7d1ee","id":"c792a244-6dd6-11e5-af42-0673d9c9b5d6","name":"North Buckner Neighborhood","address":"2813 Iroquois Dr.,Thompson Station,37179","lat":35.787643,"lng":-86.8790719,"__v":0},{"_id":"56a9f1155e7cad420da7d1ef","id":"a637c616-6dd9-11e5-af42-0673d9c9b5d6","name":"Franklin South Neighborhood","address":"407 Meadowcrest Circle,Franklin,37064","lat":35.895453,"lng":-86.845962,"__v":0},{"_id":"56a9f1155e7cad420da7d1f0","id":"420db745-6dd4-11e5-af42-0673d9c9b5d6","name":"Maury County Neighborhood","address":"5589 Reynolds Rd,Spring Hill,37174","lat":35.7037986,"lng":-86.79071549999999,"__v":0},{"_id":"56a9f1155e7cad420da7d1f1","id":"f572c256-6de3-11e5-af42-0673d9c9b5d6","name":"Aspen Grove Neighborhood","address":"16205 Wyndchase Circle,Franklin,37067","lat":35.9478123,"lng":-86.83929409999999,"__v":0},{"_id":"56a9f1195e7cad420da7d1f2","id":"4486c042-6ded-11e5-af42-0673d9c9b5d6","name":"West Nashville Neighborhood","address":"3323 Acklen Ave,Nashville,37212","lat":36.13682,"lng":-86.817376,"__v":0},{"_id":"56a9f1195e7cad420da7d1f3","id":"cd562691-6d23-11e5-af42-0673d9c9b5d6","name":"Spring Hill North Neighborhood","address":"1614 Zurich Dr.,Spring Hill,37174","lat":35.763362,"lng":-86.899194,"__v":0},{"_id":"56a9f1195e7cad420da7d1f4","id":"bfe91c16-6ddc-11e5-af42-0673d9c9b5d6","name":"North Columbia Ave Neighborhood","address":"304 Battle Ave,Franklin,37064","lat":35.912747,"lng":-86.88080699999999,"__v":0},{"_id":"56a9f11d5e7cad420da7d1f5","id":"68cddb8c-6de1-11e5-af42-0673d9c9b5d6","name":"Williamson Square Neighborhood","address":"1705 Tensaw Circle,Franklin,37067","lat":35.9178335,"lng":-86.7987251,"__v":0},{"_id":"56a9f11d5e7cad420da7d1f7","id":"9d82ffdb-6de2-11e5-af42-0673d9c9b5d6","name":"Franklin East Neighborhood","address":"4026 Clovercroft Rd.,Franklin,37067","lat":35.914558,"lng":-86.809646,"__v":0},{"_id":"56a9f11d5e7cad420da7d1f6","id":"3ea09ff9-6de3-11e5-af42-0673d9c9b5d6","name":"McKay's Mill Neighborhood","address":"1417 Chantilly Lane,Franklin,37067","lat":35.928858,"lng":-86.778752,"__v":0},{"_id":"56a9f11d5e7cad420da7d1f8","id":"a77aa2d6-6d22-11e5-af42-0673d9c9b5d6","name":"Westhaven Neighborhood","address":"467 Wiregrass Ln,Franklin,37064","lat":35.931138,"lng":-86.93293400000002,"__v":0},{"_id":"56a9f11d5e7cad420da7d1f9","id":"5d8ddc53-6de7-11e5-af42-0673d9c9b5d6","name":"Nolensville Neighborhood","address":"603 Shadow Glen Drive,Nashville,37211","lat":36.0392002,"lng":-86.7151801,"__v":0},{"_id":"56a9f1215e7cad420da7d1fa","id":"ebe597a1-6dec-11e5-af42-0673d9c9b5d6","name":"Antioch Neighborhood","address":"3361 Mimosa Drive,Nashville,37211","lat":36.095497,"lng":-86.723384,"__v":0},{"_id":"56a9f1215e7cad420da7d1fb","id":"5e80f046-6de6-11e5-af42-0673d9c9b5d6","name":"Brentwood Neighborhood","address":"5104 Ravens Glen,Nashville,37211","lat":36.016377,"lng":-86.73625299999999,"__v":0},{"_id":"56a9f1255e7cad420da7d1fc","id":"f9e4239c-6de9-11e5-af42-0673d9c9b5d6","name":"Hickory Hollow Neighborhood","address":"1900 Wild Oaks Ct,Antioch,37013","lat":36.048976,"lng":-86.64353299999999,"__v":0}],

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
      console.log(data);
  var groups = data.groups.group;
  var i, j, tempAry, chunk = 10;
  for (i = 0; i < groups.length; i+=chunk) {
    tempAry = groups.slice(i, i+chunk);
    // do whatever
    data.forEach(addMarker);
    map.addLayer(markers);
  }
  function processEntry (entry, idx, ary) {
    window.setTimeout(function() {
      if (entry.status != "Active") {
        return;
      }
      if (entry.meeting_address === "") {
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
                    swal.showInputError("You need to write your name!");     return false;
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
                    swal.showInputError("You need to write your address!");     return false;
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
                    swal.showInputError("You need to write your phone number!");     return false;
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
