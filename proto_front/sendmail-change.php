<?php
   var_dump($_GET);
   
   $sendFrom = htmlspecialchars($_GET['sender'], ENT_NOQUOTES, UTF-8);
   $subject = 'Plaques du Matrimoine: Contribution de '.$sendFrom.' pour la ville de ';
   $message = "Message de ".$sendFrom.", Proposition de modification : ".htmlspecialchars($_GET['message']) ;
   $to = 'philippe.gambette@gmail.com';
   $send = mail($to,$subject,$message,'From : newsletter@alanakra.fr');

   if($send){
     echo "Votre envoi s'est bien passé";
   }else{
     echo "L'envoi à échoué";
   }
?>