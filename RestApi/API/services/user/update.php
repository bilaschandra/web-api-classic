<?php
// Include global functions
include_once '../../configration/database.php';
include_once '../../objects/user.php';



$data = json_decode(file_get_contents("php://input"));

$database = new Database();
$conn     = $database->getConnection();

// CONTROL


$user = new User($conn);

// make sure data is not empty
if (
  
    is_string($data->UserName) &&
    is_string($data->FirstName) &&
    is_string($data->LastName) &&
    is_string($data->Email) &&  
    is_string($data->UserID) 
  ) {

 
        $user->UserName   = $data->UserName  ;
        $user->LastName   = $data->LastName  ;
        $user->FirstName  = $data->FirstName ;
        $user->Email  = $data->Email ;
        $user->ImageURL   = $data->ImageURL  ;

        if (!empty($data->password)) {
            $password_hash = password_hash($data->password, PASSWORD_DEFAULT);
            $user->Hash = $password_hash;
        }

    // create the product
    if ($user->updateuser($data->UserID)) {
        
        http_response_code(200);
    } else {
        
        http_response_code(503);
        
        echo json_encode(array(
            "message" => "Unable to create order."
        ));
    }
}

else {
    
    http_response_code(400);
    echo json_encode(array(
        "message" => "Unable to create order. Data is incomplete."
    ));
}

?>