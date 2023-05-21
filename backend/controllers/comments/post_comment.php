<?php

namespace dto;

include "../../common/response_headers.php";
include "../../repositories/comment_repository.php";

if (
    !isset($_POST['userId']) ||
    !isset($_POST['comment']) ||
    !isset($_POST['date']) ||
    !isset($_POST['cartoonId'])
) {
    http_response_code(400);
    exit;
}

create_comment(
    $_POST['comment'],
    $_POST['date'],
    $_POST['cartoonId'],
    $_POST['userId']
);
http_response_code(201);
