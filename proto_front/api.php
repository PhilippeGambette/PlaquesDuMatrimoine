<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('content-type:application/json');
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

   $id_wikidata = $_GET['id_wikidata'];
   $alias = $_GET['alias'];
   $nom_complet = $_GET['nom_complet'];
   $genderLabel = $_GET['genderLabel'];
   $personDescription = $_GET['personDescription'];
   $siteLink = $_GET['siteLink'];
   $lemma = $_GET['lemma'];
   
   //  Check if potential name is in "alias" table
   $sqlCheckAlias = "SELECT COUNT(id) AS nombre_personne FROM `personne` WHERE nom_complet =:nom_complet AND alias=:alias GROUP BY nom_complet, alias " ;
   $requestCheckAlias = $db -> prepare($sqlCheckAlias);
   $attributes = array(
     ':nom_complet' => $_GET['nom_complet'],
     ':alias' => $_GET['alias']);
   $requestCheckAlias -> execute($attributes);
   
   $data = $requestCheckAlias -> fetch();

  //  Check if 1 or more name appear in the "alias" table
   if(intval($data["nombre_personne"])>= 1){
     
    // If true, this message will be return
     echo '{"message":"Alias already found in table"}';

   }else{

    // If false, the data are stocked in database

    // First in "personne" table
     $sqlInsertWritePersonne = "INSERT INTO `personne` (`id`, `id_wikidata`, `alias`, `nom_complet`, `genderLabel`, `personDescription`, `sitelink`, `lemma`) VALUES (NULL, :id_wikidata, :alias, :nom_complet, :genderLabel, :personDescription, :siteLink, :lemma)";
     $requestInsertPersonne = $db -> prepare($sqlInsertWritePersonne);
     $attributesPersonne = array(
       ':id_wikidata' => $_GET['id_wikidata'], 
       ':alias' => $_GET['alias'], 
       ':nom_complet' => $_GET['nom_complet'], 
       ':genderLabel' => $_GET['genderLabel'], 
       ':personDescription' => $_GET['personDescription'], 
       ':siteLink' => $_GET['siteLink'], 
       ':lemma' => $_GET['lemma']);
     $requestInsertPersonne -> execute($attributesPersonne);

    // And in "alias" table
     $sqlInsertWriteAlias = "INSERT INTO `alias` (`id`,`nom_potentiel`,`id_correspondance`) VALUES (NULL, :alias, :id_correspondance)";
     $requestInsertAlias = $db -> prepare($sqlInsertWriteAlias);
     $attributeAlias = array(
       ':alias' => $_GET['alias'],
       ':id_correspondance' => $_GET['id_wikidata']);     
     $requestInsertAlias -> execute($attributeAlias);


    //  And this message will be returned
     echo '{"message": "New alias in the table"}';
   }

 }

// Read mode
  else if($_GET["action"] == "read"){

   $nomPotentiel = $_GET['nom_potentiel'];
   $prenomPotentiel = $_GET['prenom_potentiel'];

  //  Check if the name is in the database
   $sqlCheckName = "SELECT * FROM alias WHERE nom_potentiel = :nom_potentiel AND prenom_potentiel = :prenom_potentiel";
   $requestCheckName = $db->prepare($sqlCheckName);
   $attributes = array(
     ':nom_potentiel' => $_GET['nom_potentiel'], 
     ':prenom_potentiel' => $_GET['prenom_potentiel']);
   $requestCheckName = execute($attributes);
  

 }
  /**url write mode
  *http://localhost/plaquesdumatrimoine/proto_front/api.php?action=write&id_wikidata=&alias=&nom_complet=&genderLabel=&personDescription=&siteLink=&lemma= 
  */ 

  /**url read mode
   * http://localhost/plaquesdumatrimoine/proto_front/api.php?action=read&nom_potentiel=&prenom_potentiel=
   */
?>