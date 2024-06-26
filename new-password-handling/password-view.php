<?php 



function display_and_clear2($key) {
    if (isset($_SESSION["errors_password"]) && isset($_SESSION["errors_password"][$key])) {
        echo $_SESSION["errors_password"][$key];
        unset($_SESSION["errors_password"][$key]); 
    }

    if (empty($_SESSION["errors_password"])) {
        unset($_SESSION["errors_password"]);
    }
}

function password_wrong() {
    display_and_clear2("wrong_pass");
}

function successfully_passwordChanged(){
    if(isset($_SESSION["password_changed"])){
        echo $_SESSION["password_changed"];
        unset($_SESSION["password_changed"]);
    }
}