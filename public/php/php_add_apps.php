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
		$UserName = mysqli_real_escape_string($conn,$data->UserName);
		$Time = mysqli_real_escape_string($conn,$data->Time);
		$Origin = mysqli_real_escape_string($conn,$data->Origin);
		$Destination = mysqli_real_escape_string($conn,$data->Destination);
		$Date = mysqli_real_escape_string($conn,$data->Date);
		$Month = mysqli_real_escape_string($conn,$data->Month);
		$sql = "INSERT into userapps(UserName,Time,Origin,Destination,Date,Month) VALUES('$UserName','$Time','$Origin','$Destination','$Date','$Month')";
		$result = $conn->query($sql);
		echo "Posted Successfully";
	}
}
$conn->close();
exit();
?>