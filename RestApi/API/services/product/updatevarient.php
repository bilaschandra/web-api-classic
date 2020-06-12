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
if (is_string($data->product_id) && is_numeric($data->sell_price) && is_numeric($data->quantity)) 
{
 
    $product->product_id = $data->product_id;
    $product->color_option = $data->color_option;
    $product->varient = $data->varient;
    $product->purchase_price = $data->purchase_price;
    $product->sell_price = $data->sell_price;
    $product->quantity = $data->quantity;
    $product->discount = $data->discount; 
    
    // create the product
    if ($product->updatevarient($data->id)) {
        
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