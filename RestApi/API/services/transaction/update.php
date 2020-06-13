<?php
// Include global functions
include_once '../../objects/transaction.php';

$data = json_decode(file_get_contents("php://input"));
$transaction = new Transaction();

if ($data->id) {
    $transaction
        ->setId($data->id)
        ->setStatus($data->status)
    ;

    if ($transaction->updateStatus()) {
        http_response_code(200);
        echo json_encode(array(
            "message" => "Successfully done"
        ));
        return;
    } else {
        http_response_code(503);
        echo json_encode(array(
            "message" => "Unable to update"
        ));
        return;
    }
}

// default return 400
http_response_code(400);
echo json_encode(array(
	"message" => "Unable to update. Data is incomplete."
));

?>