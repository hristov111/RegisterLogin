<?php

// security measures to prevent session ID leaked through URL's 
ini_set("session.use_only_cookies",1);
//Protects against session fixation atacks
ini_set("session.use_strict_mode",1);


session_set_cookie_params([
    'lifetime' => 5000000000000000,
    'domain' => 'localhost',
    'path' => '/',
    'secure' => true,
    'httponly'=>true,
]);
session_start();

// if there is a user already logged in
if(isset($_SESSION["user_id"])){
    // but the time is not set 
    if(!isset($_SESSION["last_generation"])) {
        // this is called
        regenrateSessionId_loggedIn();
    }else {
        //if the time is set.Do this
        $interval = 60 * 30; 
        // if the 30 minute is over 
        if(time() - $_SESSION["last_generation"] >= $interval){
            // generates a new session with the users id as prefix
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
    // update the current session id
    session_regenerate_id(true);
    // new time is set
    $_SESSION["last_generation"] = time();
}
function regenrateSessionId_loggedIn() {
    // this generated a new session id and removes the old one
    session_regenerate_id(true);

    $userid = $_SESSION["user_id"];
    // creates a new session_id
    $newSessionId = session_create_id();
    $session_id =$newSessionId . '_' . $userid;
    // gets or sets the current session id
    session_id($session_id);

    // time() returns the current time
    $_SESSION["last_generation"] = time();
}