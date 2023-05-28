<?php

namespace models;

global $session_cookie;

include "../../common/response_headers.php";
include "../../repositories/comment_repository.php";
include "../../security/verify_session.php"; # Authentication Guard

if (
    !isset($_POST['comment']) ||
    !isset($_POST['cartoonId'])
) {
    http_response_code(400);
    exit;
}


create_comment(
    $_POST['comment'],
    $_POST['cartoonId'],
    $session_cookie->username
);
http_response_code(201);
