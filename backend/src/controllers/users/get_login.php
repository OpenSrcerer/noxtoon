<?php

namespace models;

global $cookie_secret;

include "../../common/response_headers.php";
include "../../common/validate_credentials.php";
include "../../security/constants.php";
include "../../repositories/user_repository.php";

if (invalid_credentials()) {
    http_response_code(400);
    exit;
}

if (!is_login_match(
    $_POST['username'],
    $_POST['password']
)) {
    http_response_code(403);
    exit;
}

http_response_code(200);
setcookie( // Cookie that expires in 1 hour
    "noxtoon-session",
    json_encode(array(
        "username" => $_POST['username'],
        "session" => password_hash($cookie_secret, PASSWORD_BCRYPT),
        "expiry" => time() + 60 * 60
    )),
    time() + 60 * 60,
    "/"
);