<?php

    $text = htmlspecialchars($_GET["mail"]);
    
    $to      = 'hr@arabesque.aero';
    $subject = 'Eria.world request';
    $message = $text;
    $headers = 'X-Mailer: PHP/' . phpversion();
    // $headers = 'From: webmaster@example.com' . "\r\n" .
    //     'Reply-To: webmaster@example.com' . "\r\n" .
    //     'X-Mailer: PHP/' . phpversion();

    echo mail($to, $subject, $message, $headers);
    mail('eriateam@eria.world', $subject, $message, $headers);

?>