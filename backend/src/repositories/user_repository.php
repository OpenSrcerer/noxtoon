<?php

use models\User;

include "../../models/User.php";
include "../../db/db_utils.php";
include "../../utils/uuid_generator.php";

function create_user(
    string $username,
    string $password,
): bool
{
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

// returns a session token JWT
function authenticate(
    string $username,
    string $password
): string|false {
    if (!is_login_match($username, $password)) {
        http_response_code(403);
        exit;
    }

    return "";
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

function is_login_match(
    string $username,
    string $password
): bool
{
    if (!is_username_taken($username)) {
        http_response_code(404);
        exit;
    }

    $sql =<<<EOF
        SELECT password_hash FROM users WHERE username = '$username'
    EOF;

    [$db, $res] = exec_sql($sql);
    $password_hash = pg_fetch_row($res)[0];

    pg_close($db);

    return password_verify($password, $password_hash);
}

function is_username_taken(
    string $username
): bool
{
    $sql =<<<EOF
        SELECT COUNT(*) FROM users WHERE username = '$username'
    EOF;

    [$db, $res] = exec_sql($sql);
    $number_of_users_with_username = pg_fetch_row($res)[0];

    pg_close($db);

    return $number_of_users_with_username > 0;
}

function get_user_by_username(
    string $username
): User {
    $sql =<<<EOF
        SELECT * FROM users WHERE username = '$username'
    EOF;

    [$db, $res] = exec_sql($sql);
    $user = User::from_row(pg_fetch_row($res));

    pg_close($db);

    return $user;
}