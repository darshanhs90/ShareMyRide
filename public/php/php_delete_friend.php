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
    //$mail='asd@asd.com';    
    $data = json_decode(file_get_contents("php://input"));
    $UserName = mysqli_real_escape_string($conn,$data->UserName);
    $Friendname = mysqli_real_escape_string($conn,$data->Friendname);
    $sql = "DELETE from userrelations where username='$UserName' and FriendName='$FriendName'";
    $result = $conn->query($sql);
    if(mysqli_affected_rows($conn)==0){
    echo "Deletion Unsuccessful";   
    }
    else{
    echo "Deletion Successful";
}
} else {
    echo "Error while Deleting,Try Again";
}
}
$conn->close();
exit();
?>