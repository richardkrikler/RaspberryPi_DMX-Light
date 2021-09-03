<?php
header("Location:../index.html");

$DB = include "../db.php";

$red = $_POST["red"];
$green = $_POST["green"];
$blue = $_POST["blue"];
$alpha = $_POST["alpha"];

try {
  $stmt = $DB->prepare("INSERT INTO colors (red, green, blue, alpha) VALUE (:red, :blue, :green, :alpha)");
  $stmt->bindParam(":red", $red, PDO::PARAM_INT);
  $stmt->bindParam(":green", $green, PDO::PARAM_INT);
  $stmt->bindParam(":blue", $blue, PDO::PARAM_INT);
  $stmt->bindParam(":alpha", $alpha, PDO::PARAM_STR);
  $stmt->execute();
  $DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException  $e) {
  echo "Error: " . $e;
  exit();
}
