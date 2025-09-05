<?php
include("./src/controller.php"); // Σκέτη / σε path είναι το root path του σέρβερ 

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $action = htmlspecialchars($_GET['action']); // htmlspecialchars μετατρέπει ό,τι βάλει ο χρήστης ως String για να μην εκτελλεί κακόβουλο input
    $action = str_replace('auth-button-', '', $action);
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $action = htmlspecialchars($_POST['action']);
}

$controller = new Controller();
$controller->setRequestMethod($_SERVER['REQUEST_METHOD']);
$controller->$action();

