<?php

declare(strict_types=1);


function get_email($pdo, $email)
{
    $query = "SELECT email FROM user WHERE email = :email;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result;
}

function set_email($pdo ,$id,$new_email){
    $query = "UPDATE user SET email = :email WHERE Id = :Id;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":email", $new_email);
    $stmt->bindParam(":Id", $id);
    $stmt->execute();
}