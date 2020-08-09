<?php
header("Location:../index.html");

$path = "presets.txt";
$del = fopen($path, "w");
fwrite($del, "");
fclose($del);

?>
