<?php
// The parameters obtained in GET are stored in the variables
$cityname = htmlspecialchars($_GET['cityname'], ENT_HTML5);
$nom = htmlspecialchars($_GET['nom'], ENT_HTML5);
$topic = htmlspecialchars($_GET['topic'], ENT_HTML5);
$codeINSEE = htmlspecialchars($_GET['codeINSEE'], ENT_HTML5);
$sender = 'contact@alanakra.fr';
$gender = htmlspecialchars($_GET['gender'], ENT_HTML5);
$emailSender = htmlspecialchars($_GET['sender'], ENT_HTML5);
$departement = htmlspecialchars($_GET['departement'], ENT_HTML5);
$message = htmlspecialchars($_GET['message'], ENT_HTML5);
$result = htmlspecialchars($_GET['result']);

//  Check if all variable are not empty and if the value of the result is equal to 17
if((strlen($cityname) > 0) && (strlen($nom) > 0) && (strlen($topic) > 0) &&(strlen($codeINSEE) > 0) && (strlen($emailSender) > 0) && (strlen($gender)) > 0 && (strlen($message) > 0) && $result = 17){
  $subject = 'Plaques du Matrimoine : Proposition de modification du lieu '.$nom.', pour la ville de '.$cityname;
  $to = 'philippe.gambette@gmail.com';

 //  The message is send in HTML format
  $messageBody = '
  <html>
   <head>
    <title> Contribution de '.$emailSender.' pour la ville de '.$cityname.'</title>
   </head>
   <body>
   <ul>
    <li>Adresse email du possible contributeur '.$emailSender.'</li>
    <li>Genre de la personne: '.$gender.'</li>
    <li>Département du lieu: '.$departement.'</li>
    <li>Nom du lieu: '.$nom.'</li>
    <li>Type de lieu: '.$topic.'</li>
    <li>Genre de la personne: '.$gender.'</li>
   </ul>
    <p>Message: </p>
    <p>'.$message.'</p>
   </body>
  </html>
  ';

 //  Additionnals headers in an array
  
   $headers[] = 'MIME-Version: 1.0';
   $headers[] = 'From:'.$sender.'';
   $headers[] = 'Content-type: text/html; charset=utf-8';


 //  The function to send mail, the implode() function will join array element with a string
 $send = mail($to,$subject,$messageBody, implode("\r\n", $headers));

      if($send){
        $confirm = 'Votre contribution a bien été envoyée.';
       }else{
         // echo "L'envoi à échoué";
         $confirm = 'Échec de l\'envoi.';
      }
      
}else{
 //  If all input have been filled out
  $confirm = 'Merci de remplir tous les champs.';
 }
 
 // Redirect to another page with the message
 header('Location: message.php?confirm='.$confirm.'');
?>