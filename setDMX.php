<?php
header("Location:index.html");
//              Backslash must be converted to an forward slash for LINUX
include('Requests-1.7.0/library/Requests.php');
Requests::register_autoloader();


$headers = array();
$data = array(
    'u' => '1',
    'd' => $_POST['l'] . ',' . $_POST['r'] . ',' . $_POST['g'] . ',' . $_POST['b'] . ',0,0,0,0,0,0,0,0,0,0,0,0'
);

$ip_server = $_SERVER['SERVER_ADDR'];
echo $ip_server;

$response = Requests::post('http://' . $ip_server . ':9090/set_dmx', $headers, $data);


?>
