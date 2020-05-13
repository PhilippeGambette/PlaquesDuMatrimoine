$(document).ready(function () {
  'use strict';
  var element;
  var str2;
  var foundNames = [];
  var codeOSM;
  var themes;
  var themeLabels;
  var themeNumber;
  var nameNb;
  var previousQuery;

  document.getElementById("container-map").style.display = "none";
  $("#results-local").hide();
  $(".proximite").hide();
  
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
    $("#results-local").show();
    $(".proximite").show();
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
        if (resp.address.village) {
          var cityName = resp.address.village.toUpperCase();
          console.log(true);
        } else if (resp.address.town) {
          var cityName = resp.address.town.toUpperCase();
        } else {
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

  function getDptByLocation(codePostal, cityName) {
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
        codeOSM = resp.communes[cityName][1];
        
        getBanData(codeINSEE);
        $("#results-local").append("<table><tr><th>Type</th><th>Nom du lieu</th><th>Nom de personne potentiel</th><th>Coordonnées</th><th>Nom trouvé sur Wikidata</th><th>Genre</th><th>Nom à trouver sur Wikidata</th></tr></table>")
      } else {
        console.log("Erreur du serveur");
      }
    }
    requestDpt.onerror = function () {
      console.log("Erreur réseau");
    }
    requestDpt.send();
  }

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
              console.log(csv[i]);
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

  function sendGeodatamineQuery() {
    $.get("https://geodatamine.fr/data/" + themes[themeNumber] + "/" + codeOSM)
      .done(analyzeGeoData)
      .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
      });
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

  function getNextWikidata() {
    if (nameNb < foundNames.length) {
      var nom = foundNames[nameNb];
      // Retrieve some information from Wikidata:
      var endpointUrl = 'https://query.wikidata.org/sparql',
        sparqlQuery = 'select ?person ?sitelinks ?genderLabel ?personDescription ?personLabel where {\n' +
        '  {?person rdfs:label "' + nom + '"@fr} UNION {?person skos:altLabel "' + nom + '"@fr} UNION {?person skos:altLabel "' + nom + '"@en}.\n' +
        '  ?person wdt:P31 wd:Q5.\n' +
        '  ?person wdt:P21 ?gender.\n' +
        '  ?person wikibase:sitelinks ?sitelinks.\n' +
        '  SERVICE wikibase:label {\n' +
        '     bd:serviceParam wikibase:language "fr" .\n' +
        '   }\n' +
        '} order by desc(?sitelinks)';

      makeSPARQLQuery(endpointUrl, sparqlQuery, wikidataNameResults);
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
          $(this).append('<td><a target="_blank" href="' + data.results.bindings[0].person.value + '">' + person + description + '</a></td><td>' + genderLabel + '</td><td></td>');
          if (genderLabel == "féminin" || genderLabel == "femme transgenre") {
            var coordinates = $(this).find(".coord").html();
            if (!zoomOk) {
              map.setView([coordinates.split(" ")[1], coordinates.split(" ")[0]], 11);
              zoomOk = true;
              //console.log("Zoom sur :"+coordinates);
            }
            L.marker([coordinates.split(" ")[1], coordinates.split(" ")[0]]).addTo(map).bindPopup($(this).find(".placeName").html() + ' :<br><a target="_blank" href="' + data.results.bindings[0].person.value + '">' + person + description + "</a>");
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
          nameNb++;
          previousQuery = "name";
          setTimeout(getNextWikidata, 1000);
        }
      }
    }

    function getNextWikidataAlias() {
      if (nameNb < foundNames.length) {
        var nom = foundNames[nameNb];
        //console.log("Alias ?"+nom);
        // Retrieve some information from Wikidata:
        var endpointUrl = 'https://query.wikidata.org/sparql',
          sparqlQuery = 'select ?person ?sitelinks ?genderLabel ?personDescription ?personLabel where {\n' +
          //'  ?person wdt:P742 "'+nom+'".\n'+
          '  {?person rdfs:label "' + nom.replace(/-/gi, " ").replace(/ la /gi, " La ").replace(/ le /gi, " Le ") + '"@fr} UNION {?person skos:altLabel "' + nom.replace(/-/gi, " ").replace(/ la /gi, " La ").replace(/ le /gi, " Le ") + '"@fr} UNION {?person skos:altLabel "' + nom.replace(/-/gi, " ").replace(/ la /gi, " La ").replace(/ le /gi, " Le ") + '"@en}.\n' +
          '  ?person wdt:P31 wd:Q5.\n' +
          '  ?person wdt:P21 ?gender.\n' +
          '  ?person wikibase:sitelinks ?sitelinks.\n' +
          '  SERVICE wikibase:label {\n' +
          '     bd:serviceParam wikibase:language "fr" .\n' +
          '   }\n' +
          '} order by desc(?sitelinks)';
        makeSPARQLQuery(endpointUrl, sparqlQuery, wikidataNameResults);
      }
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

        $("table").append('<tr class="border_bottom foundName' + lineNb + '"><td>' + topic + '</td><td class="placeName">' + name + "</td><td>" + analyzedName + '</td><td class="coord">' + coordinates + "</td></tr>");
      } else {
        $("table").append('<tr class="border_bottom"><td>' + topic + "</td><td>" + name + "</td><td>" + analyzedName + "</td><td>" + coordinates + "</td></tr>");
      }
    }
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