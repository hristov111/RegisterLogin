<?php

declare(strict_types=1);

function get_email(object $pdo,string $email)
{

    $query = "SELECT email FROM user WHERE email = :email;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result;
}

function get_password(object $pdo, string $email)
{
    $query = "SELECT password FROM user WHERE email = :email";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    $result = $stmt->fetchColumn();
    return $result;

}

function get_user(object $pdo, string $email){
    $query = "SELECT * FROM user WHERE email = :email";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    $result =  $stmt->fetch(PDO::FETCH_ASSOC);
    return $result;
    
}

function set_user(object $pdo,string $firstname,string $lastname, string $email, string $password)
{

    $query = "INSERT INTO user (firstName,lastName,email,password) VALUES (:firstName,:lastName,:email, :password)";
    $stmt = $pdo->prepare($query);

    $options = [
        'cost' => 12
    ];
    $hashed_password = password_hash($password, PASSWORD_BCRYPT,$options);

    $stmt->bindParam(":firstName", $firstname);
    $stmt->bindParam(":lastName", $lastname);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $hashed_password);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result;
}




