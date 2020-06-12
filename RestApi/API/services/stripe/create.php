<?php
// required headers
require "../../utilities/vendor/autoload.php";
include_once '../../configration/database.php';
include_once '../../objects/payments.php'; 
include_once '../../configration/GlobalConfig.php';




// Instantiation and passing `true` enables exceptions
$config = new GlobalConfig();

// instantiate database and product object
$database = new Database();
$conn     = $database->getConnection();

// JWT TOKEN VALIDATION
$data = json_decode(file_get_contents("php://input"));
// Public $image;

\Stripe\Stripe::setApiKey($config->stripe_secret_key);

if (!empty($data->token) && is_numeric($data->Amount) && !empty($data->email)) 
{ 
    $first_name = $data->first_name;
    $last_name = $data->last_name;
    $email = $data->email;
    $token = $data->token->id;
    $Amount = $data->Amount*100;
    $invoice_id = md5(uniqid()); 


    $customer = \Stripe\Customer::create(array(
        "email" => $email,
        "source" => $token
    ));
      
      // Charge Customer
    $charge = \Stripe\Charge::create(array(
    "amount" => $Amount,
    "currency" => "usd",
    "description" => $invoice_id,
    "customer" => $customer->id
    ));
   
    $products_arr=array();
    $products_arr["records"]=array();


        $product_item=array(
        "transaction_no" => $charge->id,
        "invoice_no" => $charge->description,
        "status" => $charge->captured,
        "transaction_date" => $charge->created,
        "currency" =>$charge->currency,
        "error_message" => $charge->failure_message,
        "success_message" => $charge->seller_message );
        array_push($products_arr["records"], $product_item);    
        http_response_code(200);
        echo json_encode($products_arr);

}

