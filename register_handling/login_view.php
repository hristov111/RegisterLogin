<?php
function display_and_clear_error($key) {
    if (isset($_SESSION["errors_login"]) && isset($_SESSION["errors_login"][$key])) {
        echo $_SESSION["errors_login"][$key] . "<br>";
        unset($_SESSION["errors_login"][$key]);
    }


    if (empty($_SESSION["errors_login"])) {
        unset($_SESSION["errors_login"]);
    }
}

function invalid_email() {
    display_and_clear_error("email_invalid");
}

function not_existing_email() {
    display_and_clear_error("no_user");
}

function invalid_pass() {
    display_and_clear_error("invalid_emailPass");
}

function successfully_logged_in(){
    // echo "<script>console.log('hello')</script>";
    // echo '<pre>';
    // print_r($_SESSION);
    // echo '<pre>';
    if(isset($_SESSION["logged_in"])){
        echo "
        
        <h1>Welcome back " .htmlspecialchars($_SESSION["user_firstname"]). "</h1>";
    }
}

function remove_login_hidden() {
    if (isset($_SESSION["errors_login"])) {
        echo "<script>
            document.addEventListener('DOMContentLoaded', function() {
                document.getElementById('login-form').classList.remove('hidden');
                document.getElementById('register-form').classList.add('hidden');
            });
        </script>";
    }
}


?>
