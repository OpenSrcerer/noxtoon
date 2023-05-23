<?php

namespace models;

use JsonSerializable;

class User implements JsonSerializable
{
    private string $id;
    private string $username;
    private string $password_hash;

    public static function from_row(array|false $row): User {
        return new User(...$row);
    }

    /**
     * @param int $id
     * @param string $username
     * @param string $password_hash
     */
    private function __construct(string $id, string $username, string $password_hash)
    {
        $this->id = $id;
        $this->username = $username;
        $this->password_hash = $password_hash;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'passwordHash' => $this->password_hash
        ];
    }
}