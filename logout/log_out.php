<?php

require_once '../register_handling/config_session.php';

$_SESSION = array();

if(ini_get("session.use_cookier")){
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time()- 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]

            );
}

session_destroy();


session_regenerate_id();

header("Location: ../register/index.php");
