<?php

function get_password($pdo,$id){
    $query = "SELECT password FROM user WHERE Id = :id;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();

    $result = $stmt->fetchColumn();
    return $result;
}

function change_old_password($pdo,$password_hash, $id){
    $query = "UPDATE user SET password = :password WHERE Id = :Id;";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":Id", $id);
    $stmt->bindParam(":password", $password_hash);
    $stmt->execute();
}

