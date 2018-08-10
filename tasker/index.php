<?php

// read all information of the task;
readFromDB();
function readFromDB () {

    // connect to mysql.
    $dbhost = 'localhost';
    $dbuser = 'you';
    $dbpass = '12345678';

    $conn = mysqli_connect($dbhost, $dbuser, $dbpass);
    if(! $conn ) {
    die('connect failed: ' . mysqli_error($conn));
    }
    //echo 'connect ok <br/>';
    mysqli_select_db($conn, 'db');
    
    // get corresponding information from every tables;
    // get task_id, name and status
    $sql = 'select id, task_name, label_name, status  
                from tasks, labels, label_task, status 
                where tasks.id = label_task.for_task and labels.label_name = label_task.for_label and tasks.id = status.status_id;';
    $retval = mysqli_query($conn, $sql);
    if(! $retval ) {
        die('can not find the database: ' . mysqli_error($conn));
    }
    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
        echo $row['id'] ."," .
        $row['task_name'] . ",". 
        $row['status'].",".
        $row['label_name'] ."<br>";
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