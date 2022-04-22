<?php
require_once 'libs/Mobile_Detect.php';
$detect = new Mobile_Detect;
 
// Any mobile device (phones or tablets).
if ( $detect->isMobile() || $detect->isTablet()) {
    require_once 'mobile.html';
}else{
    require_once 'desktop.html';
}

?>