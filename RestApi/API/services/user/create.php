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
if (is_string($data->UserID)  && !empty($data->profile_image)) {
    // create the product
    if ($user->createimages($data->UserID,$data->profile_image)) {
        
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