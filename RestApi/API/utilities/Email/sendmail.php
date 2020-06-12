<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require "../../utilities/vendor/autoload.php";
include_once '../../configration/GlobalConfig.php';


// Instantiation and passing `true` enables exceptions
$config = new GlobalConfig();
$mail   = new PHPMailer(true);
$data   = json_decode(file_get_contents("php://input"));

if (is_string($data->textmessage) && is_string($data->reciver)) {
    
    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER; // Enable verbose debug output
        $mail->isSMTP(); // Send using SMTP
        $mail->Host       = 'smtp.gmail.com;'; // Set the SMTP server to send through
        $mail->SMTPAuth   = true; // Enable SMTP authentication
        $mail->Username   = $config->emailaddress; // SMTP username
        $mail->Password   = $config->emailpassword; // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587; // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
        
        //Recipients
        $mail->setFrom($config->emailaddress, 'BD Electronics');
        $mail->addAddress($data->reciver); // Add a recipient
        $mail->addReplyTo($config->emailaddress, 'Information');
        
        
        
        // Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = 'Order Confirmation';
        $mail->Body    = $data->textmessage;
        $mail->send();
        echo 'Message has been sent';
    }
    catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    return false;
}