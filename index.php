<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plaques du Matrimoine</title>
  <link rel="icon" type="image/png" href="img/favicon.ico.png">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin="" />
  <link rel="stylesheet"
    href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.min.css">
  <script src="./js/checkBrowser.js"></script>
  <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
    integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
    crossorigin=""></script>
  <script async src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <script async src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.0.2/papaparse.min.js"></script>
  <script async src="https://kit.fontawesome.com/997660e778.js" crossorigin="anonymous"></script>
  <noscript>Pour utiliser pleinement cet outil, JavaScript est requis</noscript>
  <meta property="og:title" content="Plaques du Matrimoine" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="http://matrimoine.alanakra.fr" />
  <meta property="og:image" content="http://matrimoine.alanakra.fr/img/logo-plaques-du-matrimoine_522.jpg" />
  <meta property="og:site_name" content="Plaques du Matrimoine" />
  <meta property="og:description"
    content="Plaques du Matrimoine: Détectez les nom de lieux nommées d'après des noms de femmes près de chez vous." />
  <meta name="description" content="Plaques du Matrimoine: Détectez les noms de lieux nommées d'après des noms de femmes près de chez vous."/>
</head>

<body>
  <?php include 'include/__navbar.php'?>

  <div class="container-main">
    <div class="container-left">
      <h1>Féminisons <br>
        l'espace public !</h1>
      <p>Repérez les voies et les lieux d'une commune de France métropolitaine, nommés d'après des femmes.</p>
      <div class="input-c">
        <input class="input-home" id="inputDpt" name="departement" type="text" placeholder="Rechercher un département.">

        <input class="input-home" id="inputCity" name="ville" type="text" placeholder="Rechercher une ville.">

        <button type="submit" class="submit-home" id="searchCity">Rechercher <i class="fas fa-search"></i></button>
      </div>
    </div>

    <div class="container-right">
      <img src="img/logo-plaques-du-matrimoine_522.jpg" alt="logo de Plaques du matrimoine">
    </div>
  </div>

  <div class="container-map">
    <h2 id="js-phrase-cityname" class="phrase-cityname">Résultats pour <span id="cityname-h"></span></h2>
    <div id="js-map"></div>

    <div class="toggle-leaf-marker" id="toggle-leaf-marker">
      <div id="toggle-men" class="toggle-men">
       <p><i id="eye" class="far fa-eye"></i> Lieux nommés d'après des hommes</p>
      </div>
    </div>
    
    <h3 class="stats-title">Statistiques <i class="fas fa-chart-pie"></i></h3>
    <p id="phraseResult"><span class="js-nbFemmes"></span> femme<span class="js-pluriel">s</span> représentée<span class="js-pluriel">s</span> pour un total de <span id="js-nbLieux"></span> lieux</p>
  </div>

  <div id="js-graph"></div>


  <div class="results" id="results">
  </div>

  <?php require 'include/__footer.php' ?>

  <script src="./js/namelist.js"></script>
  <script src="./js/plaquesDuMatrimoine.js"></script>
  <script src="./js/script-home.js"></script>
</body>

</html>