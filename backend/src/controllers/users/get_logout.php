<?php
include "../../common/response_headers.php";

unset($_COOKIE['noxtoon-session']);
setcookie('noxtoon-session', '', -1, '/');
http_response_code(200);
exit;