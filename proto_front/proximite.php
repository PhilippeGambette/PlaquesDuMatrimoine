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
 <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
 integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
 crossorigin=""></script>
 <script src="https://cdn.plot.ly/plotly-1.2.0.min.js"></script>
 <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
 <script src="PapaParse-5.0.2/papaparse.js"></script>
 <noscript>Pour utiliser pleinement cet outil, JavaScript est requis</noscript>
</head>
<body>
 <?php include 'include/__navbar.php' ?>
 <div class="container-map" id="container-map">
  <h1 class="proximite">A proximité de <span id="cityname"></span></h1>
  <div id="js-map"></div>
 </div>
 
 <div class="results-local" id="results-local">
  <h2>Statistiques</h2>
  <p><span id="nbFemmes">X</span> femmes représentées pour un total de <span id="nbLieux"></span> lieux</p>
  <div id="graph"></div>
 </div>
 <?php require 'include/__footer.php' ?>
 <script src="js/script-location.js"></script>
</body>
</html>