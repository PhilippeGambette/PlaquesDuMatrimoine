<?php 
include 'include/connexion.php';
$ville = htmlspecialchars($_POST["ville"]);

if (empty($ville)) {
 header("Location: index.html");
}

$connexion = new PDO('mysql:host='.$hote.';port='.$port.';dbname='.$base, $utilisateur, $motdepasse);
$connexion->query("SET NAMES utf8");

$requete = "
   SELECT 
*
FROM 
villes_france_free

WHERE ville_nom_reel LIKE '%".$ville."%'
";

$resultats = $connexion->query($requete);
$resultats->setFetchMode(PDO::FETCH_OBJ);

?>
<!DOCTYPE html>
<html lang="fr">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Résultats de recheche pour <?php echo $ville ?></title>
 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
<div class="container">
<h1 class="text-center">Villes contenant "<?php echo $ville ?>"</h1>
<div class="row">
<table>
 <?php
 $codeJson = array();
 
         while($ligne = $resultats->fetch())
         {
             echo "
             <tr>
                 <td>".$ligne->ville_nom_reel."</td>
                 <td>".$ligne->ville_code_commune."</td>
             </tr>";
             $codeJson[] = $ligne;
         }
         ?>
         
         </table>
         <hr>

         <?php
     echo json_encode($codeJson);
 ?>
 </div>
 </div>
</body>
</html>