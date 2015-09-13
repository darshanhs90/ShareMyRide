<?php
$servername = "localhost";
$username = "darshan";
$password = "darshan";
$dbname="uber";
// Create connection
$conn = mysqli_connect($servername, $username, $password,$dbname);
// Check connection
if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
	echo "Database Connection Error";
}
else{
	if(true){
		$data = json_decode(file_get_contents("php://input"));
		$UserName = $_POST["UserName"];//mysqli_real_escape_string($conn,$data->UserName);
		$sql = "SELECT * FROM users ";

		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			$outp = "[";
			while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
				if ($outp != "[") {$outp .= ",";}
				$outp .= '{"UserName":"'  . $rs["UserName"].'",';
				$outp .= '"Emailid":"'  . $rs["Emailid"].'",';
				$outp .= '"PicLink":"'   . $rs["PicLink"]. '"}';
			}
			$outp .="]";
			echo($outp);
		} else {
			echo "0 results";
		}
	}
}
$conn->close();
exit();
?>