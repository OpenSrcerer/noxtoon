<?php

namespace models;

include "../../models/Comment.php";
include "../../db/db_utils.php";

function get_comments_by_cartoon_id(string $cartoon_id): array
{
    $comments = [];
    $sql =<<<EOF
        SELECT cs.id, ux.username, cx.id, cs.content, cs.post_date FROM
        cartoons cx
            JOIN comments cs ON cx.id = cs.cartoon_id
            JOIN users ux on cs.user_id = ux.id
        WHERE cx.id = '$cartoon_id'
        ORDER BY cs.post_date DESC
    EOF;

    [$db, $res] = exec_sql($sql);
    while ($row = pg_fetch_row($res)) {
        $comments[] = Comment::from_row($row);
    }
    pg_close($db);

    return $comments;
}

function create_comment(
    string $content,
    string $date,
    string $cartoon_id,
    string $user_id
): void {
    $sql =<<<EOF
        INSERT INTO comments (user_id, content, post_date, cartoon_id)
        VALUES ('$user_id', '$content', '$date', '$cartoon_id')
    EOF;

    [$db,] = exec_sql($sql);
    pg_close($db);
}
