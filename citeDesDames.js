/*
    citeDesDames, a script of to locate the presence of women in the
    toponyms inside a town
    Copyright (C) 2020, Philippe Gambette

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
    
$(document).ready(function(){
  $(".ville").hide();
  $(".btn").hide();
  
  var data;
  var communes;
  var themes;
  var themeLabels;
  var themeNumber;
  var foundNames = [];
  var nameNb = 0;
  
  // Autocomplete departments
  var depts = ["Ain","Aisne","Allier","Alpes-de-Haute-Provence","Hautes-Alpes","Alpes-Maritimes","Ardèche","Ardennes","Ariège","Aube","Aude","Aveyron","Bouches-du-Rhône","Calvados","Cantal","Charente","Charente-Maritime","Cher","Corrèze","Corse-du-Sud","Haute-Corse","Côte-d’Or","Côtes-d'Armor","Creuse","Dordogne","Doubs","Drôme","Eure","Eure-et-Loir","Finistère","Gard","Haute-Garonne","Gers","Gironde","Hérault","Ille-et-Vilaine","Indre","Indre-et-Loire","Isère","Jura","Landes","Loir-et-Cher","Loire","Haute-Loire","Loire-Atlantique","Loiret","Lot","Lot-et-Garonne","Lozère","Maine-et-Loire","Manche","Marne","Haute-Marne","Mayenne","Meurthe-et-Moselle","Meuse","Morbihan","Moselle","Nièvre","Nord","Oise","Orne","Pas-de-Calais","Puy-de-Dôme","Pyrénées-Atlantiques","Hautes-Pyrénées","Pyrénées-Orientales","Bas-Rhin","Haut-Rhin","Rhône","Haute-Saône","Saône-et-Loire","Sarthe","Savoie","Haute-Savoie","Paris","Seine-Maritime","Seine-et-Marne","Yvelines","Deux-Sèvres","Somme","Tarn","Tarn-et-Garonne","Var","Vaucluse","Vendée","Vienne","Haute-Vienne","Vosges","Yonne","Territoire de Belfort","Essonne","Hauts-de-Seine","Seine-Saint-Denis","Val-de-Marne","Val-d’Oise"];
  var num = ["01","02","03","04","05","06","07","08","09",
  "10","11","12","13","14","15","16","17","18","19",
  "2A","2B","21","22","23","24","25","26","27","28","29",
  "30","31","32","33","34","35","36","37","38","39",
  "40","41","42","43","44","45","46","47","48","49",
  "50","51","52","53","54","55","56","57","58","59",
  "60","61","62","63","64","65","66","67","68","69",
  "70","71","72","73","74","75","76","77","78","79",
  "80","81","82","83","84","85","86","87","88","89",
  "90","91","92","93","94","95"];
  var i = 0;
  var liste = [];
  var listeVilles = [];
  while(i<num.length){
     liste.push(num[i]+" "+depts[i]);
     i++;
  }

  $('#department').autocomplete({
     source : liste
  });

  $('#ville').autocomplete({
     source : listeVilles
  });

  function getDpt(){
    data = $.getJSON("./data/OSM-communes-codeInseeOsm.json-"+$("#department").val().slice(0,2)+".json",function(data){
      listeVilles = Object.keys(data.communes);
      communes = data.communes;
      $('#ville').unbind("autoComplete");
      $('#ville').autocomplete({
         source : listeVilles
      });
      $('.ville').show();
    })
  }
  
  $("#department").on("autocompleteselect",function(){
     setTimeout(getDpt,200);
  })  

  function getCity(){
    $('.btn').show();
  }
  
  $("#ville").on("autocompleteselect",function(){
     setTimeout(getCity,200);
  })
  
  function analyzeCoord(str){
     var result = "";
     var patternStart = ["POLYGON ((","POINT ("];
     var patternStop = [",",")"];
     var i = 0
     patternStart.forEach(function(p){
        if(str.slice(0,p.length) == p){
           var posStop = str.search(patternStop[i]);
           result = str.slice(p.length,posStop);
           i++
        }
     })
     return result;
  }
  
  function analyzeName(str){
     var result = "";
     str2 = str.toLowerCase();
     var allPrefixes = {
     "sports":["Boule lyonnaise ","Boulodrome ","Boulodrome couvert ","Centre nautique ","Centre Sportif ","City Stade ","Complexe ","Complexe sportif ","Dojo ","École De Danse ","Espace ","Halle ","Halle sportive ","Gymnase ","Gymnase scolaire ","Jeu de boules ","Le centre ","Mini Football ","Palais des Sports ","Piscine ","Piscine municipale ","Piste d'athlétisme ","Piste d'athletisme ","Plateau Sportif ","Plateaux sportifs ","Salle ","Salle de boxe ","Salle de sport ","Salle de sports ","Salle omnisports ","Skate-Park ","Square ","Stade ","Stade municipal ","Tennis Club ","Tennis Club municipal ","Terrain ","Terrain de football ","Terrain de proximité ","Vélodrome ",".*Vélodrome "],
     "education":["Crèche Municipale","Collège( | public| privé)* ","École ([ÉE]l[eé]mentaire|maternelle|primaire|technique|technologique)*( |d'application )*(privée|publique)*[ ]*","Groupe scolaire ","Institut ","Institution ","Lycée( | général| général et technologique| polyvalent| professionnel| professionnel| technologique)*( | public| privé|.*restauration)* "]
     };
     var prefixes = allPrefixes[themes[themeNumber]];
     var i = 0;
     while(i<prefixes.length){
        var tryRegexp = str.replace(new RegExp("^"+prefixes[i], "ig"), "")
        if(tryRegexp.length < str.length){
           result = tryRegexp ;
        }
        i++;
     }
     return result;
  }
  
  function sendGeodatamineQuery(){
    $.get("https://geodatamine.fr/data/"+themes[themeNumber]+"/"+communes[$("#ville").val()][1])
    .done(analyzeGeoData)
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });
  }
  
  function makeSPARQLQuery( endpointUrl, sparqlQuery, doneCallback ) {
	  var settings = {
		  headers: { Accept: 'application/sparql-results+json' },
	 	  data: { query: sparqlQuery }
	  };
	  return $.ajax( endpointUrl, settings ).then( doneCallback );
  }

  function wikidataNameResults(data){
    if(data.results.bindings.length>0){
		  $( '.foundName'+nameNb ).each(function(){
		    $(this).append('<td><a href="'+data.results.bindings[0].person.value+'">'+foundNames[nameNb]+' ('+data.results.bindings[0].personDescription.value+')</a></td><td>'+data.results.bindings[0].genderLabel.value+'</td><td></td>');
		  });
  	}else{
	  	console.log("Not found: "+foundNames[nameNb]);
	  	console.log(endpointUrl);
	  	
  	}
	  nameNb++;
    setTimeout(getNextWikidata,1000);
	}

  function getNextWikidata(){
   if(nameNb < foundNames.length){
     var nom = foundNames[nameNb];
     // Retrieve the bnf id from Wikidata:
     var endpointUrl = 'https://query.wikidata.org/sparql',
   	       sparqlQuery = 'select ?person ?sitelinks ?genderLabel ?personDescription where {\n'+
'  ?person rdfs:label "'+nom+'"@fr.\n'+
'  ?person wdt:P31 wd:Q5.\n'+
'  ?person wdt:P21 ?gender.\n'+
'  ?person wikibase:sitelinks ?sitelinks.\n'+
'  SERVICE wikibase:label {\n'+
'     bd:serviceParam wikibase:language "fr" .\n'+
'   }\n'+
'} order by desc(?sitelinks)';
         
     makeSPARQLQuery(endpointUrl, sparqlQuery, wikidataNameResults);
   }
 }

  
  function analyzeGeoData(data){
    // For each topic, store where to find the following information: name / latitude / longitude
    var findData = {"sports":[3,0,-1],"education":[2,0,-1]}
    var csv = Papa.parse(data);
    console.log(csv)
    var i = 0;
    for(element in Object.keys(csv.data)){
      if(i > 0){
         if(csv.data[i].length>1){
            var name = csv.data[i][findData[themes[themeNumber]][0]];
            var coord = csv.data[i][findData[themes[themeNumber]][1]];
            if(findData[themes[themeNumber]][2] > -1){
              console.log(findData[themes[themeNumber]][2])
              // if longitude is already included in latitude do nothing
              coord += ","+csv.data[i][findData[themes[themeNumber]][2]];
            }
            if(name != ""){
              var analyzedName = analyzeName(name);
              if(analyzedName.slice(0,3)=="de "||analyzedName.slice(0,3)=="du "||analyzedName.slice(0,4)=="des "||analyzedName.slice(0,2)=="d'"||analyzedName.slice(0,2)=="d’"){
                analyzedName = "";
              }
              if(analyzedName != ""){
                var lineNb = foundNames.length;
                if(!(foundNames.includes(analyzedName))){
                  foundNames[lineNb] = analyzedName;
                } else {
                  lineNb = foundNames.indexOf(analyzedName);
                }
                $("table").append('<tr class="foundName'+lineNb+'"><td>'+themeLabels[themes[themeNumber]]+"</td><td>"+name+"</td><td>"+analyzedName+"</td><td>"+analyzeCoord(coord)+"</td></tr>");
              } else {
                $("table").append('<tr><td>'+themeLabels[themes[themeNumber]]+"</td><td>"+name+"</td><td>"+analyzedName+"</td><td>"+analyzeCoord(coord)+"</td></tr>");
              }
            }
         }
      }
      i++
    }
    themeNumber++;
    if(themeNumber < themes.length){
      setTimeout(sendGeodatamineQuery);
    } else {
      nameNb = 0;
      getNextWikidata();
    }
  }
  
  $("#analyse").on("click", function(){
    $("#results").append("<p>Code INSEE : "+communes[$("#ville").val()][0]+"</p>");
    $("#results").append("<p>Code OSM : "+communes[$("#ville").val()][1]+"</p>");
    $("#results").html('<p>Vous voulez nous aider à améliorer les résultats ci-dessous, trouvés automatiquement en interrogeant <a href="https://www.wikidata.org/">Wikidata</a> ? Copiez-collez le tableau dans un logiciel de tableur puis remplissez la dernière colonne pour les noms de personnes qui n’ont pas été trouvés dans Wikidata, et transmettez-le à l’adresse philippe.gambette<&alpha;rob&alpha;se>u-pem.fr</p>');
    $("#results").append("<table><tr><th>Type</th><th>Nom</th><th>Analyse du nom</th><th>Coordonnées</th><th>Nom trouvé sur Wikidata</th><th>Genre</th><th>Nom à trouver sur Wikidata</th></tr></table>")
    
    themes = ["sports","education"];
    themeLabels = {"sports":"équipement sportif","education":"lieu d’enseignement"}
    themeNumber = 0;
    sendGeodatamineQuery();
  });

})