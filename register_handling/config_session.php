<?php

ini_set("session.use_only_cookies",1);
ini_set("session.use_strict_mode",1);


session_set_cookie_params([
    'lifetime' => 5000000000000000,
    'domain' => 'localhost',
    'path' => '/',
    'secure' => true,
    'httponly'=>true,
]);
session_start();

if(isset($_SESSION["user_id"])){
    if(!isset($_SESSION["last_generation"])) {
        regenrateSessionId_loggedIn();
    }else {
        $interval = 60 * 30; 
        if(time() - $_SESSION["last_generation"] >= $interval){
            regenrateSessionId_loggedIn();
    
        }
    }
}else{
    if(!isset($_SESSION["last_generation"])) {
        regenrateSessionId();
    }else {
        $interval = 60 * 30; 
        if(time() - $_SESSION["last_generation"] >= $interval){
            regenrateSessionId();
    
        }
    }
}

function regenrateSessionId() {
    session_regenerate_id(true);
    $_SESSION["last_generation"] = time();
}
function regenrateSessionId_loggedIn() {
    session_regenerate_id(true);

    $userid = $_SESSION["user_id"];
    $newSessionId = session_create_id();
    $session_id =$newSessionId . '_' . $userid;
    session_id($session_id);

    $_SESSION["last_generation"] = time();
}