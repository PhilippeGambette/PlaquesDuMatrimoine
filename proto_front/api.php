<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
require './include/connexion.php';

// Connection to database
 try {
  $db = new PDO("mysql:host=$hote; dbname=$base;", $utilisateur, $motdepasse);
 } catch (PDOException $e) {
  echo "Erreur!: " . $e->getMessage() . "<br/>";
  die();
 }

// Write mode
 if($_GET["action"] == "write"){
 // Insertion of data from Wikidata
  $pdoStat = $db->prepare("INSERT INTO `personne` (NULL, :id_wikidata, :alias, :genderLabel, :personDescription :sitelink, :lemma)");
  var_dump($_GET);
  $id_wikidata = $_GET['id_wikidata'];
  $alias = $_GET['alias'];
  $genderLabel = $_GET['genderLabel'];
  $personDescription = $_GET['personDescription'];
  $siteLink = $_GET['siteLink'];
  $lemma = $_GET['lemma'];

  $pdoStat->bindValue(':id_wikidata', $id_wikidata, PDO::PARAM_STR);
  $pdoStat->bindValue(':alias', $alias, PDO::PARAM_STR);
  $pdoStat->bindValue(':genderLabel', $genderLabel, PDO::PARAM_STR);
  $pdoStat->bindValue(':personDescription', $personDescription, PDO::PARAM_STR);
  $pdoStat->bindValue(':siteLink', $siteLink, PDO::PARAM_STR);
  $pdoStat->bindValue(':lemma', $lemma, PDO::PARAM_STR);

  $insertIsOK =  $pdoStat->execute();

  if($insertIsOK){
   echo "Les données ont été insérées";
  }else{
   echo "Erreur dans l'envoi";
  }
  
 }
  else if($_GET["action"] == "read"){
  echo "Mode lecture";
 }

 // INSERT INTO `personne` (`id`, `id_wikidata`, `alias`, `genderLabel`, `personDescription`, `sitelink`, `lemma`) VALUES (NULL, 'Q535', 'Victor Hugo', 'masculin', 'écrivain, poète et homme politique français', 'https://fr.wikipedia.org/wiki/Victor_Hugo', 'Victor Hugo')
?>