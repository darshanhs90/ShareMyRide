<?php
$servername = "localhost";
$username = "darshan";
$password = "darshan";
$dbname="uber";
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
        $EmailId = mysqli_real_escape_string($conn,$data->EmailId);
        $PicLink = mysqli_real_escape_string($conn,$data->PicLink);
        
        $sql = "INSERT into users (UserName,EmailId,PicLink) VALUES('$UserName','$EmailId','$PicLink')";
        $result = $conn->query($sql);
        echo $name.' Added Successfully as '.$reln;
    }
}
$conn->close();
exit();
?>