<?php

include "../../security/constants.php";

global $cookie_secret;

if (
    !isset($_COOKIE['noxtoon-session']) ||
    !password_verify($cookie_secret, $_COOKIE['noxtoon-session'])
) {
    http_response_code(403);
    exit;
}