<?php

namespace models;

include "../../common/response_headers.php";
include "../../repositories/cartoon_repository.php";

if (!isset($_POST['slug'])) {
    http_response_code(400);
    exit;
}

$cartoon = get_cartoon_by_slug($_POST['slug']);
if (!$cartoon) {
    http_response_code(404);
    exit;
}

echo json_encode($cartoon);
