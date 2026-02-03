<?php
    require_once "../register_handling/register_view.php";
    require_once "../register_handling/config_session.php";
    require_once "../register_handling/login_view.php";
    if(!isset($_SESSION["user_id"])){
        header("Location: ../register/index.php");
        exit();
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="../home/global-body.css">
        <link rel="stylesheet" href="../home/nav.css">
    </head>
    <body>
        <div class="container">
            <?php successfully_logged_in(); successfully_registered();?>
            <nav class="nav">
                <a href="nav.php">Home</a>
                <a href="settings.php">Settings</a>
                <a href="../logout/log_out.php">Log out</a>
            </nav>
        </div>
    </body>
</html>