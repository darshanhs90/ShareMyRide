<?php
$servername = "localhost";
$username = "darshan";
$password = "darshan";
$dbname="uber";
// Create connection
session_start();
$email=$_SESSION['user_mail'];
//$mail='asd@asd.com';
session_write_close();
$conn = mysqli_connect($servername, $username, $password,$dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
    echo "Database Connection Error";
}
else{
    if(true){
    $data = json_decode(file_get_contents("php://input"));
    $txt = mysqli_real_escape_string($conn,$data->txt);

    $sql = "INSERT into userapps(UserName,Time,Origin,Destination,Date,Month) VALUES('$UserName','$Time','$Origin','$Destination','$Date','$Month')";
    $result = $conn->query($sql);
    echo "Posted Successfully";
}
}
$conn->close();
exit();
?>