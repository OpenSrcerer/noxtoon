<?php

namespace models;

include "../../common/response_headers.php";
include "../../repositories/comment_repository.php";
include "../../security/verify_session.php"; # Authentication Guard

if (!isset($_POST['cartoonId'])) {
    http_response_code(400);
    exit;
}

echo json_encode(get_comments_by_cartoon_id($_POST['cartoonId']));
