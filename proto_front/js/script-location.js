$(document).ready(function () {
  'use strict';

  document.getElementById("container-map").style.display = "none";

  locationConsent();

  function locationConsent() {
    //Check if browser supports W3C Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    }
  }

  //Get latitude and longitude;
  function successFunction(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    document.getElementById("container-map").style.display = '';
    console.log(lat);
    console.log(long);
    map(lat, long);
    getGeoCityName(lat, long);
  }

  function errorFunction() {
    console.log("La localisation n'est pas activée sur votre appareil");
    // location.replace("geolocation-denial.php");
  }

  async function map(lat, long) {

    // Making map and tiles
    const mymap = L.map('js-map').setView([lat, long], 14);

    const attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const tiles = L.tileLayer(tileUrl, {
      attribution
    });
    tiles.addTo(mymap);

    // Création du marker
    L.marker([lat, long]).addTo(mymap);
  }


  async function getGeoCityName(lat, long) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`, true);

    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        var resp = this.response;
        var resp = JSON.parse(resp);
        console.log(resp);
        if(resp.address.village){
          var cityName = resp.address.village.toUpperCase();
          console.log(true);
        }else if(resp.address.town){
          var cityName = resp.address.town.toUpperCase();
        }else{
          var cityName = resp.address.city.toUpperCase();
        }
        console.log(cityName);
        var codePostal = resp.address.postcode;
        console.log(codePostal.substring(0, 2));
        document.getElementById("cityname").innerHTML = cityName;
        getDptByLocation(codePostal, cityName);
        plotlyGraph(cityName);
      } else {
        console.log("Erreur du serveur");
      }
    };

    request.onerror = function () {
      console.log("Erreur réseau");
    };

    request.send();
  }

  function getDptByLocation(codePostal,cityName) {
    codePostal = codePostal.substring(0, 2);
    const requestDpt = new XMLHttpRequest();
    // Le code postal est requis pour appeller le fichier JSON contenant le code INSEE de chaque commune
    requestDpt.open('GET', `../data/OSM-communes-codeInseeOsm.json-${codePostal}.json`, true);

    requestDpt.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        var resp = this.response;
        resp = JSON.parse(resp);
        console.log(resp.communes);
        var tabCommunes = Object.keys(resp.communes);
        console.log(tabCommunes);
        const codeINSEE = resp.communes[cityName][0];
        getBanData(codeINSEE);
      } else {
        console.log("Erreur du serveur");
      }
    }
    requestDpt.onerror = function () {
      console.log("Erreur réseau");
    }
    requestDpt.send();
  }

  function getBanData(codeINSEE){

    const insert = "";
    if(codeINSEE+"".length == 4){
      insert = "0";
    }

    $.get("../data/BAN"+insert+codeINSEE.toString().substring(0, 2)+".csv")
        .done(analyzeBanData)
        .fail(function (jqxhr, textStatus, error) {
          var err = textStatus + ", " + error;
          console.log("Request Failed: " + err);
        });
  

  function analyzeBanData(data) {
    // Parse of OSM data with Papa Parse library
    var csv = Papa.parse(data).data;
    console.log(csv);  
    var i = 0;
    var codeCommune = codeINSEE;
    for (element in Object.keys(csv)) {
      if (i > 0) {
        if (csv[i].length > 1) {
          if (csv[i][3] == codeCommune) {
            console.log(csv[i]);
            addTableRow("voie", csv[i][2], csv[i][4] + " " + csv[i][5], "address");
          }
        }
      }
      i++;
    }
  }

}

  function plotlyGraph(cityName) {
    var data = [{
      values: [19, 26, 55],
      labels: ['Homme', 'Femme', 'Non répertorié'],
      type: 'pie'
    }];

    var layout = {
      height: 400,
      width: 600,
      title: {
        text: `Répartition homme/femmes pour la ville de ${cityName}`,
        font: {
          family: 'Courier New, monospace',
          size: 24
        },
      }
    }

    let config = {
      responsive: true
    };

    Plotly.newPlot('graph', data, config);
  }
})