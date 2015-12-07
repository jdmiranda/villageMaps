var groups;
var groupTypes;
var filterGroups = [];
var geocoder = new google.maps.Geocoder();
var url = 'http://localhost:8080/json/groups.json'


function parseGroups(json) {
    groups = groups.groups.group;
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
};


var j = function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var contents = e.target.result;
        groups = JSON.parse(contents);
        groups = groups.groups.group;
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
        });
    };
    reader.readAsText(file)
};


document.getElementById('file-input')
    .addEventListener('change', j, false);
