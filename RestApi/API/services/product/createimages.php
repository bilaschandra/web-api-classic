<?php
// required headers

include_once '../../configration/database.php';
include_once '../../objects/product.php'; 

// instantiate database and product object
$database = new Database();
$conn     = $database->getConnection();


$data = json_decode(file_get_contents("php://input"));
// Public $image;


$product = new Product($conn);

// make sure data is not empty
if (is_string($data->product_id) && (!is_null($data->coverimage) || !is_null($data->image1) || !is_null($data->image2) ||!is_null($data->image3) ||!is_null($data->image4))) 
{


  $product->product_id = $data->product_id;    
    // create the product
    if ($product->createimages($data->coverimage, $data->image1,$data->image2,$data->image3,$data->image4)) {
        
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