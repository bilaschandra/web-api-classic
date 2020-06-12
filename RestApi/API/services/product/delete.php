<?php
// required headers

include_once '../../configration/database.php';
include_once '../../objects/product.php'; 

// instantiate database and product object
$database = new Database();
$conn     = $database->getConnection();

// JWT TOKEN VALIDATION
$data = json_decode(file_get_contents("php://input"));
// Public $image;


$product = new Product($conn);

// make sure data is not empty
if (is_string($data->product_id)) 
{


  
    // create the product
    if ($product->Deleteproduct($data->product_id)) {
        
        http_response_code(200);
    } else {
        
        http_response_code(503);
        
        echo json_encode(array(
            "message" => "Unable to delete product."
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