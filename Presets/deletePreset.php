<?php
$DB = include "../db.php";

$json_data = file_get_contents('php://input');
$color_obj = json_decode($json_data);

try {
  $stmt = $DB->prepare("DELETE FROM colors WHERE (red = :red) AND (green = :green) AND (blue = :blue) AND (alpha = :alpha)");
  $stmt->bindParam(":red", $color_obj->red, PDO::PARAM_INT);
  $stmt->bindParam(":green", $color_obj->green, PDO::PARAM_INT);
  $stmt->bindParam(":blue", $color_obj->blue, PDO::PARAM_INT);
  $stmt->bindParam(":alpha", $color_obj->alpha, PDO::PARAM_STR);

  $stmt->execute();

  $DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException  $e) {
  print("Error: " . $e);
  exit();
}
