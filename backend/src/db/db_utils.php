<?php

use PgSql\Connection;

$host        = "host = noxtoon-db";
$port        = "port = 5432";
$dbname      = "dbname = noxtoon";
$credentials = "user = bonkers password=bobcat";

function exec_sql($sql): array
{
    $db = @create_db_if_not_exists();

    pg_close($db); // commit transaction
    $db = connect_db();

    $result = pg_query($db, $sql);

    if (!$result) {
        pg_close($db);
        http_response_code(500);
        exit;
    }

    return [$db, $result];
}

function connect_db(): ?Connection
{
    global $host, $port, $dbname, $credentials;
    $db = pg_connect("$host $port $dbname $credentials");

    if (!$db) {
        pg_close($db);
        http_response_code(500);
        exit;
    }

    return $db;
}

function create_db_if_not_exists(): ?Connection
{
    $db = db_exists();
    if (!$db) {
        return connect_db();
    }

    // File location is relative to controller...
    $sql = file_get_contents("../../db/ddl.sql");
    pg_query($db, $sql);

    return $db;
}

function db_exists(): ?Connection
{
    $db = connect_db();
    $result = pg_query($db, 'SELECT 1 FROM cartoons LIMIT 1');

    if (!$result) {
        return $db;
    }

    pg_close($db);
    return null;
}
