<!DOCTYPE html>
<html lang="fr">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Plaques du Matrimoine | Contribuer</title>
 <link rel="stylesheet" href="css/style.css">
</head>
<body>
 <?php include 'include/__navbar.php' ?>
  <div class="container-contribution">
     <!-- <h1>Contribution pour la ville de </h1>  -->
     <h1>Contribution pour <?php echo $_GET['cityname'] ?></h1> 
     
     <form action="sendmail.php" method="get">
      <label for="sender">Votre adresse e-mail</label> <br>
      <input type="email" name="sender" id=""> <br><br>

      <label for="message">Informations sur la personne</label><br>
      <textarea name="message" id="" cols="30" rows="10" placeholder=""></textarea> <br>

      <input type="submit" value="Envoyer">
     </form>
  </div>
 <?php include 'include/__footer.php' ?>
</body>
</html>