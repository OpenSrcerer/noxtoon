<?php

namespace models;

include "../../common/response_headers.php";
include "../../repositories/cartoon_repository.php";

echo json_encode(get_cartoons());

