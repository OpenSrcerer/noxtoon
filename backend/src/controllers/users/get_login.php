<?php

namespace models;

global $cookie_secret;

include "../../common/response_headers.php";
include "../../security/constants.php";
include "../../repositories/user_repository.php";

if (
    !isset($_POST['username']) ||
    !isset($_POST['password'])
) {
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
    password_hash($cookie_secret, PASSWORD_BCRYPT),
    time() + 60 * 60,
    "/"
);