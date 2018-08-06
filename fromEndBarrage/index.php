<?php

if(sizeof($_POST)) {
    insertInto();
} else {
    readFromDB();
}


function readFromDB () {

    $dbhost = 'localhost';
    $dbuser = 'you';
    $dbpass = '12345678';

    $conn = mysqli_connect($dbhost, $dbuser, $dbpass);
    if(! $conn ) {
    die('connect failed: ' . mysqli_error($conn));
    }
    // echo 'connect ok <br/>';
    mysqli_select_db($conn, 'db');
    $sql = 'select * from barrageA';
    $retval = mysqli_query($conn, $sql);
    if(! $retval ) {
        die('can not find the database: ' . mysqli_error($conn));
    }
    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
        echo $row['text'] .",";
    }
    mysqli_close($conn);
}

function insertInto() {
    try{
        $db = new PDO("mysql:localhost;dbname=db","you", "12345678");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->exec("use db;");                                                                                                                                                                                                                                                           
        print "Connect OK<br>";
        foreach ($_POST as $key => $value) {

            $db->exec("INSERT INTO barrageA (text) VALUES ('$value');");   
        }
        echo "insert OK";
    } catch (PDOException $e) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        print $e ->getMessage();
    }
    readFromDB();
}              
            
?>