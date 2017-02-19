// Bulk of the JS Code

var locations = [];
var markers = [];

var people = {};

// Add any additional people here. Will be ported in via MySQL database

var hos_um = [
    {title: 'John', location: {lat: 39.325840, lng: -76.614019}, user: "j_cena", date: "03/01/2017"},
    {title: 'Will', location: {lat: 39.324587, lng: -76.615733}, user: "web_dubois", date: "03/01/2017"},
    {title: 'Ron', location: {lat: 39.324762, lng: -76.611908}, user: "ronnie_d", date: "03/01/2017"}
];

var hos_jhu = [
    {title: 'George', location: {lat: 39.331325, lng: -76.608177}, user: "prez1", date: "03/01/2017"},
    {title: 'Kim', location: {lat: 39.329117, lng: -76.607984}, user: "kim_k", date: "03/01/2017"},
    {title: 'Lebron', location: {lat: 39.326901, lng: -76.613413}, user: "lebron", date: "03/01/2017"},
    {title: 'Stephen', location: {lat: 39.323374, lng: -76.615634}, user: "chef_curry", date: "03/01/2017"}
];

var air_bwi = [
    {title: "Ariana", location: {lat: 39.331848, lng:-76.619518}, user: "a_grande", date: "03/01/2017"},
    {title: "Tom", location: {lat: 39.336421, lng: -76.618571}, user: "pats12", date: "03/01/2017"},
    {title: "Marilyn", location: {lat: 39.328711, lng: -76.616555}, user: "m_monroe", date: "03/01/2017"}
];

// Add these to "people"
// Add codes here

people["HOS_UM"] = hos_um;
people["HOS_JHU"] = hos_jhu;
people["AIR_BWI"] = air_bwi;

//TODO:
    // function that takes the location of input in CODES
    // Creates markers for all the fake people related to each code
    // Array of array of locations
    // locations[] = that spot in the array
    // make a marker for each
    // At the beginning of each checkCode, hide all markers


function checkCode(pos) {
    var input = document.getElementById("code").value;
    document.getElementById("result").innerHTML = "Code: " + input;

    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    locations = [];


    locations = people[input];
    if (locations == undefined) {
        window.alert("Invalid code!");
        return;
    }
    
    var d = window.prompt("Appointment Date (mm/dd/yyyy):")
    var obj = {title: "YOU", location: pos, user: "me", date: d};

    if (!people[input].includes(obj)) {
        people[input].push(obj);
    }

    makeMarkers(pos, d);
}

function makeMarkers(pos, d) {
    var bounds = new google.maps.LatLngBounds();
    var info = new google.maps.InfoWindow();

    for (var i = 0; i < locations.length; i++) {
        if (d != locations[i].date) {
            continue;
        }
        if (straightLineDist(pos, locations[i].location) > 16.1) {
            continue;
        }
        var marker = new google.maps.Marker({
            map: map,
            position: locations[i].location,
            title: locations[i].title,
            animation: google.maps.Animation.DROP,
            id: locations[i].user
        });
        markers.push(marker);

        marker.addListener('click', function() {
            infoWindow(this, info);
        });

        bounds.extend(marker.position);
    }
    map.fitBounds(bounds);
}

function infoWindow(marker, infoWin) {
    if (infoWin.marker != marker) {
        infoWin.marker = marker;
        infoWin.setContent("<div class='info'>" + marker.title + "<br/><i>@" + marker.id + "</i></div>");
        infoWin.open(map, marker);
        infoWin.addListener("closeclick", function() {
            infoWin.marker = null;
        });
    }
}
