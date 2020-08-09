<?php

$ip_server = $_SERVER["SERVER_ADDR"];
$json = file_get_contents("http://" . $ip_server . ":9090/get_dmx?u=1");
echo $json;

?>