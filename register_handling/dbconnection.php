<?php

$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "users";

try {
     $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e){
    echo "Connection to the server failed: ". $e->getMessage();
}