<?php
// Include global functions
include_once '../../configration/database.php';
include_once '../../objects/category.php';



$data = json_decode(file_get_contents("php://input"));

$database = new Database();
$conn     = $database->getConnection();

// CONTROL


$cat = new Category($conn);

// make sure data is not empty
if (is_string($data->id) ) {

  $cat->id = $data->id;

    
    
    // create the product
    if ($cat->delete()) {
        
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