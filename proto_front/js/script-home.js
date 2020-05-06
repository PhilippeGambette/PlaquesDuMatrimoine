$(document).ready(function(){
  'use strict';
  var data;
  var communes;
  var themes;
  var themeLabels;
  var themeNumber;
  var foundNames = [];
  var nameNb = 0;
  var zoomOk = false;
  var map;
  var previousQuery = "";
  
  const listDpt = document.getElementById('listDpt');
  const listCity = document.getElementById('listCity');

        // Autocomplete departments
        var depts = ["Ain", "Aisne", "Allier", "Alpes-de-Haute-Provence", "Hautes-Alpes", "Alpes-Maritimes", "Ardèche", "Ardennes", "Ariège", "Aube", "Aude", "Aveyron", "Bouches-du-Rhône", "Calvados", "Cantal", "Charente", "Charente-Maritime", "Cher", "Corrèze", "Corse-du-Sud", "Haute-Corse", "Côte-d’Or", "Côtes-d'Armor", "Creuse", "Dordogne", "Doubs", "Drôme", "Eure", "Eure-et-Loir", "Finistère", "Gard", "Haute-Garonne", "Gers", "Gironde", "Hérault", "Ille-et-Vilaine", "Indre", "Indre-et-Loire", "Isère", "Jura", "Landes", "Loir-et-Cher", "Loire", "Haute-Loire", "Loire-Atlantique", "Loiret", "Lot", "Lot-et-Garonne", "Lozère", "Maine-et-Loire", "Manche", "Marne", "Haute-Marne", "Mayenne", "Meurthe-et-Moselle", "Meuse", "Morbihan", "Moselle", "Nièvre", "Nord", "Oise", "Orne", "Pas-de-Calais", "Puy-de-Dôme", "Pyrénées-Atlantiques", "Hautes-Pyrénées", "Pyrénées-Orientales", "Bas-Rhin", "Haut-Rhin", "Rhône", "Haute-Saône", "Saône-et-Loire", "Sarthe", "Savoie", "Haute-Savoie", "Paris", "Seine-Maritime", "Seine-et-Marne", "Yvelines", "Deux-Sèvres", "Somme", "Tarn", "Tarn-et-Garonne", "Var", "Vaucluse", "Vendée", "Vienne", "Haute-Vienne", "Vosges", "Yonne", "Territoire de Belfort", "Essonne", "Hauts-de-Seine", "Seine-Saint-Denis", "Val-de-Marne", "Val-d’Oise"];
        var num = ["01", "02", "03", "04", "05", "06", "07", "08", "09",
          "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
          "2A", "2B", "21", "22", "23", "24", "25", "26", "27", "28", "29",
          "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
          "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
          "50", "51", "52", "53", "54", "55", "56", "57", "58", "59",
          "60", "61", "62", "63", "64", "65", "66", "67", "68", "69",
          "70", "71", "72", "73", "74", "75", "76", "77", "78", "79",
          "80", "81", "82", "83", "84", "85", "86", "87", "88", "89",
          "90", "91", "92", "93", "94", "95"
        ];
        var i = 0;
        var liste = [];
        var listeVilles = [];
        while (i < num.length) {
          liste.push(num[i] + " " + depts[i]);
          i++;
        }

        liste.forEach(function(item){
          var option = document.createElement('option');
          option.value = item;
          listDpt.appendChild(option);
        })


        document.getElementById('inputCity').addEventListener('keydown',getCity);
        function getCity(){
          var postCode = $("#inputDpt").val().substring(0,2);
          var requestDpt = new XMLHttpRequest();
          requestDpt.open('GET', `http://localhost/data/OSM-communes-codeInseeOsm.json-${postCode}.json`, true);

          requestDpt.onload = function () {
            console.log(`chemin du fichier: http://localhost/data/OSM-communes-codeInseeOsm.json-${postCode}.json`);
            if (this.status >= 200 && this.status < 400) {
              var resp = this.response;
              resp = JSON.parse(resp);
              console.log(resp.communes);
              listeVilles = Object.keys(resp.communes);
              console.log(listeVilles);
              var listCity = document.getElementById('listCity');
              listeVilles.forEach(function(item){
                var option = document.createElement('option');
                option.value = item;
                listCity.appendChild(option);
              });
            } else {
              console.log("Erreur du serveur");
            }
          }
          requestDpt.onerror = function () {
            console.log("Erreur réseau");
          }
          requestDpt.send();
        }
        
      
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
      getGeoCityName(lat,long);
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
  
  
      async function getGeoCityName(lat,long){
        var request = new XMLHttpRequest();
        request.open('GET',`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`, true);
  
        request.onload = function () {
          if (this.status >= 200 && this.status < 400) {
            var resp = this.response;
            var resp = JSON.parse(resp);
            console.log(resp);
            var cityName = resp.address.village.toUpperCase();
            if(cityName === undefined){
              cityName = resp.address.town.toUpperCase();
            }
            console.log(cityName);
            var departement = resp.address.county;
            console.log(departement);
            var codePostal = resp.address.postcode;
            console.log(codePostal.substring(0,2));
            document.getElementById("cityname").innerHTML = cityName;
            getDptByLocation(codePostal,cityName);
          } else {
            console.log("Erreur du serveur");
          }
        };
  
        request.onerror = function () {
          console.log("Erreur réseau");
        };
  
        request.send();
  
      }
  
      function getDptByLocation(codePostal){
        codePostal = codePostal.substring(0,2);
        var requestDpt = new XMLHttpRequest();
        requestDpt.open('GET',`http://localhost/data/OSM-communes-codeInseeOsm.json-${codePostal}.json`,true);
  
        requestDpt.onload = function(){
          console.log(`chemin du fichier: http://localhost/data/OSM-communes-codeInseeOsm.json-${codePostal}.json`);
          if(this.status >= 200 && this.status < 400){
            var resp = this.response;
            resp = JSON.parse(resp);
            // console.log(resp.communes);
            var tabCommunes = Object.keys(resp.communes);
            // console.log(tabCommunes);
            // var listCity = document.getElementById('listCity');
            // tabCommunes.forEach(function(item){
            //   var option = document.createElement('option');
            //   option.value = item;
            //   listCity.appendChild(option);
            // });
          }else{
            console.log("Erreur du serveur");
          }
        } 
  
        requestDpt.onerror = function(){
          console.log("Erreur réseau");
        }
  
        requestDpt.send();
  
      }
    
      plotlyGraph();
    
      function plotlyGraph(){
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
  
        let config = {responsive: true};
        
        Plotly.newPlot('graph',data,layout,config);
      }
    })