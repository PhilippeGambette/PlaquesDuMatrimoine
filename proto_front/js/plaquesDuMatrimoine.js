  'use strict';
  var communes;
  var map;
  var previousQuery = "";
  var themes;
  var themeNumber;
  var themeLabels;
  var foundNames = [];
  var inputCity;
  var codeOSM;
  var zoomOk = false;
  var cityName;
  var str2;
  var nameNb;
  var element;
  var cityList = [];
  
  if(localStorage.getItem('cityList')){
    console.log(true);
    console.log(localStorage.getItem('cityList'))
    console.log(typeof(localStorage.getItem('cityList')));
  }else{
    console.log(false);
  }
  
  const FEMICON = new L.Icon({
    iconUrl: 'img/leaf-red.png',
    shadowUrl: 'img/leaf-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const HOMICON = new L.Icon({
    iconUrl: 'img/leaf-green.png',
    shadowUrl: 'img/leaf-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Show the user position on the map
  function makeMap(lat, long) {

    // Making map and tiles
    map = L.map('js-map').setView([lat, long], 14);

    const attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const tiles = L.tileLayer(tileUrl, {
      attribution
    });
    tiles.addTo(map);

    const neuIcon = new L.Icon({
      iconUrl: 'img/leaf-orange.png',
      shadowUrl: 'img/leaf-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Marker creation
    L.marker([lat, long], {
      icon: neuIcon
    }).addTo(map).bindPopup("Ma position");
  }
  

 function addTableRow(topic, name, coord, topicCode) {
   if (name != "") {
     var coordinates = analyzeCoord(coord);
     var analyzedName = analyzeName(name, topicCode);
     if (analyzedName.slice(0, 3) == "de " || analyzedName.slice(0, 3) == "du " || analyzedName.slice(0, 4) == "des " || analyzedName.slice(0, 2) == "d'" || analyzedName.slice(0, 2) == "d’") {
       analyzedName = "";
     }
     if (analyzedName != "") {
       var lineNb = foundNames.length;
       if (!(foundNames.includes(analyzedName))) {
         foundNames[lineNb] = analyzedName;
       } else {
         lineNb = foundNames.indexOf(analyzedName);
       }

       $("table").append('<tr class="border_bottom count-street foundName' + lineNb + '"><td>' + topic + '</td><td class="placeName" data-coord='+coordinates.split(" ")+'>' + name + '</td><td>' + analyzedName + '</td><td class="coord">' + coordinates + "</td></tr>");
     } else {
       $("table").append('<tr class="border_bottom count-street"><td>' + topic + '</td><td data-coord='+coordinates.split(" ")+'>' + name + '</td><td>' + analyzedName + "</td><td>" + coordinates + "</td></tr>");
     }
   }
 }

 function analyzeGeoData(data) {
   // For each topic, store where to find the following information: name / latitude / longitude
   var findData = {
     "sports": [3, 0, -1],
     "education": [2, 0, -1],
     "library": [3, 0, -1]
   };
   var csv = Papa.parse(data);
   //console.log(csv)
   var i = 0;
   for (element in Object.keys(csv.data)) {
     if (i > 0) {
       if (csv.data[i].length > 1) {
         var name = csv.data[i][findData[themes[themeNumber]][0]];
         var coord = csv.data[i][findData[themes[themeNumber]][1]];
         if (findData[themes[themeNumber]][2] > -1) {
           //console.log(findData[themes[themeNumber]][2])
           // if longitude is already included in latitude do nothing
           coord += "," + csvData[findData[themes[themeNumber]][2]];
         }
         addTableRow(themeLabels[themes[themeNumber]], name, coord, themes[themeNumber])
       }
     }
     i++
   }
   themeNumber++;
   if (themeNumber < themes.length) {
     setTimeout(sendGeodatamineQuery);
   } else {
     nameNb = 0;
     previousQuery = "name"
     getNextWikidata();
   }
 }

 // Function returning thematics data from OpenStreetMap with queries sent to Geodatamine and call analyseGeoData()
 function sendGeodatamineQuery() {

  if($("#inputCity").length != 0){
    codeOSM = (communes[$("#inputCity").val()][1]).toString();
  }
  
  console.log("https://geodatamine.fr/data/" + themes[themeNumber] + "/" + codeOSM);
  $.get("https://geodatamine.fr/data/" + themes[themeNumber] + "/" + codeOSM) 
    .done(analyzeGeoData)
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
    });
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

 function analyzeName(str, type) {
   var result = "";
   str2 = str.toLowerCase();
   var allPrefixes = {
     "sports": ["Boule lyonnaise ", "Boulodrome ", "Boulodrome couvert ", "Centre nautique ", "Centre Sportif ", "City Stade ", "Complexe ", "Complexe sportif ", "Dojo ", "École De Danse ", "Espace ", "Halle ", "Halle sportive ", "Gymnase ", "Gymnase scolaire ", "Jeu de boules ", "Le centre ", "Mini Football ", "Palais des Sports ", "Piscine ", "Piscine municipale ", "Piste d'athlétisme ", "Piste d'athletisme ", "Plateau Sportif ", "Plateaux sportifs ", "Salle ", "Salle de boxe ", "Salle de sport ", "Salle de sports ", "Salle omnisports ", "Skate-Park ", "Square ", "Stade ", "Stade municipal ", "Tennis Club ", "Tennis Club municipal ", "Terrain ", "Terrain de football ", "Terrain de proximité ", "Vélodrome ", ".*Vélodrome "],
     "education": ["Crèche Municipale", "Collège( | public| privé)* ", "École ([ÉE]l[eé]mentaire|maternelle|primaire|technique|technologique)*( |d'application )*(privée|publique)*[ ]*", "Espace ", "Groupe scolaire ", "Institut ", "Institution ", "Lycée( | général| général et technologique| polyvalent| professionnel| professionnel| technologique| [Tt]echnique)*( | et technologique)*( | public| privé|.*restauration)* "],
     "library": ["Biblioth[èe]que( | centrale| communale| départementale| municipale)* ", "M[ée]diath[èe]que( | centrale| communale| départementale| municipale)* "],
     "address": ["All[ée]e ", "Avenue ", "Boulevard ", "Chemin ", "Cours ", "Impasse ", "Place ", "Rue ", "Sente ", "Sentier ", "Square "]
   };
   var prefixes;
   if (type == "address") {
     prefixes = allPrefixes["address"];
   } else {
     prefixes = allPrefixes[themes[themeNumber]];
   }
   var i = 0;
   while (i < prefixes.length) {
     var tryRegexp = str.replace(new RegExp("^" + prefixes[i], "ig"), "")
     if (tryRegexp.length < str.length) {
       result = tryRegexp;
     }
     i++;
   }
   return result;
 }

 function getNextWikidata() {
   if (nameNb < foundNames.length) {
     var nom = foundNames[nameNb];
     
     // Querying the Wikidata database with a SPARQL query and call makeSPARQLQuery function() who has wikadataNameResults as callback function
     var endpointUrl = 'https://query.wikidata.org/sparql',
     sparqlQuery = 'SELECT ?person ?personLabel ?genderLabel ?personDescription ?sitelink ?lemma WHERE {\n' +
     '  {?person rdfs:label "' + nom + '" @fr} UNION {?person skos:altLabel "' + nom + '" @fr} UNION {?person skos:altLabel \"' + nom + '" @en}.\n' +
     '  ?person wdt:P31 wd:Q5.\n' +
     '  ?person wdt:P21 ?gender.\n' +
     '  ?sitelink schema:about ?person;\n' +
     '    schema:isPartOf <https://fr.wikipedia.org/>;\n' +
     '    schema:name ?lemma.\n' +
     '  SERVICE wikibase:label {bd:serviceParam wikibase:language \"fr,en\"}\n' +
     '  } order by desc(?sitelink)';

     makeSPARQLQuery(endpointUrl, sparqlQuery, wikidataNameResults);
   }else{
     plotlyGraph();
   }
 }

 function makeSPARQLQuery(endpointUrl, sparqlQuery, doneCallback) {
   var settings = {
     headers: {
       Accept: 'application/sparql-results+json'
     },
     data: {
       query: sparqlQuery
     }
   };
   return $.ajax(endpointUrl, settings).then(doneCallback);
 }


 function wikidataNameResults(data) {
   if (data.results.bindings.length > 0) {
     var person = foundNames[nameNb];
     console.log(person);
     if (data.results.bindings[0].personLabel != undefined) {
       person = data.results.bindings[0].personLabel.value;
     }
     var description = ""
     if (data.results.bindings[0].personDescription != undefined) {
       description = " (" + data.results.bindings[0].personDescription.value + ")";
     }
     var genderLabel = "";
     if (data.results.bindings[0].genderLabel != undefined) {
       genderLabel = data.results.bindings[0].genderLabel.value;
     }
     // Try ES6 syntax
     $('.foundName' + nameNb).each(function () {
       $(this).append('<td><a target="_blank" class="'+genderLabel+'" href="' + data.results.bindings[0].sitelink.value + '">' + person + description + '</a></td><td>' + genderLabel + '</td><td></td>');
       if (genderLabel == "féminin" || genderLabel == "femme transgenre") {
         var coordinates = $(this).find(".coord").html();
        //  var coordinates =$(this).find("[data-coord]").html();
        if (!zoomOk) {
          map.setView([coordinates.split(" ")[1], coordinates.split(" ")[0]], 11);
          zoomOk = true;
          console.log("Zoom sur :"+coordinates);
        }
        L.marker([coordinates.split(" ")[1], coordinates.split(" ")[0]],{icon: FEMICON}).addTo(map).bindPopup($(this).find(".placeName").html() + ' :<br><a target="_blank" href="' + data.results.bindings[0].sitelink.value + '">' + person + description + "</a>");
        //  L.marker([coordinates.split(",")[1], coordinates.split(",")[0]],{icon: FEMICON}).addTo(map).bindPopup($(this).find(".placeName").html() + ' :<br><a target="_blank" href="' + data.results.bindings[0].sitelink.value + '">' + person + description + "</a>");
      }else{
        // For men
        var coordinates = $(this).find(".coord").html();
        //  var coordinates =$(this).find("[data-coord]").html();
          L.marker([coordinates.split(" ")[1], coordinates.split(" ")[0]],{icon: HOMICON}).addTo(map).bindPopup($(this).find(".placeName").html() + ' :<br><a target="_blank" href="' + data.results.bindings[0].sitelink.value + '">' + person + description + "</a>");
        //  L.marker([coordinates.split(",")[1], coordinates.split(",")[0]],{icon: HOMICON}).addTo(map).bindPopup($(this).find(".placeName").html() + ' :<br><a target="_blank" href="' + data.results.bindings[0].sitelink.value + '">' + person + description + "</a>");
        }
     });
     // Look for the next name on Wikidata
     nameNb++;
     previousQuery = "name";
     setTimeout(getNextWikidata, 1000);
    } else {
      if (previousQuery == "name") {
       // Look again as an alias
       previousQuery = "alias";
       setTimeout(getNextWikidataAlias, 1000);
      } else {
       // Alias not found, look for the next name on Wikidata
       
       if (person != undefined){
         console.log(person);
         var gender = guessGender(person);
         if(gender == "masculin" || gender == "féminin"){
           $( '.foundName'+nameNb ).each(function(){
             $(this).append('<td>'+person+'</td><td>'+gender+'</td><td></td>');
             if(gender == "féminin" || gender == "femme transgenre"){
               var coordinates = $(this).find(".coord").html();
              //  var coordinates = $(this).find("[data-coord]").html();
               if(!zoomOk){
                 map.setView([coordinates.split(" ")[1],coordinates.split(" ")[0]], 11);
                 zoomOk = true;
                 //console.log("Zoom sur :"+coordinates);
                }
                 L.marker([coordinates.split(" ")[1],coordinates.split(" ")[0]]).addTo(map).bindPopup($(this).find(".placeName").html()+' :<br>'+person);
                // L.marker([coordinates.split(",")[1],coordinates.split(",")[0]]).addTo(map).bindPopup($(this).find(".placeName").html()+' :<br>'+person);
              }
            });
            
          }
        }
        
        nameNb++;
        previousQuery = "name";
        setTimeout(getNextWikidata, 1000);
      }
    }
  }
  
  function guessGender(gender){
    $( '.foundName'+nameNb ).each(function(){
      $(this).append('<td>'+person+'</td><td>'+gender+'</td><td></td>');
      if(gender == "féminin" || gender == "femme transgenre"){
        // var coordinates = $(this).find(".coord").html();
        var coordinates =$(this).find("[data-coord]").html();
        if(!zoomOk){
          //  map.setView([coordinates.split(" ")[1],coordinates.split(" ")[0]], 11);
           map.setView([coordinates.split(",")[1],coordinates.split(",")[0]], 11);
           zoomOk = true;
           //console.log("Zoom sur :"+coordinates);
        }
        // L.marker([coordinates.split(" ")[1],coordinates.split(" ")[0]]).addTo(map).bindPopup($(this).find(".placeName").html()+' :<br>'+person);
        L.marker([coordinates.split(",")[1],coordinates.split(",")[0]]).addTo(map).bindPopup($(this).find(".placeName").html()+' :<br>'+person);
     }
   });
 }

 function getNextWikidataAlias() {
   if (nameNb < foundNames.length) {
     var nom = foundNames[nameNb];
     //console.log("Alias ?"+nom);
     // Retrieve some information from Wikidata:
     var endpointUrl = 'https://query.wikidata.org/sparql',
       sparqlQuery = 'SELECT ?person ?personLabel ?genderLabel ?personDescription ?sitelink ?lemma WHERE {\n' +
      '  {?person rdfs:label "' + nom.replace(/-/gi, " ").replace(/ la /gi, " La ").replace(/ le /gi, " Le ") + '" @fr} UNION {?person skos:altLabel "' + nom.replace(/-/gi, " ").replace(/ la /gi, " La ").replace(/ le /gi, " Le ") + '" @fr} UNION {?person skos:altLabel \"' + nom.replace(/-/gi, " ").replace(/ la /gi, " La ").replace(/ le /gi, " Le ") + '" @en}.\n' +
      '  ?person wdt:P31 wd:Q5.\n' +
      '  ?person wdt:P21 ?gender.\n' +
      '  ?sitelink schema:about ?person;\n' +
      '    schema:isPartOf <https://fr.wikipedia.org/>;\n' +
      '    schema:name ?lemma.\n' +
      '  SERVICE wikibase:label {bd:serviceParam wikibase:language \"fr,en\"}\n' +
      '  } order by desc(?sitelink)';
     makeSPARQLQuery(endpointUrl, sparqlQuery, wikidataNameResults);
   }
 }

  function plotlyGraph() {

  $('.load-data').hide();
  // Count the number of lines with a "female" or "male" class
  var nombreHommes = $('.masculin').length;
  var nombreFemmes = $('.féminin').length;
  var detectedName = $('.detected_name').length;
  var nombreNonIdentifie = detectedName - (nombreHommes+nombreFemmes);
  const nbLieux = $('.count-street').length;
  var nombreNd = (nbLieux - (nombreHommes+nombreFemmes));
  console.log(nbLieux);

  var txHom = (nombreHommes/nbLieux)*100;
  var txFem = (nombreFemmes/nbLieux)*100;
  var txNd = (nombreNd/nbLieux)*100;
  var txNi = (nombreNonIdentifie/nbLieux)*100;

  
  $('#phraseResult').show();
  
  if(nombreFemmes > 1){
    $('.pluriel').show();
    $('#nbFemmes').html(nombreFemmes);
  }else if(nombreFemmes == 1){
    $('#nbFemmes').html(nombreFemmes);
  }else{
    $('#nbFemmes').html("Aucune")
  }

  $('#nbLieux').html((nbLieux).toString());

  var data = [{
    values: [txHom, txFem, txNi, txNd],
    labels: ['Homme', 'Femme','Non identifié', 'Aucun nom de personne identifié'],
    type: 'pie'
  }];

  if(!cityName){
    cityName = $("#inputCity").val();
  }

  var layout = {
    height: 400,
    width: 600,
    title: {
      text: `Répartition hommes/femmes pour les noms de lieux de ${cityName}`,
      font: {
        family: 'Arial, San Francisco',
        size: 15
      },
    }
  }

  var config = {responsive: true}

  Plotly.newPlot('graph', data, layout, config, {displayModeBar: false, displaylogo: false});
}