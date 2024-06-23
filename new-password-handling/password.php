<?php
    require_once '../register_handling/config_session.php';
    if($_SERVER["REQUEST_METHOD"] == 'POST' && isset($_SESSION["user_id"])){
        $current_password_input =  $_POST['current_password'];
        $new_password =  $_POST['new_password'];

        try{
            require_once '../register_handling/dbconnection.php'; 
            require_once '../new-password-handling/password-model.php';
            require_once '../new-password-handling/password-controller.php';

            $errors = [];

            $user_id = $_SESSION["user_id"];

           //1. First check if current_password_input is in the database
           // if it isnt display an error
            $db_pass = check_password($conn, $user_id);
            echo $db_pass;
            if(empty($db_pass) || !password_verify($current_password_input, $db_pass)){
                $errors["wrong_pass"] = "Wrong password!";
            }
                
            if($errors){
                $_SESSION["errors_password"] = $errors;
                header("Location: ../home/settings.php");
                die();
            }
            //2. Change the current_passw with the new password
            $options = [
                'cost' => 12
            ];
            $hashed_password = password_hash($new_password, PASSWORD_BCRYPT,$options);
            change_password($conn, $hashed_password, $user_id);
            // Change the session details
            $_SESSION["user_password"] = $hashed_password;
            $_SESSION["password_changed"] = "Password Changed successfully!";


            header("Location: ../home/settings.php?change_pass=success");

            $conn = null;
            $stmt = null;
            die();

        }
        catch(PDOException $e){
            die("Query failed ".$e->getMessage());
        }
       



    }
    else {
        //   echo '<pre>';
        //  print_r($_SESSION);
        //  echo '<pre>';
        header("Location: ../home/settings.php");
        die();
    }