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
    console.log(lat);
    console.log(long);
    map(lat,long);
    getCity(lat,long);
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


    async function getCity(lat,long){
      var request = new XMLHttpRequest();
      request.open('GET',`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`, true);

      request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
          console.log("Success!");
          var resp = this.response;
          resp = JSON.stringify(resp);
          console.log(typeof(resp));
          console.log(resp);
        } else {
          console.log("Erreur du serveur");
        }
      };

      request.onerror = function () {
        console.log("Erreur réseau");
      };

      request.send();

    }
  
    testerDemo();
  
    function testerDemo(){
      var data = [{
        values: [19, 26, 55],
        labels: ['Homme', 'Femme', 'Non répertorié'],
        type: 'pie'
      }];

      var layout = {
        height: 400,
        width: 600,
        title: {
          text:'Répartition homme/femmes pour la ville',
          font: {
              family: 'Courier New, monospace',
              size: 24
            },
        }
      }
      
      Plotly.newPlot('graph',data,layout)
    }



    // var layout = {
    //   height: 250,
    //   width: 600,
    //   title: {
    //   text:'Répartition homme/femmes pour la ville',
    //   font: {
    //       family: 'Courier New, monospace',
    //       size: 24
    //     },
    // }