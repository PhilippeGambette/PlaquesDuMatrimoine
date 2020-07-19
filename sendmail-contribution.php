<?php

  // The parameters obtained in POST are stored in the variables
   $cityname = htmlspecialchars($_POST['cityname'], ENT_HTML5);
   $departement = htmlspecialchars($_POST['departement'], ENT_HTML5);
   $nom = htmlspecialchars($_POST['nom'], ENT_HTML5);
   $topic = htmlspecialchars($_POST['topic'], ENT_HTML5);
   $sender = htmlspecialchars($_POST['sender'], ENT_HTML5);
   $gender = htmlspecialchars($_POST['gender'], ENT_HTML5);
   $message = htmlspecialchars($_POST['message'], ENT_HTML5);
   $result = htmlspecialchars($_POST['result']);
   
  //  Check if all variable are not empty and if the value of the result is equal to 17
   if((strlen($cityname) > 0) && (strlen($nom) > 0) && (strlen($topic) > 0) && (strlen($departement) > 0) && (strlen($sender) > 0) && (strlen($gender)) > 0 && (strlen($message) > 0) && $result = 17){
     $subject = 'Plaques du Matrimoine: Contribution de '.$sender.' pour la ville de '.$cityname;
     $to = 'philippe.gambette@gmail.com';

    //  The message is send in HTML format
     $messageBody = '
     <html>
      <head>
       <title> Contribution de '.$sender.' pour la ville de '.$cityname.'</title>
      </head>
      <body>
      <ul>
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
           $confirm = 'Votre contribution à bien été envoyé';
          }else{
            // echo "L'envoi à échoué";
            $confirm = 'Echec de l\'envoi';
         }
         
   }else{
    //  If all input have been filled out
     $confirm = 'Merci de remplir tous les champs';
    }
    
    // Redirect to another page with the message
    header('Location: message.php?confirm='.$confirm.'');

?>