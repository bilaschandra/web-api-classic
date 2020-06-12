<?php
include_once '../../configration/database.php';
include_once '../../objects/order.php';


$jsonData = rtrim(file_get_contents("php://input"), "\0");
$data = json_decode($jsonData);

$database = new Database();
$conn     = $database->getConnection();


// CONTROL

 $order = new Order($conn);

// make sure data is not empty
    if (
        is_numeric($data->order_id) 
        && is_numeric($data->order_quantity) 
        && is_string($data->contact_number) 
        && is_string($data->billing_street_address)
        && is_string($data->billing_city_address) 
        && is_string($data->billing_state_address) 
        && is_string($data->billing_country_address)
        && is_string($data->billing_zip) 
        && is_string($data->shipping_street_address) 
        && is_string($data->shipping_city_address)
        && is_string($data->shipping_state_address) 
        && is_string($data->shipping_country_address)
        && is_string($data->shipping_zip)
        && is_numeric($data->subtotal)
     )
    {
    
                    $query = " UPDATE tbl_orders SET          
         
            `delivered_date` = '$data->delivered_date',
            `status` = b'$data->status',
            `order_quantity` = '$data->order_quantity',
            `order_total_price` = '$data->subtotal',
            `contact_number` = '$data->contact_number',
            `billing_street_address` = '$data->billing_street_address',
            `billing_city_address` = '$data->billing_city_address',
            `billing_state_address` = '$data->billing_state_address',
            `billing_country_address` ='$data->billing_country_address',
            `billing_zip`  ='$data->billing_zip',
            `shipping_street_address`  ='$data->shipping_street_address',
            `shipping_city_address` = '$data->shipping_city_address',
            `shipping_state_address` = '$data->shipping_state_address',
            `shipping_country_address` = '$data->shipping_country_address',
            `shipping_zip` = '$data->shipping_zip'
            WHERE id = '$data->order_id';";
            $stmt  = $conn->prepare($query);
          
        
   
    
    if ($stmt->execute())
    {
        
        http_response_code(200);
    }
    else
    {
        
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