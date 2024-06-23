<?php 



function display_and_clear2($key) {
    if (isset($_SESSION["errors_password"]) && isset($_SESSION["errors_password"][$key])) {
        echo $_SESSION["errors_password"][$key];
        unset($_SESSION["errors_password"][$key]); // Unset the specific error after displaying
    }

    // If all specific errors are cleared, we can unset the whole errors array
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