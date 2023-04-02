<?php
$DB;

try {
    // Create a new Database Object for sqlite
    $DB = new PDO('sqlite:raspi-dmx.db');

    // because we have default errormode_silent we change to ERRMODE_EXCEPTION
    $DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Error: ' . $e;
    exit();
}

return $DB;
