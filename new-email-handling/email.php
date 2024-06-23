<?php
    require_once '../register_handling/config_session.php';
    if($_SERVER["REQUEST_METHOD"] == 'POST' && isset($_SESSION["user_email"])){
        $current_email_input = filter_input(INPUT_POST, 'email1', FILTER_SANITIZE_EMAIL);
        $new_email_input = filter_input(INPUT_POST, 'email2', FILTER_SANITIZE_EMAIL);
        $user_currentEmail = $_SESSION["user_email"];

        try{
            require_once '../register_handling/dbconnection.php'; 
            require_once '../new-email-handling/email-model.php';
            require_once '../new-email-handling/email-controller.php';

            $errors = [];

            // check if the user gave his email right
            if($user_currentEmail != $current_email_input){
                $errors["email_wrong"] = "This is not your email!";
            }

            // First check if the current email exists in the database
            if(!email_is_wrong($conn,$current_email_input)){
                $errors["nosuch_email"] = "Email does not exist!";
            }


            // Second check if the second email doesn't exist in the database
            if(!email_is_wrong($conn, $new_email_input)){
                $errors["email_exists"] = "Email exists. Try a new one!";

            }

            
            if($errors){
                $_SESSION["errors_email"] = $errors;
                header("Location: ../home/settings.php");
                die();
            }
            set_new_email($conn,$_SESSION["user_id"], $new_email_input);
            $_SESSION["user_email"] = $new_email_input;
            $_SESSION["email_changed"] = "successfull";

            header("Location: ../home/settings.php?change_email=success");

            $conn = null;
            $stmt = null;
            die();

        }
        catch(PDOException $e){
            die("Query failed ".$e->getMessage());
        }
       



    }
    else {
        header("Location: ../home/settings.php");
        die();
    }