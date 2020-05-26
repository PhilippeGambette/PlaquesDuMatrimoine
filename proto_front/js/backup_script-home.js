$(document).ready(function () {
  var cityName;
  var communes;
  var data;
  var foundNames = [];
  var map;
  var nameNb = 0;
  var previousQuery = "";
  var themeLabels;
  var themeNumber;
  var themes;
  var valueDpt;
  var zoomOk = false;

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

  $('.submit-home').hide();
  $('#inputCity').hide();
  $('.container-map').hide();
  $('#js-map').hide();
  $('#phraseResult').hide();
  $('.pluriel').hide();

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

  $('#inputDpt').autocomplete({
    source: liste
  });

  $('#inputCity').autocomplete({
    source: listeVilles
  });

  function getDpt() {
    $('#inputCity').show();
    valueDpt = $("#inputDpt").val().slice(0, 2);
    data = $.getJSON(`../data/OSM-communes-codeInseeOsm.json-${valueDpt}.json`, function (data) {
      // Crate an array
      listeVilles = Object.keys(data.communes);
      console.log(data);
      communes = data.communes;
      console.log(communes);
      $('#inputCity').off("autoComplete");
      $('#inputCity').autocomplete({
        source: listeVilles
      });
      $('inputCity').show();
    }).fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
    });
  }

  $("#inputDpt").on("autocompleteselect", function () {
    setTimeout(getDpt, 200);
  })

  function getCity() {
    $('.submit-home').show();
    $('.submit-home').css('cursor','pointer');
  }

  $("#inputCity").on("autocompleteselect", function () {
    setTimeout(getCity, 200);
  })

  $("#searchCity").on("click", function () {
    $('.container-map').show();
    window.location= '#phraseResult';
    zoomOk = false;
    var insert = "";
    console.log($("#inputCity").val());
    cityName = $("#inputCity").val();
    console.log(communes[$("#inputCity").val()]);
    //  Test
    console.log(communes[$("#inputCity").val()][0]);
    console.log(communes[$("#inputCity").val()][0] + "");
    console.log(communes[$("#inputCity").val()][1] + "");
    console.log((communes[$("#inputCity").val()][0] + "").length);
    console.log((communes[$("#inputCity").val()])[0]);

    if ((communes[$("#inputCity").val()])[0] + "".length == 4) {
      insert = "0";
    }
    $("#cityname-h").html($('#inputCity').val());
    $("#results").html("<p>Code INSEE : " + insert + communes[$("#inputCity").val()][0] + "</p>");
    $("#results").append("<p>Code OSM : " + communes[$("#inputCity").val()][1] + "</p>");
    $("#results").append('<table id="table-results"><tr><th>Type</th><th>Nom du lieu</th><th>Nom de personne potentiel</th><th>Coordonnées</th><th>Nom trouvé sur Wikidata</th><th>Genre</th><th>Nom à trouver sur Wikidata</th></tr></table>')

    // Show Leaflet map
    $("#js-map").show();
    if (map == undefined) {
      map = L.map('js-map').setView([48.8534, 2.3488], 5);
      L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
      }).addTo(map);
    }

    $.get("../data/BAN" + (insert + communes[$("#inputCity").val()][0]).slice(0, 2) + ".csv")
      .done(analyzeBanData)
      .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
      });

    themes = ["sports", "education", "library"];
    themeLabels = {
      "sports": "équipement sportif",
      "education": "lieu d’enseignement",
      "library": "bibliothèque"
    }
    themeNumber = 0;
    sendGeodatamineQuery();
  });

  function sendGeodatamineQuery() {
    $.get("https://geodatamine.fr/data/" + themes[themeNumber] + "/" + communes[$("#inputCity").val()][1])
      .done(analyzeGeoData)
      .fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
      });
  }


  function analyzeBanData(data) {
    // Parse of OSM data with Papa Parse library
    var csv = Papa.parse(data).data;
    console.log(csv);  
    var i = 0;
    var insert = "";
    if ((communes[$("#inputCity").val()][0] + "").length == 4) {
      insert = "0";
    }
    var codeCommune = insert + communes[$("#inputCity").val()][0];
    for (element in Object.keys(csv)) {
      if (i > 0) {
        if (csv[i].length > 1) {
          if (csv[i][3] == codeCommune) {
            //console.log(csv[i]);
            addTableRow("voie", csv[i][2], csv[i][4] + " " + csv[i][5], "address");
          }
        }
      }
      i++;
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

        $("table").append('<tr class="border_bottom count-street foundName' + lineNb + '"><td>' + topic + '</td><td class="placeName">' + name + '</td><td class="detected_name">' + analyzedName + '</td><td class="coord">' + coordinates + "</td></tr>");
      } else {
        $("table").append('<tr class="border_bottom count-street"><td>' + topic + "</td><td>" + name + '</td><td>' + analyzedName + "</td><td>" + coordinates + "</td></tr>");
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
      // Retrieve some information from Wikidata:
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
    // console.log(data.results.bindings.sitelink[0]);
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
        $(this).append('<td><a target="_blank" class="'+genderLabel+'" href="' + data.results.bindings[0].person.value + '">' + person + description + '</a></td><td>' + genderLabel + '</td><td></td>');
        console.log(data.results.bindings[0].person.value);
        if (genderLabel == "féminin" || genderLabel == "femme transgenre") {
          var coordinates = $(this).find(".coord").html();
          if (!zoomOk) {
            map.setView([coordinates.split(" ")[1], coordinates.split(" ")[0]], 11);
            zoomOk = true;
            //console.log("Zoom sur :"+coordinates);
          }
          L.marker([coordinates.split(" ")[1], coordinates.split(" ")[0]],{icon: FEMICON}).addTo(map).bindPopup($(this).find(".placeName").html() + ' :<br><a target="_blank" href="' + data.results.bindings[0].person.value + '">' + person + description + "</a>");
        }else{
          // For men
          var coordinates = $(this).find(".coord").html();
          L.marker([coordinates.split(" ")[1], coordinates.split(" ")[0]],{icon: HOMICON}).addTo(map).bindPopup($(this).find(".placeName").html() + ' :<br><a target="_blank" href="' + data.results.bindings[0].person.value + '">' + person + description + "</a>");
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
		            if(!zoomOk){
		               map.setView([coordinates.split(" ")[1],coordinates.split(" ")[0]], 11);
		               zoomOk = true;
		               //console.log("Zoom sur :"+coordinates);
		            }
		            L.marker([coordinates.split(" ")[1],coordinates.split(" ")[0]]).addTo(map).bindPopup($(this).find(".placeName").html()+' :<br>'+person);
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

  function guessGender(gender){
    $( '.foundName'+nameNb ).each(function(){
      $(this).append('<td>'+person+'</td><td>'+gender+'</td><td></td>');
      if(gender == "féminin" || gender == "femme transgenre"){
         var coordinates = $(this).find(".coord").html();
         if(!zoomOk){
            map.setView([coordinates.split(" ")[1],coordinates.split(" ")[0]], 11);
            zoomOk = true;
            //console.log("Zoom sur :"+coordinates);
         }
         L.marker([coordinates.split(" ")[1],coordinates.split(" ")[0]]).addTo(map).bindPopup($(this).find(".placeName").html()+' :<br>'+person);
      }
    });
  }


  function plotlyGraph() {
    var nombreHommes = $('.masculin').length;
    var nombreFemmes = $('.féminin').length;
    var detectedName = $('.detected_name').length;
    var nombreNonIdentifie = detectedName - (nombreHommes+nombreFemmes);
    const NBLIEUX = $('.count-street').length;
    var nombreNd = (NBLIEUX - (nombreHommes+nombreFemmes));
    console.log(NBLIEUX);

    var txHom = (nombreHommes/NBLIEUX)*100;
    var txFem = (nombreFemmes/NBLIEUX)*100;
    var txNd = (nombreNd/NBLIEUX)*100;
    var txNi = (nombreNonIdentifie/NBLIEUX)*100;

    
    $('#phraseResult').show();
    
    if(nombreFemmes > 1){
      $('.pluriel').show();
      $('#nbFemmes').html(nombreFemmes);
    }else if(nombreFemmes == 1){
      $('#nbFemmes').html(nombreFemmes);
    }else{
      $('#nbFemmes').html("Aucune")
    }

    $('#nblieux').html(NBLIEUX);

    var data = [{
      values: [txHom, txFem, txNi, txNd],
      labels: ['Homme', 'Femme','Non identifié', 'Aucun nom de personne identifié'],
      type: 'pie'
    }];

    var layout = {
      height: 400,
      width: 600,
      title: {
        text: `Répartition hommes/femmes pour ${cityName}`,
        font: {
          family: 'Arial, San Francisco',
          size: 15
        },
      }
    }

    let config = {
      responsive: true
    };

    Plotly.newPlot('graph', data, layout, config, {displayModeBar: false, displaylogo: false});
  }
})