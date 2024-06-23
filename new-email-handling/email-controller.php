<?php
declare(strict_types=1);

function email_is_wrong($pdo, $email){
    if(!get_email($pdo,$email)){
        return true;
    }
    else {
        return true;
    }
}

function set_new_email($pdo ,$id,$new_email){
    set_email($pdo ,$id,$new_email);
}

?>