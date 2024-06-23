<?php

declare(strict_types=1);

function is_user_wrong(bool|array $user){
    if(!$user){
        return true; 
    }
    else {
        return false;
    }
}

function invalid_email(string $email){
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        return true;
    }
    if(strlen($email) == 0){
        return false;
    }
    return false;
    
}
function get_password_byEmail(object $pdo, string $email){
    $pass = get_password($pdo,$email);
    if(!empty($pass)){
        return $pass;
    }else{
        return false;
    }
}



?>