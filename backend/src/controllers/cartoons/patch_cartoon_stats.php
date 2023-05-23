<?php

namespace models;

include "../../common/response_headers.php";
include "../../repositories/cartoon_repository.php";
include "../../security/verify_session.php"; # Authentication Guard

if (
    (!isset($_POST['hearts']) && !isset($_POST['likes'])) ||
    (isset($_POST['hearts']) && isset($_POST['likes'])) ||
    !isset($_POST['cartoonId'])
) {
    http_response_code(400);
    exit;
}

if (isset($_POST['hearts'])) {
    patch_cartoon_hearts($_POST['cartoonId'], $_POST['hearts']);
}

if (isset($_POST['likes'])) {
    patch_cartoon_stars($_POST['cartoonId'], $_POST['likes']);
}
