<?php

namespace models;

include "../../common/response_headers.php";
include "../../repositories/cartoon_repository.php";
include "../../security/verify_session.php"; # Authentication Guard

echo json_encode(get_cartoons());

