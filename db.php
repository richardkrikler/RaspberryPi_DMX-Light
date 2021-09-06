<?php
$server = "db";
$dbname = "raspberrypi_dmx";
$username = "root";
$password = "yourPassword";
$DB;

try {
    // Create a new Database Object for mysql
    // Connect with: Server, User, Password, Database
    $DB = new PDO("mysql:host=$server;dbname=$dbname", $username, $password);

    // because we have default errormode_silent we change to ERRMODE_EXCEPTION
    $DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error: " . $e;
    exit();
}

return $DB;

