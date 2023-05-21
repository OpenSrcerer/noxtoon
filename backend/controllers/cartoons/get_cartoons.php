<?php

namespace dto;

include "../../common/response_headers.php";
include "../../repositories/cartoon_repository.php";

echo json_encode(get_cartoons());

