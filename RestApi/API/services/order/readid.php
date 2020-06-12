 <?php

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	include_once '../../configration/database.php';
    include_once '../../objects/order.php'; 
    
	// instantiate database and product object
	$database = new Database();
	$db = $database->getConnection();

	// JWT TOKEN VALIDATION
	$data = json_decode(file_get_contents("php://input"));
        // if (!validateToken($data->JWT, $data->UserID, $db)){
        //   http_response_code(401);
        //   exit();
        // }

	// initialize object
	$order = new Order($db);
     
	// query products
	$stmt = $order->readid($data->UserID);
	$num = $stmt->rowCount();

	// check if more than 0 record found
	if($num>0){

		// products array
		$products_arr=array();
		$products_arr["records"]=array();


	 
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		 
			extract($row);


			$product_item=array(
                "id" => $id ,
                "user_id" => $user_id,
                "product_id" => $product_id,              
                "issue_date" => $issue_date,
                "delivered_date" => $delivered_date, 
                "status" => $orderstaus,
                "order_quantity" => $order_quantity, 
				"order_total_price" => $order_total_price,				
				"invoice_id" => $invoice_no
			 
			);

			array_push($products_arr["records"], $product_item);
		}

		// set response code - 200 OK
		http_response_code(200);

		// show products data in json format
		echo json_encode($products_arr);
	}
 
?>
