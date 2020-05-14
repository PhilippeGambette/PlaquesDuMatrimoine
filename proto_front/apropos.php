<!DOCTYPE html>
<html lang="fr">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Plaques du Matrimoine | A propos</title>
 <link rel="stylesheet" href="css/style.css">
</head>
<body>
 <?php require 'include/__navbar.php' ?>

 <div class="container-apropos">
  <h1>A propos</h1>
  <div class="bloc-text">
  <p>Cet outil, développé dans le cadre du projet <a href="https://citedesdames.hypotheses.org/">Cité des Dames : créatrices dans la cité</a>, financé par l'<a href="http://www.future-isite.fr/li-site-future/">I-Site Future</a> de l' <a href="http://univ-eiffel.fr/">université Gustave Eiffel</a>, vise à repérer les voies et les lieux (équipements sportifs, bibliothèques, lieux d'enseignement) d'une commune de France métropolitaine, nommés d'après des femmes.</p>
  <p>
   Mis à disposition <a href="https://github.com/PhilippeGambette/PlaquesDuMatrimoine">sous licence GPL</a>, il a été conçu à partir de données également mises à disposition sous licence libre :</p>
   <ul>
    <li>la <a href="https://adresse.data.gouv.fr/donnees-nationales">Base Adresse Nationale</a>, dans sa version
     <i>Adresses</i> téléchargée le 29/01/2020</li>
    <li>des données d'<a href="https://www.openstreetmap.org/">OpenStreetMap</a> interrogées automatiquement grâce à
     l'<a href="https://geodatamine.fr/">API GéoDataMine</a></li>
    <li>des données de <a href="https://wikidata.org">Wikidata</a> interrogée automatiquement sur les noms de personnes
     trouvés, pour identifier leur genre.</li>
   </ul>
   <p>Il s'agit d'un outil expérimental en cours de développement. <b>Les résultats obtenus ne sont pas fiables à 100%</b> et doivent être vérifiés : des problèmes d'homonymie, l'absence de prénom, d'accents ou de majuscules peuvent expliquer les erreurs les plus fréquentes.</p>
   <p>Cette plateforme à été créé en partie par <a href="https://github.com/alanakra">Alan Akra</a>, étudiant en DUT MMI à Champs-sur-Marne avec la contribution de <a href="http://igm.univ-mlv.fr/~gambette/">Philippe Gambette</a> dans le cadre du stage de deuxième année</p>
  </div>
 </div>

 <?php require 'include/__footer.php'?>

</body>
</html>