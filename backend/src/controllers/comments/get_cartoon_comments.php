<?php

namespace dto;

include "../../common/response_headers.php";
include "../../repositories/comment_repository.php";

if (!isset($_POST['cartoonId'])) {
    http_response_code(400);
    exit;
}

echo json_encode(get_comments_by_cartoon_id($_POST['cartoonId']));
