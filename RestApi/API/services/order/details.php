<?php

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	include_once '../../configration/database.php';
	include_once '../../objects/order.php';

	$data = json_decode(file_get_contents("php://input"));

	$database = new Database();
	$obj = new order($database->getConnection());
	$queryResults = $obj->detailsByOrderId((int)$data->id);

	$results = array();
	$results['records'] = $queryResults;

	http_response_code(200);
	echo json_encode($results);
?>
