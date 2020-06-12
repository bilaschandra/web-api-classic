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
    !is_string($data->UserName) &&
    !is_string($data->FirstName) &&
    !is_string($data->LastName) &&
    !is_string($data->Email) &&
    !is_string($data->isactive) &&
    !is_string($data->password)     
  ){
    echo json_encode(array("message" => "Incorrect data given" , "status" => "400"));
    return;
  }

  if ($data->password != null ){
    $password_hash = password_hash($data->password, PASSWORD_DEFAULT);  
    $query2 = "UPDATE  `tbl_user`   SET `Email`=  '$data->Email',  `FirstName`= '$data->FirstName',  `LastName`=  '$data->LastName',   `isactive`= b'$data->isactive',
              `Username` = '$data->UserName',  `Hash` =  '$password_hash'  WHERE  `UserID`= $data->UserID;";

  }
  else{
    
    $query2 = "UPDATE  `tbl_user`   SET `Email`=  '$data->Email',  `FirstName`= '$data->FirstName',  `LastName`=  '$data->LastName',   `isactive`= b'$data->isactive',
              `Username` = '$data->UserName'  WHERE  `UserID`= $data->UserID;";

  }
  
  
    $stmt2 = $conn->prepare($query2);
    if($stmt2->execute())
    {
        echo json_encode(array("message" => "User was successfully Updated.","status" => "200"));
    }
    else
    {
      echo json_encode(array("message" => "Unable to register the user." , "status" => "400"));
    }

   
?>
