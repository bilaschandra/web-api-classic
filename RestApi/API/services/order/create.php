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
        is_numeric($data->product_id) 
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
        && is_string($data->varient_id) 
        && is_numeric($data->subtotal)
        && is_bool($data->saveinfo)      
        && !is_null($data->transaction)
      

    
     )
    {
    
    $order->user_id                  = $data->user_id;
    $order->product_id               = $data->product_id;
    $order->order_quantity           = $data->order_quantity;
    $order->contact_number           = $data->contact_number;
    $order->billing_street_address   = $data->billing_street_address;
    $order->billing_city_address     = $data->billing_city_address;
    $order->billing_state_address    = $data->billing_state_address;
    $order->billing_country_address  = $data->billing_country_address;
    $order->billing_zip              = $data->billing_zip;
    $order->shipping_street_address  = $data->shipping_street_address;
    $order->shipping_city_address    = $data->shipping_city_address;
    $order->shipping_state_address   = $data->shipping_state_address;
    $order->shipping_country_address = $data->shipping_country_address;
    $order->shipping_zip             = $data->shipping_zip;
    $order->varient_id               = $data->varient_id;
    $order->subtotal                 = $data->subtotal;
    $order->saveinfo                 = $data->saveinfo;
    $order->inovice_no                 = $data->transaction->_invoice_no;
    $order->transaction_no                 = $data->transaction->_transaction_no;
    $order->transaction_status = $data->transaction->_status;
    $order->currency = $data->transaction->_currency;
    $order->error_message = $data->transaction->error_message;
    $order->success_message = $data->transaction->_success_message;
    $order->transaction_date = $data->transaction->_transaction_date;
    
    
    // create the product
    if ($order->create_new())
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