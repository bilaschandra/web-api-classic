
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
  
    
   
    // create the product
    if ($order->delete($data->id))
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


?>
