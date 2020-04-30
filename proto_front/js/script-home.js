  'use strict';
  document.getElementById("container-map").style.display = "none";

  locationConsent();

  function locationConsent(){
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
  map(lat,long);
  }

  function errorFunction(){
  console.log("La localisation n'est pas activée sur votre appareil");
  }

  async function map(lat,long){

    // Making map and tiles
    const mymap = L.map('js-map').setView([lat, long], 15);
  
    const attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
  
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  
    const tiles = L.tileLayer(tileUrl, {attribution});
    tiles.addTo(mymap);
  
    // Création du marker
   L.marker([ lat , long ]).addTo(mymap);
  }