<?php

if (!isset($_SESSION)) {
    session_start();
}
$connfile = '../config/dbconnection.php';
if (file_exists($connfile)) {
    require '../config/dbconnection.php';
    require 'Autoload.php';

    $login = new UserClass();
} else {
    header('Location: ../installer/install.php');
    exit();
}
if ($login->isLoggedIn() === true) {
    $login->logout();
} else {
    header('Location: index.php');
    exit();
}
