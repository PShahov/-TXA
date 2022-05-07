<?php

    $text = htmlspecialchars($_GET["mail"]);
    
    $to      = 'hr@arabesque.aero';
    $subject = 'Резюме';
    $message = $text;
    $headers = 'X-Mailer: PHP/' . phpversion();
    // $headers = 'From: webmaster@example.com' . "\r\n" .
    //     'Reply-To: webmaster@example.com' . "\r\n" .
    //     'X-Mailer: PHP/' . phpversion();

    echo mail($to, $subject, $message, $headers);
    mail('bot@somedude.ru', $subject, $message, $headers);

?>