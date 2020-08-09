<?php
header("Location:index.html");

function httpPost($url, $data){
	$options = array(
		"http" => array(
     		"header"  => "Content-type: application/x-www-form-urlencoded\r\n",
        	"method"  => "POST",
        	"content" => http_build_query($data)
    	)
    );
	$context  = stream_context_create($options);
	return file_get_contents($url, false, $context);
}

$data = array(
    "u" => "1",
    "d" => $_POST["l"] . "," . $_POST["r"] . "," . $_POST["g"] . "," . $_POST["b"] . ",0,0,0,0,0,0,0,0,0,0,0,0"
);

$ip_server = $_SERVER["SERVER_ADDR"];
$response = httpPost("http://" . $ip_server . ":9090/set_dmx", $data);

?>
