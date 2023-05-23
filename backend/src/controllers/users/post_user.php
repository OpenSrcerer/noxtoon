<?php

namespace models;

include "../../common/response_headers.php";
include "../../repositories/user_repository.php";
include "../../security/verify_session.php"; # Authentication Guard

if (
    !isset($_POST['username']) ||
    !isset($_POST['password'])
) {
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
// echo json_encode(get_users());