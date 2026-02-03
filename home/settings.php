<?php
    require_once "nav.php";
    require_once "../register_handling/config_session.php";
    require_once "../new-email-handling/email-view.php";
    require_once "../new-password-handling/password-view.php";
    if(!isset($_SESSION["user_id"])){
        header("Location: ../register/index.php");
        exit();
    }
?> 



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../home/global-body.css">
    <link rel="stylesheet" href="../register/index.css">
    <link rel="stylesheet" href="../home/setting.css">
    <link rel="stylesheet" href="nav.css">
    <title>Settings</title>
</head>
<body>
    <h1 id="email-text">Change email or password</h1>
    <div id="settings-form" class="settings-container">
        <form action="../new-email-handling/email.php" method="POST" class="form" id="email-form">
            <div class="input-control">
                <label for="email1">Enter current Email</label>
                <input id="email1" type="email"name="email1">
                <div class="error"><?php email_wrong() ." or " .nosuch_email() ?></div>
            </div>
            <div class="input-control">
                <label for="">Enter the new email</label>
                <input id="email2" type="email" name="email2">
                <div class="error"><?php  email_exists()?></div>
            </div>
            <div class="captcha-placeholder" id="email-captcha-placeholder"></div>
            <button type="button" id="email-button">Change email</button>
            <div class="new_cred">
                <div class="success"><?php successfully_emailChanges()?></div>
            </div>
        </form>
        <form action="../new-password-handling/password.php" method="POST" class="form" id="password-form">
            <div class="input-control">
                <label for="current_password">Enter current password</label>
                <input type="password" name="current_password" id="current_password">
                <div class="error"><?php password_wrong() ?></div>
            </div>
            <div class="input-control">
                <label for="new_password">New password</label>
                <input type="password" name="new_password" id="new_password">
                <div class="error"></div>
            </div>
            <div class="input-control">
                <label for="password2">Repeat new password</label>
                <input type="password" name="password2" id="password2">
                <div class="error"></div>
            </div>
            <div class="captcha-placeholder" id="password-captcha-placeholder"></div>
            <button type="button" id="password-button">Change password</button>
            <div class="new_cred">
                <div class="success"><?php successfully_passwordChanged()?></div>
            </div>
        </form>
    </div>
    <?php
        require_once "../register/captcha.html";
        ?>
    </body>
    <script  type="module" src="settings.js" defer></script>
</body>
</html>
