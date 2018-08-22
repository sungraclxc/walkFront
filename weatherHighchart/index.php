<?php

/*header("Content-type:text/html;charset=utf-8");
$data = file_get_contents("content.txt");
$test = utf8_decode($data);
echo $data;*/

$host = "https://jisutqybmf.market.alicloudapi.com";
    $path = "/weather/query";
    $method = "GET";
    $appcode = "9df720752ae74cdba420f38d9ccc9a4c";
    $headers = array();
    array_push($headers, "Authorization:APPCODE " . $appcode);
    $querys = "city=%E5%AE%89%E9%A1%BA&citycode=citycode&cityid=cityid&ip=ip&location=location";
    $bodys = "";
    $url = $host . $path . "?" . $querys;

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_FAILONERROR, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HEADER, true);
    if (1 == strpos("$".$host, "https://"))
    {
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    }
    $answer = curl_exec($curl);
    $pos = stripos($answer, "{");
    $result = substr($answer, $pos);
    //var_dump($result);
    echo $result

?>