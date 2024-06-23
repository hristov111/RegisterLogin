<?php

declare(strict_types=1);

function email_Errors()
{
    if(isset($_SESSION["errors_signup"])){
        $errors = $_SESSION["errors_signup"];
        // email_taken
        // email_invalid
        foreach($errors as $error){
            echo $error ."<br>";
        }

        unset($_SESSION["errors_signup"]);
    }

}

function successfully_registered(){
    // echo '<pre>';
    // print_r($_SESSION);
    // echo '<pre>';
    if(isset($_SESSION["registered"])){
        echo "<h1>Welcome to my web site ". $_SESSION["user_firstname"]. "</h1>";
    }
}