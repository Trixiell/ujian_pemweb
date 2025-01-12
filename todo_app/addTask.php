<?php
$servername = "localhost";
$username = "root"; // Ganti sesuai username MySQL Anda
$password = ""; // Ganti sesuai password MySQL Anda
$dbname = "todo_app";

// Koneksi ke database
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$task = $_POST['task'];

$sql = "INSERT INTO tasks (task) VALUES ('$task')";

if ($conn->query($sql) === TRUE) {
    echo "Task added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
