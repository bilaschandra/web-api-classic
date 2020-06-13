<?php

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

    include_once '../../objects/transaction.php';

	$data = json_decode(file_get_contents("php://input"));

	$transaction = new Transaction();
	$queryResults = $transaction->getAllTransaction();

	$results = array();
	$results['records'] = array();

	foreach ($queryResults as $row) {
		$data = array(
			"id" => $row['id'],
			"user_id" => $row['user_id'],
			"address_id" => $row['address_id'],
			"invoice_no" => $row['invoice_no'],
			"transaction_no" => $row['transaction_no'],
			"status" => $row['status'],
			"Amount" => $row['Amount'],
			"transaction_date" => $row['transaction_date'],
			"error_meassge" => $row['error_meassge'],
			"success_message" => $row['success_message'],
			"currency" => $row['currency'],
		);

		array_push($results["records"], $data);
	}

	http_response_code(200);
	echo json_encode($results);
?>
