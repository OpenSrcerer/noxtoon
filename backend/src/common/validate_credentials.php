<?php
function invalid_credentials(): bool {
    return !isset($_POST['username']) ||
        !isset($_POST['password']) ||
        strlen($_POST['username']) < 3 ||
        strlen($_POST['password'] < 6) ||
        !preg_match('/[a-z]/', $_POST['password']) ||
        !preg_match('/[A-Z]/', $_POST['password']) ||
        !preg_match('/[^a-zA-Z0-9]/', $_POST['password']);
}