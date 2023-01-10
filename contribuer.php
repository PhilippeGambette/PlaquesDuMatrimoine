<!DOCTYPE html>
<html lang="fr">

<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Plaques du Matrimoine | Proposition de lieu</title>
 <link rel="stylesheet" href="css/style.css">
</head>

<body>
 <?php require 'include/__navbar.php' ?>
 <div class="container-contribution">
  <h1>Proposition d'un nouveau lieu</h1>
  <p>Vous souhaitez proposer un nom de lieu non répertorié ? N'hésitez pas, nous vous répondrons le plus rapidement
   possible !</p>
   <form action="sendmail-contribution.php" method="post">
   <p>Tous les champs sont <strong>obligatoires</strong></p>

   <label for="cityname">Ville</label> <br>
   <input type="text" name="cityname" required> <br><br>

   <div>
     <label for="departement">Département</label> <br>
     <select name="departement" id="departement" required>
          <option value="">--Merci de sélectionner un département--</option>
          <option value="(01) Ain">(01) Ain</option>
          <option value="(02) Aisne">(02) Aisne</option>
          <option value="(03) Allier">(03) Allier</option>
          <option value="(04) Alpes de Haute Provence">(04) Alpes de Haute Provence</option>
          <option value="(05) Hautes Alpes">(05) Hautes Alpes</option>
          <option value="(06) Alpes Maritimes">(06) Alpes Maritimes</option>
          <option value="(07) Ardèche">(07) Ardèche</option>
          <option value="(08) Ardennes">(08) Ardennes</option>
          <option value="(09) Ariège">(09) Ariège</option>
          <option value="(10) Aube">(10) Aube</option>
          <option value="(11) Aude">(11) Aude</option>
          <option value="(12) Aveyron">(12) Aveyron</option>
          <option value="(13) Bouches du Rhône">(13) Bouches du Rhône</option>
          <option value="(14) Calvados">(14) Calvados</option>
          <option value="(15) Cantal">(15) Cantal</option>
          <option value="(16) Charente">(16) Charente</option>
          <option value="(17) Charente Maritime">(17) Charente Maritime</option>
          <option value="(18) Cher">(18) Cher</option>
          <option value="(19) Corrèze">(19) Corrèze</option>
          <option value="(2A) Corse-du-Sud">(2A) Corse-du-Sud</option>
          <option value="(2B) Haute-Corse">(2B) Haute-Corse</option>
          <option value="(21) Côte d'Or">(21) Côte d'Or</option>
          <option value="(22) Côtes d'Armor">(22) Côtes d'Armor</option>
          <option value="(23) Creuse">(23) Creuse</option>
          <option value="(24) Dordogne">(24) Dordogne</option>
          <option value="(25) Doubs">(25) Doubs</option>
          <option value="(26) Drôme">(26) Drôme</option>
          <option value="(27) Eure">(27) Eure</option>
          <option value="(28) Eure et Loir">(28) Eure et Loir</option>
          <option value="(29) Finistère">(29) Finistère</option>
          <option value="(30) Gard">(30) Gard</option>
          <option value="(31) Haute Garonne">(31) Haute Garonne</option>
          <option value="(32) Gers">(32) Gers</option>
          <option value="(33) Gironde">(33) Gironde</option>
          <option value="(34) Hérault">(34) Hérault</option>
          <option value="(35) Ille et Vilaine">(35) Ille et Vilaine</option>
          <option value="(36) Indre">(36) Indre</option>
          <option value="(37) Indre et Loire">(37) Indre et Loire</option>
          <option value="(38) Isère">(38) Isère</option>
          <option value="(39) Jura">(39) Jura</option>
          <option value="(40) Landes">(40) Landes</option>
          <option value="(41) Loir et Cher">(41) Loir et Cher</option>
          <option value="(42) Loire">(42) Loire</option>
          <option value="(43) Haute Loire">(43) Haute Loire</option>
          <option value="(44) Loire Atlantique">(44) Loire Atlantique</option>
          <option value="(45) Loiret">(45) Loiret</option>
          <option value="(46) Lot">(46) Lot</option>
          <option value="(47) Lot et Garonne">(47) Lot et Garonne</option>
          <option value="(48) Lozère">(48) Lozère</option>
          <option value="(49) Maine et Loire">(49) Maine et Loire</option>
          <option value="(50) Manche">(50) Manche</option>
          <option value="(51) Marne">(51) Marne</option>
          <option value="(52) Haute Marne">(52) Haute Marne</option>
          <option value="(53) Mayenne">(53) Mayenne</option>
          <option value="(54) Meurthe et Moselle">(54) Meurthe et Moselle</option>
          <option value="(55) Meuse">(55) Meuse</option>
          <option value="(56) Morbihan">(56) Morbihan</option>
          <option value="(57) Moselle">(57) Moselle</option>
          <option value="(58) Nièvre">(58) Nièvre</option>
          <option value="(59) Nord">(59) Nord</option>
          <option value="(60) Oise">(60) Oise</option>
          <option value="(61) Orne">(61) Orne</option>
          <option value="(62) Pas de Calais">(62) Pas de Calais</option>
          <option value="(63) Puy de Dôme">(63) Puy de Dôme</option>
          <option value="(64) Pyrénées Atlantiques">(64) Pyrénées Atlantiques</option>
          <option value="(65) Hautes Pyrénées">(65) Hautes Pyrénées</option>
          <option value="(66) Pyrénées Orientales">(66) Pyrénées Orientales</option>
          <option value="(67) Bas Rhin">(67) Bas Rhin</option>
          <option value="(68) Haut Rhin">(68) Haut Rhin</option>
          <option value="(69) Rhône">(69) Rhône</option>
          <option value="(70) Haute Saône">(70) Haute Saône</option>
          <option value="(71) Saône et Loire">(71) Saône et Loire</option>
          <option value="(72) Sarthe">(72) Sarthe</option>
          <option value="(73) Savoie">(73) Savoie</option>
          <option value="(74) Haute Savoie">(74) Haute Savoie</option>
          <option value="(75) Paris">(75) Paris</option>
          <option value="(76) Seine Maritime">(76) Seine Maritime</option>
          <option value="(77) Seine et Marne">(77) Seine et Marne</option>
          <option value="(78) Yvelines">(78) Yvelines</option>
          <option value="(79) Deux Sèvres">(79) Deux Sèvres</option>
          <option value="(80) Somme">(80) Somme</option>
          <option value="(81) Tarn">(81) Tarn</option>
          <option value="(82) Tarn et Garonne">(82) Tarn et Garonne</option>
          <option value="(83) Var">(83) Var</option>
          <option value="(84) Vaucluse">(84) Vaucluse</option>
          <option value="(85) Vendée">(85) Vendée</option>
          <option value="(86) Vienne">(86) Vienne</option>
          <option value="(87) Haute Vienne">(87) Haute Vienne</option>
          <option value="(88) Vosges">(88) Vosges</option>
          <option value="(89) Yonne">(89) Yonne</option>
          <option value="(90) Territoire de Belfort">(90) Territoire de Belfort</option>
          <option value="(91) Essonne">(91) Essonne</option>
          <option value="(92) Hauts de Seine">(92) Hauts de Seine</option>
          <option value="(93) Seine Saint Denis">(93) Seine Saint Denis</option>
          <option value="(94) Val de Marne">(94) Val de Marne</option>
          <option value="(95) Val d'Oise">(95) Val d'Oise</option>
      </select>
   </div>

   <label for="nom">Nom du lieu</label><br>
   <input type="text" name="nom" id="nom" required aria-required="true"><br><br>

   <label for="topic">Type de lieu</label><br>
   <input type="text" name="topic" id="topic" required aria-required="true"><br><br>

   <label for="email">Votre adresse e-mail</label> <br>
   <input type="email" name="sender" id="email" required aria-required="true"> <br><br>

   <div class="choose-gender">
   <p>Merci de définir le genre de la personne</p>
    <div>
     <input id="féminin" type="radio" name="gender" id="" value="féminin" required aria-required="true">
     <label id="féminin" for="féminin">Féminin</label>
    </div>

    <div>
     <input id="femme transgenre" type="radio" name="gender" id="femme transgenre" value="femme transgenre" aria-required="true">
     <label for="femme transgenre">Femme transgenre</label>
    </div>

    <div>
     <input id="masculin" type="radio" name="gender" id="masculin" value="masculin">
     <label for="masculin">Masculin</label>
    </div>

    <div>
     <input id="homme transgenre" type="radio" name="gender" id="" value="homme transgenre">
     <label for="homme transgenre">Homme transgenre</label>
    </div>

   <label for="message">Informations sur la personne</label><br>
   <textarea name="message" id="" cols="30" rows="10" placeholder="" id="message" required aria-required="true"></textarea> <br>

   <label for="result">8 + 9</label><br>
   <input type="number" name="result" id="result" required aria-required="true"><br>

   <button type="submit">Envoyer</button>
  </form>
 </div>
 <?php require 'include/__footer.php' ?>
</body>

</html>