<?php

namespace models;

include "../../common/response_headers.php";
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

http_response_code(202);