<?php
    // Include global functions
    include_once '../../configration/database.php';
    require "../../utilities/vendor/autoload.php";
    use \Firebase\JWT\JWT; 
     
  
  header("Access-Control-Allow-Origin: * ");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


  
  $database = new Database();
  $conn = $database->getConnection();
  $jsonData = rtrim(file_get_contents("php://input"), "\0");
  $data = json_decode($jsonData);
  // CONTROL

  if(
    !is_string($data->username) &&
    !is_string($data->password) &&
    !is_string($data->email)
  ){
    echo json_encode(array("message" => "Incorrect data given" , "status" => "400"));
    return;
  }

// Check if user is alrdy in db
$query = "SELECT Username
        FROM tbl_user
        WHERE Username = :username;
        ";

$stmt = $conn->prepare($query);
$username=htmlspecialchars(strip_tags($data->username));
$stmt->bindParam(':username', $username);

$stmt->execute();

if($stmt->rowCount() > 0){

    echo json_encode(array("message" => "Username unavailable.", "status" => "409"));
    exit();
}

// Check if email is alrdy in db
$query2 = "SELECT Email
        FROM tbl_user
        WHERE Email = :email;
        ";

$stmt2 = $conn->prepare($query2);
$email=htmlspecialchars(strip_tags($data->email));
$stmt2->bindParam(':email', $email);

$stmt2->execute();

if($stmt2->rowCount() > 0){

    echo json_encode(array("message" => "Email unavailable.", "status" => "409"));
    exit();
}

  // INSERT

  $query2 = "INSERT INTO tbl_user
                  (Username, Hash, Email, FirstName , LastName)
                  VALUES
                  (:username, :password, :email , :firstname , :lastname);";

  $stmt2 = $conn->prepare($query2);

  $stmt2->bindParam(':username', $data->username);
  $stmt2->bindParam(':email', $data->email);
  $password_hash = password_hash($data->password, PASSWORD_DEFAULT);
  $stmt2->bindParam(':password', $password_hash);  
  $stmt2->bindParam(':firstname', $data->firstname);
  $stmt2->bindParam(':lastname', $data->lastname);


    if($stmt2->execute()){
      $id = $conn->lastInsertId(); 
       echo json_encode(array("message" => "User was successfully registered.", 
                              "status" => "200",
                              "ID" => $id
                              ));
  }
  else{

      echo json_encode(array("message" => "Unable to register the user." , "status" => "400"));
  }

   
?>
