<?php

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

    include_once '../../objects/transaction.php';

	$data = json_decode(file_get_contents("php://input"));

	$transaction = new Transaction();
	$queryResults = $transaction->getProductsByInvoiceNo($data->invoice_no);

	$results['records'] = $queryResults ?: array();

	http_response_code(200);
	echo json_encode($results);
?>
