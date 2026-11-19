<?php
// The English home is prebuilt. Reading it from disk keeps its filename off the public routing path.
$path = explode('?', $_SERVER['REQUEST_URI'] ?? '', 2)[0];
if ($path !== '/') {
    http_response_code(404);
    exit;
}

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: private, no-store');
header('Vary: Cookie');
readfile(__DIR__ . '/home.en.html');
