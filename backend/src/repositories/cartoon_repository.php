<?php

namespace models;

include "../../models/Cartoon.php";
include "../../db/db_utils.php";

function get_cartoons(): array
{
    $cartoons = [];
    $sql =<<<EOF
        SELECT * FROM cartoons;
    EOF;

    [$db, $res] = exec_sql($sql);
    while ($row = pg_fetch_row($res)) {
        $cartoons[] = Cartoon::from_row($row);
    }
    pg_close($db);

    return $cartoons;
}

function get_cartoon_by_slug($slug): ?Cartoon
{
    $sql =<<<EOF
        SELECT * FROM cartoons WHERE slug = '$slug';
    EOF;

    [$db, $res] = exec_sql($sql);
    $row = pg_fetch_row($res);
    if ($row) {
        return Cartoon::from_row($row);
    }
    pg_close($db);

    return null;
}

function patch_cartoon_hearts($cartoon_id, $hearts): void
{
    $sql =<<<EOF
        UPDATE CARTOONS SET hearts = (hearts + '$hearts') WHERE id = '$cartoon_id';
    EOF;

    [$db,] = exec_sql($sql);
    pg_close($db);
}

function patch_cartoon_stars($cartoon_id, $stars): void
{
    $sql =<<<EOF
        UPDATE CARTOONS SET stars = (stars + '$stars') WHERE id = '$cartoon_id';
    EOF;

    [$db,] = exec_sql($sql);
    pg_close($db);
}
