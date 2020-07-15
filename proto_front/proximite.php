<!DOCTYPE html>
<html lang="fr">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Plaques du Matrimoine | A proximité</title>
 <link rel="stylesheet" href="css/style.css">
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
 integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
 crossorigin=""/>
 <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
 <script src="./js/checkBrowser.js"></script>
 <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
 integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
 crossorigin=""></script>
 <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
 <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
 <script src="PapaParse-5.0.2/papaparse.js"></script>
 <script async src="https://kit.fontawesome.com/997660e778.js" crossorigin="anonymous"></script>
 <noscript>Pour utiliser pleinement cet outil, JavaScript est requis</noscript>
</head>
<body>
 <?php include 'include/__navbar.php' ?>
 <div id="overlay_geolocation">
  <div class="please_location">
   <p>La localisation n'est pas disponible ou vous avez refusé son activation</p>
   <button id="no_geolocation">OK</button>
  </div>
 </div>

 <div class="container-map" id="container-map">
  <h1 class="proximite">A proximité de <span id="cityname"></span></h1>
  <div id="js-map"></div>
  <h2 class="stats-title">Statistiques <i class="fas fa-chart-pie"></i></h2>
  <p id="phraseResult"><span id="js-nbFemmes"></span> femme<span id="js-pluriel">s</span> représentée<span id="js-pluriel">s</span> pour un total de <span id="js-nbLieux"></span> lieux</p>
 </div>

 <div id="js-graph"></div>

 <div id="toggle-leaf-marker">
   <span id="toggle-women">Femme / Femme transgenre</span>
   <span id="toggle-men">Homme / Homme transgenre</span>
 </div>
 
 <div class="results" id="results">
 </div>
 <?php require 'include/__footer.php' ?>
 <script src="./js/namelist.js"></script>
 <script src="./js/plaquesDuMatrimoine.js"></script>
 <script src="./js/script-location.js"></script>
</body>
</html>