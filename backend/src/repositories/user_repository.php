<?php

use models\User;

include "../../models/User.php";
include "../../db/db_utils.php";
include "../../utils/uuid_generator.php";

function create_user(
    string $username,
    string $password,
): bool {
    if (is_username_taken($username)) {
        return false;
    }

    $generated_uuid = generate_uuidv4();
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $sql =<<<EOF
        INSERT INTO users (id, username, password_hash)
        VALUES ('$generated_uuid', '$username', '$hashed_password')
    EOF;

    [$db,] = exec_sql($sql);
    pg_close($db);

    return true;
}

//function get_users(): array
//{
//    $users = [];
//    $sql =<<<EOF
//        SELECT * FROM users;
//    EOF;
//
//    [$db, $res] = exec_sql($sql);
//    while ($row = pg_fetch_row($res)) {
//        $users[] = User::from_row($row);
//    }
//    pg_close($db);
//
//    return $users;
//}

function is_username_taken(
    string $username
): bool {
    $sql =<<<EOF
        SELECT COUNT(*) FROM users WHERE username = '$username'
    EOF;

    [$db, $res] = exec_sql($sql);
    $number_of_users_with_username = pg_fetch_row($res)[0];

    pg_close($db);

    if ($number_of_users_with_username > 0) {
        return true;
    }
    return false;
}