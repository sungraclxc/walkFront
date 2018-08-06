<?php

header("Content-type:text/html;charset=utf-8");
$data = file_get_contents("content.txt");
$test = utf8_decode($data);
echo $data;

?>