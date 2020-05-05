<!DOCTYPE html>
<html lang="fr">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Plaques du Matrimoine</title>
 <link rel="stylesheet" href="css/style.css">
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
 integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
 crossorigin=""/>
 <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
 integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
 crossorigin=""></script>
 <script src="https://cdn.plot.ly/plotly-1.2.0.min.js"></script>
 <noscript>Pour utiliser pleinement cet outil, JavaScript est requis</noscript>
</head>
<body>
 <?php include 'include/__navbar.php'?>

 <div class="container-main">
  <div class="container-left">
   <h1>Féminisons <br>
     l'espace public !</h1>
     <div class="input-c">
       <form action="traite_ville.php" method="post">
         <input class="input-home" id="input-home" list="list-dept" name="ville" type="text" placeholder="Rechercher une ville, un lieu...">
        <?php include 'include/__datalist-departement.php';?>

         <button type="submit" class="submit-home">Go!</button>
       </form>
     </div>
  </div>

  <div class="container-right">
   <img src="img/logo-plaques-du-matrimoine_522.jpg">
  </div>
 </div>

 <div class="container-map" id="container-map">
  <h2 class="proximite">A proximité de <span id="cityname"></span></h2>
  <div id="js-map"></div>
  <div id="graph"></div>
 </div>

 <?php require 'include/__footer.php' ?>

<script src="js/script-home.js"></script>
</body>
</html>