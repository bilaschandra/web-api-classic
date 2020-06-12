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
    is_string($data->contact_number)&&
    is_string($data->billing_street_address)&&
    is_string($data->billing_city_address)&&
    is_string($data->billing_state_address)&&
    is_string($data->billing_country_address)&&
    is_string($data->billing_zip)&&
    is_string($data->shipping_street_address)&&
    is_string($data->shipping_city_address)&&
    is_string($data->shipping_state_address)&&
    is_string($data->shipping_country_address)&&
    is_string($data->shipping_zip)&&
    is_string($data->UserID)
    
    ) {

 
        $user->contact_number      =   $data->contact_number      ;
        $user->billing_street_address        =   $data->billing_street_address        ;
        $user->billing_city_address     =   $data->billing_city_address     ;
        $user->billing_state_address        =   $data->billing_state_address        ;
        $user->billing_country_address      =   $data->billing_country_address      ;
        $user->billing_zip      =   $data->billing_zip      ;
        $user->shipping_street_address      =   $data->shipping_street_address      ;
        $user->shipping_city_address        =   $data->shipping_city_address        ;
        $user->shipping_state_address       =   $data->shipping_state_address       ;
        $user->shipping_country_address     =   $data->shipping_country_address     ;
        $user->shipping_zip     =   $data->shipping_zip     ;

    
    
    // create the product
    if ($user->updateuserdetails($data->UserID)) {
        
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