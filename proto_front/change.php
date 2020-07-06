<!DOCTYPE html>
<html lang="fr">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Plaques du Matrimoine | Contribution pour <?php echo $_POST['nom'] ?></title>
   <link rel="stylesheet" href="css/style.css">
</head>

<body>
   <?php include 'include/__navbar.php' ?>
   <div class="container-contribution">
      <h1>Contribution pour <?php echo $_POST['topic'] ?> <?php echo $_POST['nom'] ?>, <?php echo ($_POST['cityname'])?>
      </h1>

      <form action="sendmail-change.php" method="post">
         <p>Tous les champs marqués d'un <span class="required">*</span> sont obligatoires</p>

         <label for="cityname">Ville</label> <br>
         <input type="text" name="cityname" value="<?php echo($_POST['cityname']) ?>" disabled> <br><br>

         <label for="nom">Nom du lieu</label><br>
         <input type="text" name="nom" value="<?php echo($_POST['nom']) ?>" disabled><br><br>

         <label for="topic">Type de lieu</label><br>
         <input type="text" name="topic" value="<?php echo($_POST['topic']) ?>" disabled><br><br>

         <label for="sender">Votre adresse e-mail <span class="required">*</span></label> <br>
         <input type="email" name="sender" id="" required> <br><br>

         <div class="choose-gender">
            <p>Merci de définir le genre de la personne <span class="required">*</span></p>
            <div>
               <input id="féminin" type="radio" name="gender" id="" value="féminin" required>
               <label id="féminin" for="féminin">Féminin</label>
            </div>

            <div>
               <input id="femme transgenre" type="radio" name="gender" id="" value="femme transgenre">
               <label for="femme transgenre">Femme transgenre</label>
            </div>

            <div>
               <input id="masculin" type="radio" name="gender" id="" value="masculin">
               <label for="masculin">Masculin</label>
            </div>

            <div>
               <input id="homme transgenre" type="radio" name="gender" id="" value="masculin">
               <label for="homme transgenre">Homme transgenre</label>
            </div>
         </div>

         <label for="message">Informations sur la personne <span class="required">*</span></label><br>
         <textarea name="message" id="" cols="30" rows="10" placeholder=""></textarea> <br>

         <label for="result">8 + 9</label><br>
         <input type="number" name="result" id="result" required><br>

         <button type="submit">Envoyer</button>
      </form>
   </div>
   <?php include 'include/__footer.php' ?>
</body>

</html>