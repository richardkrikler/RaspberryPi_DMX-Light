<?php
header('Access-Control-Allow-Origin: *');

$json_data = file_get_contents('php://input');
$color_obj = json_decode($json_data);
$data = array(
	'u' => '1',
	'd' => $color_obj->alpha . ',' . $color_obj->red . ',' . $color_obj->green . ',' . $color_obj->blue . ',0,0,0,0,0,0,0,0,0,0,0,0'
);

$ip_server = $_SERVER['SERVER_NAME'];
$url = 'http://' . $ip_server . ':9090/set_dmx';

$options = array(
	'http' => array(
		'header'  => 'Content-type: application/x-www-form-urlencoded\r\n',
		'method'  => 'POST',
		'content' => http_build_query($data)
	)
);
$context  = stream_context_create($options);
file_get_contents($url, false, $context);
