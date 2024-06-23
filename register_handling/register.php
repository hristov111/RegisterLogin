<?php
    if($_SERVER["REQUEST_METHOD"] == 'POST'){
        $firstname = htmlspecialchars($_POST['firstname'], ENT_QUOTES, 'UTF-8');
        $lastname = htmlspecialchars($_POST['lastname'] ,ENT_QUOTES, 'UTF-8');
        $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
        $formpassword = $_POST['password'];
        $password2 = $_POST['password2'];
        
        try{
            require_once 'dbconnection.php'; 
            require_once 'register_model.php';
            require_once 'register_controller.php';

            $errors = [];


            if(is_email_invalid($email)){
                $errors["email_invalid"] = "Email is Invalid!";
            }
            if(is_email_taken($conn,$email)){
                $errors["email_taken"] = "Email is already taken";
            }

            require_once 'config_session.php';
            if($errors){
                $_SESSION["errors_signup"] = $errors;
                header("Location: ../register/index.php");
                die();
            }
            create_user( $conn, $firstname, $lastname,  $email,  $formpassword);
            $user = get_user($conn, $email);

            $newSessionId = session_create_id();
            $session_id =$newSessionId . '_' . $user["Id"];
            session_id($session_id);

            $_SESSION["user_id"] = $user["Id"];
            $_SESSION["user_firstname"] = htmlspecialchars($user["firstName"]);
            $_SESSION["user_lastnmae"] = htmlspecialchars($user["lastName"]);
            $_SESSION["user_email"] = $user["email"];
            $_SESSION["user_password"] = $user["password"];
            $_SESSION["registered"] = "registered";

            $_SESSION["last_regeneration"] = time();

            header("Location: ../home/nav.php?signup=success");

            $conn = null;
            $stmt = null;
            die();

        }
        catch(PDOException $e){
            die("Query failed ".$e->getMessage());
        }
       



    }
    else {
        header("Location: ../register/index.html");
        die();
    }
