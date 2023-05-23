<?php

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
