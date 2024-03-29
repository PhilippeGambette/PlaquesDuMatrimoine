'use strict';
var cityList = [];
var cityName;
var codeINSEE;
var codeOSM;
var communes;
var element;
var foundNames = [];
var foundNamesRemaining = [];
var foundNamesRemainingIds = [];
var source = "local";
var map;
var previousQuery = "";
var nameNb;
var str2;
var themeLabels;
var themeNumber;
var themes;
var zoomOk = false;

const FEMICON = new L.Icon({
  iconUrl: 'img/LogoFemme_nt.png',
  iconSize: [41, 29],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const HOMICON = new L.Icon({
  iconUrl: 'img/LogoHomme_nt.png',
  iconSize: [41, 29],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

$(document).on('click','#toggle-men',function(){
  if($(this).hasClass('change-opacity')){
     $('.icHom').show();
     $('#eye').removeClass('fas fa-eye-slash');
     $('#toggle-men').removeClass('change-opacity');
  } else {
     $('.icHom').hide();
     $('#eye').addClass('fas fa-eye-slash');
     $('#toggle-men').addClass('change-opacity');  
  }
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
   if (analyzedName.slice(0,4) == "aux " || analyzedName.slice(0, 3) == "de " || analyzedName.slice(0, 3) == "du " || analyzedName.slice(0, 4) == "des " || analyzedName.slice(0, 2) == "d'" || analyzedName.slice(0, 2) == "d’") {
     analyzedName = "";
   }
   if (analyzedName != "") {
     var lineNb = foundNames.length;
     if (!(foundNames.includes(analyzedName))) {
       foundNames[lineNb] = analyzedName;
     } else {
       lineNb = foundNames.indexOf(analyzedName);
     }

    
     var foundName = `<tr class="border_bottom js_count-street foundName` + lineNb + `">
     <td>` + topic + `</td>
     <td class="placeName" data-coord=`+coordinates.split(" ")+ `> <a class="change" title="Suggérer une modification" href="change.php?cityname=`+cityName+`&nom=`+name+`&topic=`+topic+`&codeINSEE=`+codeINSEE+`" target="_blank" > <i class="fas fa-user-edit contribute"></i> </a>` + name +  ` </td>
     <td>` + analyzedName +  
    `</tr>`;

    $("table").append(foundName);
  }else{

     var notFound = `<tr class="border_bottom js_count-street">
     <td>` + topic + `</td>
     <td data-coord=`+coordinates.split(" ")+`> <a class="change" title="Suggérer une modification" href="change.php?cityname=`+cityName+`&nom=`+name+`&topic=`+topic+`&codeINSEE=`+codeINSEE+`" target="_blank"> <i class="fas fa-user-edit contribute"></i> </a>` + name + `
     </td>
     <td>` + analyzedName + `</td>`;
     $("table").append(notFound);
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
   i++;
 }
 themeNumber++;
 if (themeNumber < themes.length) {
   setTimeout(sendGeodatamineQuery);
 } else {
   nameNb = 0;
   previousQuery = "name";
   source = "local";
   checkresultInLocal();
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
 var patternStart = ["MULTIPOLYGON (((","POLYGON ((", "POINT ("];
 var patternStop = [",",",", ")"];
 var i = 0;
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
 //  Cut a string that contains one of these sub-string
 var allPrefixes = {
   "sports": ["Boule lyonnaise ", "Boulodrome ", "Boulodrome couvert ", "Centre nautique ", "Centre Sportif ", "City Stade ", "Complexe ", "Complexe sportif ", "Dojo ", "École De Danse ", "Espace ", "Halle ", "Halle des sports ", "Halle sportive ", "Gymnase ", "Gymnase scolaire ", "Jeu de boules ", "Le centre ", "Mini Football ", "Palais des Sports ", "Piscine ", "Piscine municipale ", "Piste d'athlétisme ", "Piste d'athletisme ", "Plateau Sportif ", "Plateaux sportifs ", "Salle ", "Salle de boxe ", "Salle de sport ", "Salle de sports ", "Salle omnisports ", "Skate-Park ", "Square ", "Stade ", "Stade municipal ", "Tennis Club ", "Tennis Club municipal ", "Terrain ", "Terrain de football ", "Terrain de proximité ", "Vélodrome ", ".*Vélodrome "],
   "education": ["Crèche( Municipale| PMI| public| privé)* ", "Collège( | public| privé)* ", "École ([ÉE]l[eé]mentaire|maternelle|primaire|technique|technologique)*( |Centre |d'application )*(privée|publique)*[ ]*", "Espace ", "Groupe scolaire ", "Institut ", "Institution ", "Lycée( | général| général et technologique| polyvalent| professionnel| professionnel| technologique| [Tt]echnique)*( | et technologique)*( | public| privé|.*restauration)* ", "PMI "],
   "library": ["Biblioth[èe]que( | centrale| communale| départementale| municipale| universitaire)* ", "M[ée]diath[èe]que( | centrale| communale| départementale| municipale)* "],
   "address": ["All[ée]e ", "Avenue ", "Boulevard ", "Chemin ", "Cours ", "Galerie ", "Impasse ", "Jardin ", "Mail " , "Passage " , "Place ", "Quai ", "R[ée]sidence ", "Rue ","Ruelle ", "Sente ", "Sentier ", "Square ", "Villa "]
 };
 var prefixes;
 if (type == "address") {
   prefixes = allPrefixes["address"];
 } else {
   prefixes = allPrefixes[themes[themeNumber]];
 }
 var i = 0;
 while (i < prefixes.length) {
   var tryRegexp = str.replace(new RegExp("^" + prefixes[i], "ig"), "");
   if (tryRegexp.length < str.length) {
     result = tryRegexp;
   }
   i++;
 }
 return result;
}

// Querying the local database to found potential name
function checkresultInLocal(){
 var nom = foundNames[nameNb];
 if(source=="local"){
 $.getJSON('api.php?action=read&nom_potentiel='+nom+'').done(function(data){
  if(data.length >= 1){
    console.log(true);
    wikidataNameResults(data);
  }else{
    // Person is not in the database
    foundNamesRemaining.push(nom);
    foundNamesRemainingIds[foundNamesRemaining.length-1] = nameNb;
    nameNb++;
    previousQuery = "name";
    //  setTimeout(getNextWikidata, 1000);
    if (nameNb < foundNames.length) {
       checkresultInLocal();
    } else {
       console.log(foundNamesRemaining);
       nameNb = 0;
       source = "wikidata"
       checkresultInLocal();
    }
    //console.log(false);
    //setTimeout(getNextWikidata, 1000);
  }
 });
 } else {
    setTimeout(getNextWikidata, 1000);
 }
}

function wikidataError(){
 console.error('Erreur de requête');
 nameNb++;
 previousQuery = "name";
 setTimeout(getNextWikidata, 1000);
}

function getNextWikidata() {
 if (nameNb < foundNamesRemaining.length) {
   var nom = foundNamesRemaining[nameNb];
   
   // Querying the Wikidata database with a SPARQL query and call makeSPARQLQuery function() who has wikadataNameResults as callback function
   var endpointUrl = 'https://query.wikidata.org/sparql',
   sparqlQuery = 'SELECT ?person ?personLabel ?genderLabel ?personDescription ?sitelink ?lemma (MIN(?pic) AS ?p) WHERE {\n' +
      '  ?person rdfs:label \"' + nom + '" @fr.\n' +
      '  ?person wdt:P31 wd:Q5.\n' +
      '  ?person wdt:P21 ?gender.\n' +
      '  OPTIONAL { ?person wdt:P18 ?pic.}\n' +
      '  ?sitelink schema:about ?person;\n' +
      '    schema:isPartOf <https://fr.wikipedia.org/>;\n' +
      '    schema:name ?lemma.\n' +
      '  SERVICE wikibase:label {bd:serviceParam wikibase:language \"fr,en\"}\n' +
      '  }\n' +
      'GROUP BY ?person ?personLabel ?genderLabel ?personDescription ?sitelink ?lemma';

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
 return $.ajax(endpointUrl, settings).done(doneCallback).fail(wikidataError);
}


function wikidataNameResults(data) {
 var person ;
 if(source == "local"){
    //console.log("Local source !!!");
    person = foundNames[nameNb];
 } else {
    //console.log("Source from Wikidata!!!");
    person = foundNamesRemaining[nameNb]
 }
 if(data.length != undefined|| data.results.bindings.length > 0){
   if(data.length != undefined && data[0].nom_potentiel != undefined){
     //  Results already saved in database
     var description = data[0].personDescription;
     var genderLabel = data[0].genderLabel;
     var wikipediaLink = data[0].sitelink;
     var picture = data[0].picture;
     console.log(description);
     console.log(genderLabel);
     //console.log(wikipediaLink);
     //console.log(picture);

    }else if (data.results.bindings.length > 0) {
      // Results from Wikidata
     var person ;
     if(source == "local"){
        person = foundNames[nameNb];
     } else {
        person = foundNamesRemaining[nameNb]
     }
     //console.log(person);
     var originalPerson = person;
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

     var picture ="";
     if (data.results.bindings[0].p != undefined){
       picture = data.results.bindings[0].p.value;
     }

     var wikipediaLink = data.results.bindings[0].sitelink.value;
     var wikidataLink = data.results.bindings[0].person.value;
     var idWikidata = wikidataLink.split("/")[4];
     
     //  The results from Wikidata are saved in the database
     var adresse = 'api.php?action=write&id_wikidata='+idWikidata+'&alias='+person+'&genderLabel='+genderLabel+'&personDescription='+description+'&sitelink='+wikipediaLink+'&nom_complet='+person+'&lemma='+person+'&nom_potentiel='+originalPerson+'&picture='+picture+'';
     //console.log(adresse);
     $.get(adresse).done(function(data){
       console.log(data);
     }).fail(
       console.error('Échec de la sauvegarde dans la base de données.')
     );
    }
    

    // For each result, add new columns with wikipedia link, description and gender label
    var selector = '.foundName' + nameNb;
    if(source == "wikidata"){
       selector = '.foundName' + foundNamesRemainingIds[nameNb];
     }
     $(selector).each(function () {
       $(this).append('<td><a target="_blank" class="'+genderLabel+'" href="' + wikipediaLink + '">' + person + description + '</a></td><td>' + genderLabel + '</td>');  
       var coordinates = $(this).find("td").eq(1).attr('data-coord').replace(","," ");
       if (genderLabel == "féminin" || genderLabel == "femme transgenre") {
         if (!zoomOk) {
           map.setView([coordinates.split(" ")[1], coordinates.split(" ")[0]], 11);
           zoomOk = true;
           console.log("Zoom sur :"+coordinates);
          }
          // Add marker for each women
          L.marker([coordinates.split(" ")[1], coordinates.split(" ")[0]],{icon: FEMICON}).addTo(map).bindPopup($(this).find(".placeName").html() + ' :<br><a target="_blank" href="' + wikipediaLink + '">' + person + description + "</a>");
          $('.leaflet-marker-icon').last().addClass('icFem');
        }else{
          // Add marker for each men
          L.marker([coordinates.split(" ")[1], coordinates.split(" ")[0]],{icon: HOMICON}).addTo(map).bindPopup($(this).find(".placeName").html() + ' :<br><a target="_blank" href="' + wikipediaLink + '">' + person + description + "</a>");
          $('.leaflet-marker-icon').last().addClass('icHom');       
        }
      });
      // Look for the next name on Wikidata
      nameNb++;
      previousQuery = "name";
      //  setTimeout(getNextWikidata, 1000);
      checkresultInLocal();
      
    }
    
    else {
      
    if (previousQuery == "name") {
      // Look again as an alias
     previousQuery = "alias";
     setTimeout(getNextWikidataAlias, 1000);
    } else {
      // Alias not found, look for the next name on Wikidata
     
     console.log(person);
     if (person != undefined){
       console.log(person);
       var gender = guessGender(person);
       if(gender == "masculin" || gender == "féminin"){
        var selector = '.foundName' + nameNb;
        if(source == "wikidata"){
           selector = '.foundName' + foundNamesRemainingIds[nameNb];
         }
         $( selector ).each(function(){
           $(this).append('<td>'+person+'</td><td class='+gender+'>'+gender+'</td><td></td>');
           var coordinates = $(this).find("td").eq(1).attr('data-coord').replace(","," ");
           if(gender == "féminin" || gender == "femme transgenre"){
             if(!zoomOk){
               map.setView([coordinates.split(" ")[1],coordinates.split(" ")[0]], 11);
               zoomOk = true;
              }
              // Add marker for each women
              L.marker([coordinates.split(" ")[1],coordinates.split(" ")[0]],{icon: FEMICON}).addTo(map).bindPopup($(this).find(".placeName").html()+' :<br>'+person);
              $('.leaflet-marker-icon').last().addClass('icFem');
            }else{
              // Add marker for each men
               L.marker([coordinates.split(" ")[1],coordinates.split(" ")[0]],{icon: HOMICON}).addTo(map).bindPopup($(this).find(".placeName").html()+' :<br>'+person);
               $('.leaflet-marker-icon').last().addClass('icHom');
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

  // If the name is not in Wikidata database, the script will parse the first name to guess the gender of people
  function guessGender(name){
    var gender = "";
    var guessedFirstName = "";
    // Look for female first names:
    var i = 0;
    while(i<femaleFirstNames.length){
      var tryRegexp = name.replace(new RegExp("^"+femaleFirstNames[i]+" ", "ig"), "");
      if(tryRegexp.length < name.length){
        guessedFirstName = femaleFirstNames[i];
        gender = "féminin";
      }
      i++;
    }
    // Look for male first names:	   
    var i = 0;
    while(i<maleFirstNames.length){
      var tryRegexp = name.replace(new RegExp("^"+maleFirstNames[i]+" ", "ig"), "");
      if(tryRegexp.length < name.length){
        guessedFirstName = maleFirstNames[i];
        gender = "masculin";
      }
      i++;
    }
    if(gender != ""){
      // Confirm if we indeed found a first name (it should be followed by a whitespace and an uppercase letter or a lowercase d)
      var tryRegexp = name.replace(new RegExp("^"+guessedFirstName+" [A-Zd]", "g"), ""); 
      if(tryRegexp.length == name.length){
        gender = "";
      }
    }
    console.log(gender);
    return gender;
 }


 function normalizeName(name){
  console.log(name);
  if(name != undefined){
  var i = 0;
  while(i<specialNames.length){
    var tryRegexp = name.replace(new RegExp("^"+specialNames[i].substring(3), "ig"), "");
    if(tryRegexp.length < name.length){
      name = tryRegexp;
    }
    i++;
  }
  name = name.replace(/-/gi," ").replace(/ la /gi," La ").replace(/ le /gi," Le ").replace(/ \(.*\)/gi,"");
  console.log("Nom normalisé à chercher : "+name);
  return name;
  } else {
  return undefined;
  }
}

function getNextWikidataAlias() {
 if (nameNb < foundNamesRemaining.length) {
   var nom = foundNamesRemaining[nameNb];
   var endpointUrl = 'https://query.wikidata.org/sparql',
    sparqlQuery = 'SELECT ?person ?personLabel ?genderLabel ?personDescription ?sitelink ?lemma (MIN(?pic) AS ?p) WHERE {\n' +
    '  {?person rdfs:label "'+normalizeName(nom)+'"@fr} UNION {?person skos:altLabel "'+normalizeName(nom)+'"@fr} UNION {?person skos:altLabel "'+normalizeName(nom)+'"@en}.\n'+
    '  ?person wdt:P31 wd:Q5.\n' +
    '  ?person wdt:P21 ?gender.\n' +
    '  OPTIONAL { ?person wdt:P18 ?pic.}\n' +
    '  ?sitelink schema:about ?person;\n' +
    '    schema:isPartOf <https://fr.wikipedia.org/>;\n' +
    '    schema:name ?lemma.\n' +
    '  SERVICE wikibase:label {bd:serviceParam wikibase:language \"fr,en\"}\n' +
    '  }\n' +
    'GROUP BY ?person ?personLabel ?genderLabel ?personDescription ?sitelink ?lemma';
   makeSPARQLQuery(endpointUrl, sparqlQuery, wikidataNameResults);
 }
}

// This function will show the results
function plotlyGraph() {
  $('#js-load-data').hide();
  $('.stats-title').show();
  $('.js-pluriel').hide();
  $('#phraseResult').show();
  $('.svg-container').show();
  // Count the number of lines with a "female" or "male" class
  var nombreHommes = $('.masculin').length;
  var nombreFemmes = $('.féminin').length;
  var nbLieux = $('.js_count-street').length;
  var nombreNd = (nbLieux - (nombreHommes+nombreFemmes));
  console.log(nbLieux);

  var txHom = (nombreHommes/nbLieux)*100;
  var txFem = (nombreFemmes/nbLieux)*100;
  var txNd = (nombreNd/nbLieux)*100;

  window.scrollTo(0,$('#js-map')[0].offsetTop);

  
  $('#phraseResult').show();
  
  if(nombreFemmes > 1){
    $('.js-pluriel').show();
    $('.js-nbFemmes').html(nombreFemmes);
  }else if(nombreFemmes == 1){
    $('.js-nbFemmes').html(nombreFemmes);
  }else{
    $('.js-nbFemmes').html("Aucune");
  }

  $('#js-nbLieux').html((nbLieux).toString());

  var data = [{
    values: [txHom, txFem, txNd],
    labels: ['Homme', 'Femme','Aucun nom de personne identifié'],
    type: 'pie',
    marker:{
      colors: ['#f1c232ff','#ea5b3aff','#cccccc']
    }
  }];

  if(!cityName){
    cityName = $("#inputCity").val();
  }

  var layout = {
    title: {
      text: `<b>Répartition femmes/hommes <br>pour les noms de lieux de <br>` + cityName+`</b>`,
      font: {
        family: 'Belleza, Arial, San Francisco',
        size: 15
      },
    }
  }

  var config = {
    responsive: true,
    showLink: true,
    linkText: 'Plaques du Matrimoine',
    plotlyServerURL: 'https://matrimoine.alanakra.fr'
  }

  Plotly.newPlot('js-graph', data, layout, config, {displayModeBar: false, displaylogo: false});
}