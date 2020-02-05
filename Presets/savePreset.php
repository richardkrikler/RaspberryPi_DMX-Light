<?php
header("Location:../index.html");

$preset = $_POST['preset'];
$path = 'presets.txt';

$fp = fopen($path, 'a');
fwrite($fp, $preset . "\n");
fclose($fp);

?>
