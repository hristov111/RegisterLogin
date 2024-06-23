<?php

declare(strict_types=1);

function is_email_invalid(string $email){
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        return true;
    }else {
        return false;
    }
}
function is_email_taken(object $pdo,string $email)
{
    if(get_email($pdo,$email)){
        return true;
    }else {
        return false;
    }

}

function create_user(object $pdo,string $firstname,string $lastname, string $email, string $password)
{
    set_user( $pdo, $firstname, $lastname,  $email, $password);
}

