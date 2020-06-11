<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
require './include/connexion.php';

// Connection to database
 try {
  $db = new PDO("mysql:host=$hote; dbname=$base;", $utilisateur, $motdepasse);
  $db->query('SET NAMES utf8');
 } catch (PDOException $e) {
  echo "Erreur!: " . $e->getMessage() . "<br/>";
  die();
 }

// Write mode
 if($_GET["action"] == "write"){
 // Insertion of data from Wikidata
  var_dump($_GET);
  $id_wikidata = $_GET['id_wikidata'];
  $alias = $_GET['alias'];
  $nom_complet = $_GET['nom_complet'];
  $genderLabel = $_GET['genderLabel'];
  $personDescription = $_GET['personDescription'];
  $siteLink = $_GET['siteLink'];
  $lemma = $_GET['lemma'];


  $requete = $db->exec("INSERT INTO `personne` (`id`, `id_wikidata`, `alias`, `nom_complet`, `genderLabel`, `personDescription`, `sitelink`, `lemma`) VALUES (NULL, '".$id_wikidata. "', '". $alias . "', '". $nom_complet . "', '".$genderLabel . "', '" .$personDescription. "', '" . $siteLink . "', '". $lemma . "')") ;

 }
 // Read mode
  else if($_GET["action"] == "read"){
   var_dump($_GET);
   $nomPotentiel = $_GET['nom_potentiel'];
   $prenomPotentiel = $_GET['prenom_potentiel'];

   $requete = "SELECT * FROM alias WHERE nom_potentiel= '$nomPotentiel' AND prenom_potentiel= '$prenomPotentiel'";
   echo($requete);
   $stmt = $db->prepare($requete);
   $stmt->execute();
   $tableauResult=$stmt->fetchAll(PDO::FETCH_ASSOC);
   
   $codeJSON = array();

   // while($ligne = $result->fetch()){
   //  $codeJSON[] = $ligne;
   // }

   foreach($tableauResult as $result){echo "<BR>".$result["nom_complet_potentiel"] ."<BR>";}
   
   // header('content-type:application/json');
   // echo(json_encode($codeJSON, JSON_UNESCAPED_UNICODE));

 }
  /**url write mode
  *http://localhost/plaquesdumatrimoine/proto_front/api.php?action=write&id_wikidata=&alias=&nom_complet=&genderLabel=&personDescription=&siteLink=&lemma= 
  */ 

  /**url read mode
   * http://localhost/plaquesdumatrimoine/proto_front/api.php?action=read&nom_potentiel=&prenom_potentiel=
   */
?>