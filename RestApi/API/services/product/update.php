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
if (is_string($data->product_name) && is_string($data->vendor) && is_string($data->description) && is_string($data->category_id)) 
{


  $product->product_name = $data->product_name;
  $product->vendor = $data->vendor;
  $product->description = $data->description;
  $product->category_id = $data->category_id;
  
    
    // update the product
    if ($product->update($data->id)) {
        
        http_response_code(200);
        echo json_encode(array("message" => "update."));
    } else {
        
        http_response_code(503);
        
        echo json_encode(array(
            "message" => "Unable to update product."
        ));
    }
}

else {
    
    http_response_code(400);
    echo json_encode(array(
        "message" => "Unable to update product. Data is incomplete."
    ));
}

 
?>