<?php

namespace models;

global $cookie_secret;

include "../../common/response_headers.php";
include "../../common/validate_credentials.php";
include "../../repositories/user_repository.php";
include "../../security/constants.php";

if (invalid_credentials()) {
    http_response_code(400);
    exit;
}

$create_user_success = create_user(
    $_POST['username'],
    $_POST['password']
);

if (!$create_user_success) {
    http_response_code(409);
    exit;
}

http_response_code(201);
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