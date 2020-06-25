<?php
// Include global functions
include_once '../../configration/database.php';
include_once '../../objects/user.php';



$data = json_decode(file_get_contents("php://input"));
$database = new Database();
$conn     = $database->getConnection();
$user = new User($conn);

// make sure data is not empty
if (is_numeric($data->UserID)   ) {

    // create the product
    if ($user->deleteuser($data->UserID)) {
        
        http_response_code(200);
    } else {
        
        http_response_code(503);
        
        echo json_encode(array(
            "message" => "Unable to delete user."
        ));
    }
}

else {
    
    http_response_code(400);
    echo json_encode(array(
        "message" => "Unable to delete user. Data is incomplete."
    ));
}

?>