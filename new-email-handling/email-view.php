<?php


//   $errors["email_wrong"] = "This is not your email!";

//              $errors["nosuch_email"] = "Email does not exist!";

//                $errors["email_exists"] = "Email exists. Try a new one!";

function display_and_clear($key) {
    if (isset($_SESSION["errors_email"]) && isset($_SESSION["errors_email"][$key])) {
        echo $_SESSION["errors_email"][$key];
        unset($_SESSION["errors_email"][$key]); // Unset the specific error after displaying
    }

    // If all specific errors are cleared, we can unset the whole errors array
    if (empty($_SESSION["errors_email"])) {
        unset($_SESSION["errors_email"]);
    }
}

function email_wrong() {
    display_and_clear("email_wrong");
}

function nosuch_email() {
    display_and_clear("nosuch_email");
}

function email_exists() {
    display_and_clear("email_exists");
}

function successfully_emailChanges(){
    if(isset($_SESSION["email_changed"])){
        echo "Email successfully changed!<br> Your new email is {$_SESSION["user_email"]}";
        unset($_SESSION["email_changed"]);
    }
}
