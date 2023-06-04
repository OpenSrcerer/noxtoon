<?php

include "../../security/constants.php";

global $cookie_secret;

if (!isset($_COOKIE['noxtoon-session'])) {
    http_response_code(403);
    exit;
}

$session_cookie = json_decode($_COOKIE['noxtoon-session']);

// Unset expired cookies
if ($session_cookie->expiry < time()) {
    unset($_COOKIE['noxtoon-session']);
    setcookie('noxtoon-session', '', -1, '/');
    http_response_code(403);
    exit;
}

// Handle cookie session verification
if (!password_verify($cookie_secret, $session_cookie->session)) {
    http_response_code(403);
    exit;
}