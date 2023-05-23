<?php

namespace models;

use JsonSerializable;

class Comment implements JsonSerializable
{
    private int $id;
    private string $username;
    private string $cartoon_id;
    private string $content;
    private string $date;

    public static function from_row(array|false $row): Comment {
        return new Comment(...$row);
    }

    /**
     * @param int $id
     * @param string $username
     * @param string $cartoon_id
     * @param string $content
     * @param string $date
     */
    private function __construct(int $id, string $username, string $cartoon_id, string $content, string $date)
    {
        $this->id = $id;
        $this->username = $username;
        $this->cartoon_id = $cartoon_id;
        $this->content = $content;
        $this->date = $date;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'cartoonId' => $this->cartoon_id,
            'comment' => $this->content,
            'date' => $this->date
        ];
    }
}
