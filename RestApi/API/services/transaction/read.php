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
		array_push($results["records"], $row);
	}

	http_response_code(200);
	echo json_encode($results);
?>
