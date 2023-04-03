<?php
$DB = include '../db.php';

try {
  $stmt = $DB->prepare('SELECT color_id, red, green, blue, alpha FROM colors');

  if ($stmt->execute()) {
    $presetsAr = array();
    while ($row = $stmt->fetch()) {
      $presetsAr[] = $row;
    }
    print(json_encode($presetsAr));
  }

  $DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException  $e) {
  print('Error: ' . $e);
  exit();
}
