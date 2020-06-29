<?php
   var_dump($_GET);
   $sendFrom = htmlspecialchars($_GET['sender'], ENT_NOQUOTES, UTF-8);
   $subject = 'Contribution de '.$sendFrom.' pour la ville de ';
   $message = htmlspecialchars($_GET['message']) ;
   $to = 'newsletter@alanakra.fr';
   $send = mail($to,$subject,$message,'From:'.$sendFrom.'');

   if($send){
     echo "Votre envoi s'est bien passé";
   }else{
     echo "L'envoi à échoué";
   }
?>