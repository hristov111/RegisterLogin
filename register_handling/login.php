<?php
    if($_SERVER["REQUEST_METHOD"] == 'POST'){
        $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
        $formpassword = $_POST['password'];
        
        try{
            require_once 'dbconnection.php'; 
            require_once 'register_model.php';
            require_once 'login_controller.php';

            $errors = [];

            $user = get_user($conn,$email);
            if(is_user_wrong($user)){
                $errors["no_user"] = "Email doesn't exist!";
            }
            if(invalid_email($email)){
                $errors["email_invalid"] = "Please enter a valid email!";
            }
            $database_pass = get_password_byEmail($conn,$email);
            if(!$database_pass || !password_verify($formpassword,$database_pass)){
                $errors["invalid_emailPass"] = "Password doesn't match!";
            }

            require_once 'config_session.php';
            if($errors){
                $_SESSION["errors_login"] = $errors;
                header("Location: ../register/index.php");
                die();
            }
            $newSessionId = session_create_id();
            $session_id =$newSessionId . '_' . $user["Id"];
            session_id($session_id);

            $_SESSION["user_id"] = $user["Id"];
            $_SESSION["user_firstname"] = htmlspecialchars($user["firstName"]);
            $_SESSION["user_lastnmae"] = htmlspecialchars($user["lastName"]);
            $_SESSION["user_email"] = $user["email"];
            $_SESSION["user_password"] = $user["password"];
            $_SESSION["logged_in"] = "logged in";

            $_SESSION["last_regeneration"] = time();

            header("Location: ../home/nav.php?login=success");

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