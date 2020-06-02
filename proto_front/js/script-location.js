$(document).ready(function () {
  var cityName;
  var nblieux;
  var previousQuery;

  // The div showing the results is hidden by default
  document.getElementById("container-map").style.display = "none";
  $("#results").hide();
  $(".proximite").hide();
  $('#phraseResult').hide();
  $('#pluriel').hide();
  
  locationConsent();

  // It is necessary for the user to accept the location on his device, if OK, the successFunction() is called else errorFunction
  function locationConsent() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    }
  }
  
  //Get latitude and longitude of the device, Call functions map() and getGeoCityName()
  function successFunction(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    document.getElementById("container-map").style.display = '';
    $("#results").show();
    $(".proximite").show();
    console.log(lat);
    console.log(long);
    map(lat, long);
    getGeoCityName(lat, long);
  }

  function errorFunction() {
    console.warn("La localisation n'est pas activée sur votre appareil");
  }

  // Show the user position on the map
  async function map(lat, long) {

    // Making map and tiles
    const mymap = L.map('js-map').setView([lat, long], 14);

    const attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const tiles = L.tileLayer(tileUrl, {
      attribution
    });
    tiles.addTo(mymap);

    const neuIcon = new L.Icon({
      iconUrl: 'img/leaf-orange.png',
      shadowUrl: 'img/leaf-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Marker creation
    L.marker([lat, long],{icon: neuIcon}).addTo(mymap).bindPopup("Ma position");
  }


  // This function make an Ajax request to nominatim with geographic coordinates and return JSON data who contains the name of the City, postcode and the function getDptByLocation is call with this two parameters
  async function getGeoCityName(lat, long) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`, true);

    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        var resp = this.response;
        var resp = JSON.parse(resp);
        console.log(resp);
        if (resp.address.village) {
          cityName = resp.address.village.toUpperCase();
        } else if (resp.address.town) {
          cityName = resp.address.town.toUpperCase();
        } else {
          cityName = resp.address.city.toUpperCase();
        }
        console.log(cityName);
        var codePostal = resp.address.postcode;
        console.log(codePostal.substring(0, 2));
        document.getElementById("cityname").innerHTML = cityName;
        getDptByLocation(codePostal, cityName);
      } else {
        console.log("Erreur du serveur");
      }
    };

    request.onerror = function () {
      console.log("Erreur réseau");
    };

    request.send();
  }


  // This function make an Ajax request to à JSON file in local for extract the INSEE and OSM code, if success the function getBanData() is called with INSEE code in parameter
  function getDptByLocation(codePostal, cityName) {
    codePostal = codePostal.substring(0, 2);
    const requestDpt = new XMLHttpRequest();

    // The postcode is required to call the JSON file who contains the INSEE code of each city
    requestDpt.open('GET', `../data/OSM-communes-codeInseeOsm.json-${codePostal}.json`, true);

    requestDpt.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        var resp = this.response;
        resp = JSON.parse(resp);
        var tabCommunes = Object.keys(resp.communes);
        const codeINSEE = resp.communes[cityName][0];
        codeOSM = resp.communes[cityName][1];
        console.log(codeINSEE);
        console.log(codeOSM);
        
        getBanData(codeINSEE);
        $("#results").html('<div class="load-data"><h3>Collecte des données en cours...</h3></div>');
        $("#results").append('<table class="table-results"><tr><th>Type</th><th>Nom du lieu</th><th>Nom de personne potentiel</th><th>Coordonnées</th><th>Nom trouvé sur Wikidata</th><th>Genre</th><th>Nom à trouver sur Wikidata</th></tr></table>');
      } else {
        console.log("Erreur du serveur");
      }
    }
    requestDpt.onerror = function () {
      console.log("Erreur réseau");
    }
    requestDpt.send();
  }


  // This function make Ajax request to BAN of the department of location and call analyseBanData() function who convert the csv file to JSON data to be readable by the browser
  function getBanData(codeINSEE) {

    const insert = "";
    if (codeINSEE + "".length == 4) {
      insert = "0";
    }

    $.get("../data/BAN" + insert + codeINSEE.toString().substring(0, 2) + ".csv")
      .done(analyzeBanData)
      .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
      });


    function analyzeBanData(data) {
      var csv = Papa.parse(data).data;
      console.log(csv);
      var i = 0;
      var codeCommune = codeINSEE;
      for (element in Object.keys(csv)) {
        if (i > 0) {
          if (csv[i].length > 1) {
            if (csv[i][3] == codeCommune) {
              addTableRow("voie", csv[i][2], csv[i][4] + " " + csv[i][5], "address");
            }
          }
        }
        i++;
      }
    }

    themes = ["sports", "education", "library"];
    themeLabels = {
      "sports": "équipement sportif",
      "education": "lieu d’enseignement",
      "library": "bibliothèque"
    }
    themeNumber = 0;
    sendGeodatamineQuery();

  }

  function analyzeCoord(str) {
    var result = "";
    var patternStart = ["POLYGON ((", "POINT ("];
    var patternStop = [",", ")"];
    var i = 0
    var patternFound = false;
    patternStart.forEach(function (p) {
      if (str.slice(0, p.length) == p) {
        var posStop = str.search(patternStop[i]);
        result = str.slice(p.length, posStop);
        i++;
        patternFound++;
      }
    })
    if (!patternFound) {
      result = str;
    }
    return result;
  }

  
})