<?php
$DB = include "../db.php";

$json_data = file_get_contents('php://input');
$color_obj = json_decode($json_data);

try {
  $stmt = $DB->prepare("SELECT COUNT(pk_color_id) AS equal_colors FROM colors WHERE (red = :red) AND (green = :green) AND (blue = :blue) AND (alpha = :alpha)");
  $stmt->bindParam(":red", $color_obj->red, PDO::PARAM_INT);
  $stmt->bindParam(":green", $color_obj->green, PDO::PARAM_INT);
  $stmt->bindParam(":blue", $color_obj->blue, PDO::PARAM_INT);
  $stmt->bindParam(":alpha", $color_obj->alpha, PDO::PARAM_STR);

  if ($stmt->execute()) {
    $equal_colors = $stmt->fetch();
    if ($equal_colors[0] == 0) {
      try {
        $stmt = $DB->prepare("INSERT INTO colors (red, green, blue, alpha) VALUE (:red, :green, :blue, :alpha)");
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
    } else {
      print("Color already exists!");
    }
  }

  $DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException  $e) {
  print("Error: " . $e);
  exit();
}
