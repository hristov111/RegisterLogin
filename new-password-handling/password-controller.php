<?php


function check_password($pdo, $id){
    $db_pass = get_password($pdo, $id);
    if($db_pass){
        return $db_pass;
    }
    return false;
}

function change_password($pdo, $password, $id){
    change_old_password($pdo, $password, $id);
}