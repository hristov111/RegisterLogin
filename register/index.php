<?php
    require_once "../register_handling/register_view.php";
    require_once "../register_handling/config_session.php";
    require_once "../register_handling/login_view.php";
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="index.css">
        <script type="module" src="script.js" defer></script>
    </head>
    <body>
            <?php
                remove_login_hidden();
            ?>
        <div class="container">
            <div id="register-form" class="form-container">
                <form id="form-register" class="form" action="../register_handling/register.php" method="POST">
                    <h1>Registration</h1>
                    <div class="input-control">
                        <label for="firstname">First Name</label>
                        <input id="firstname" type="text" name="firstname">
                        <div class="error"></div>
                    </div>
                    <div class="input-control">
                        <label for="lastname">Last Name</label>
                        <input id="lastname" type="text" name="lastname">
                        <div class="error"></div>
                    </div>
                    <div class="input-control">
                        <label for="email">Email</label>
                        <input id="email" type="text" name="email">
                        <div class="error"><?php email_Errors() ?></div>
                    </div>
                    <div class="input-control">
                        <label for="password">Password</label>
                        <input id="password" type="password" name="password">
                        <div class="error"></div>
                    </div>
                    <div class="input-control">
                        <label for="password2">Repeat Password</label>
                        <input id="password2" type="password" name="password2">
                        <div class="error"></div>
                    </div>  
                    <div class="captcha-placeholder" id="register-captcha-placeholder"></div>
                    <button type="button" id="register">Sign Up</button>
                    <button type="button" class="form-button" id="for-signin">Already have account? Log in here!</button>
                </form>
            </div>
            <div id="login-form" class="form-container hidden">
                <form id="form-login" class="form" action="../register_handling/login.php" method="POST">
                    <h1>Log In</h1>
                    <div class="input-control">
                        <label for="login-email">Email</label>
                        <input id="login-email" type="text" name="email">
                        <div class="error"><?php invalid_email() ."<br>" .not_existing_email()?></div>
                    </div>
                    <div class="input-control">
                        <label for="login-password">Password</label>
                        <input id="login-password" type="password" name="password">
                        <div class="error"><?php invalid_pass()?></div>
                    </div>
                    <div class="captcha-placeholder" id="login-captcha-placeholder"></div>
                    <button type="button" id="login">Sign In</button>
                    <button type="button" class="form-button" id="for-signup">Don't have an account? Sign up here!</button>
                </form>
            </div>
        </div>
        <?php
        require_once "captcha.html";
        ?>
    </body>
</html>
