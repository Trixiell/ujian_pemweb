<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todo_app";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_POST['id'];
$newTask = $_POST['task'];

$sql = "UPDATE tasks SET task='$newTask' WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "Task updated successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
