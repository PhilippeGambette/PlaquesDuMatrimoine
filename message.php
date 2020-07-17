<!DOCTYPE html>
<html lang="fr">

<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Plaques du Matrimoine</title>
 <link rel="stylesheet" href="css/style.css">
</head>

<body>
 <?php require 'include/__navbar.php' ?>
 <div class="container-present">
  <div class="all-present">
   <h1><?php echo $_GET['confirm'] ?></h1>
   <a class="link-present" href="index.php">Retour à l'accueil</a>
  </div>
 </div>
 <?php require 'include/__footer.php' ?>
</body>

</html>