<?php

namespace models;

use JsonSerializable;

class Cartoon implements JsonSerializable
{
    private string $id;
    private string $name;
    private ?string $age;
    private ?string $gender;
    private string $description;
    private string $color;
    private string $show;
    private string $slug;
    private int $hearts;
    private int $stars;
    private string $video;

    public static function from_row(array|false $row): Cartoon {
        return new Cartoon(...$row);
    }

    /**
     * @param $id
     * @param $name
     * @param $age
     * @param $gender
     * @param $description
     * @param $color
     * @param $show
     * @param $slug
     * @param $hearts
     * @param $stars
     * @param $video
     */
    private function __construct($id, $name, $age, $gender, $description, $color, $show, $slug, $hearts, $stars, $video)
    {
        $this->id = $id;
        $this->name = $name;
        $this->age = $age;
        $this->gender = $gender;
        $this->description = $description;
        $this->color = $color;
        $this->show = $show;
        $this->slug = $slug;
        $this->hearts = $hearts;
        $this->stars = $stars;
        $this->video = $video;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'age' => $this->age,
            'gender' => $this->gender,
            'description' => $this->description,
            'color' => $this->color,
            'show' => $this->show,
            'slug' => $this->slug,
            'hearts' => $this->hearts,
            'stars' => $this->stars,
            'video' => $this->video
        ];
    }
}
