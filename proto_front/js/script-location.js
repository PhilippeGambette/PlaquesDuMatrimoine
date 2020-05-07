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
    var request = new XMLHttpRequest();
    request.open('GET', `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`, true);

    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        var resp = this.response;
        var resp = JSON.parse(resp);
        console.log(resp);
        var cityName = resp.address.village.toUpperCase();
        if (cityName === undefined) {
          cityName = resp.address.town.toUpperCase();
        }
        console.log(cityName);
        var departement = resp.address.county;
        console.log(departement);
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

  function getDptByLocation(codePostal) {
    codePostal = codePostal.substring(0, 2);
    var requestDpt = new XMLHttpRequest();
    requestDpt.open('GET', `../data/OSM-communes-codeInseeOsm.json-${codePostal}.json`, true);

    requestDpt.onload = function () {
      console.log(`chemin du fichier: http://localhost/data/OSM-communes-codeInseeOsm.json-${codePostal}.json`);
      if (this.status >= 200 && this.status < 400) {
        var resp = this.response;
        resp = JSON.parse(resp);
        console.log(resp.communes);
        var tabCommunes = Object.keys(resp.communes);
        console.log(tabCommunes);
      } else {
        console.log("Erreur du serveur");
      }
    }

    requestDpt.onerror = function () {
      console.log("Erreur réseau");
    }

    requestDpt.send();

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

    Plotly.newPlot('graph', data, layout, config);
  }
})