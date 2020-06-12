<?php 
  include_once '../../configration/database.php';
  require "../../utilities/vendor/autoload.php";   
  use \Firebase\JWT\JWT;


  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


  $email = '';
  $password = '';

  $database = new Database();
  $conn = $database->getConnection();
  $data = json_decode(file_get_contents("php://input"));
  $password = $data->password;


  $query = "SELECT UserID, FirstName, LastName, Hash, Email,User_role
            FROM  tbl_user
            WHERE Username = :username LIMIT 0,1";

  $stmt = $conn->prepare( $query );
  $stmt->bindParam(':username', $data->username);
  $stmt->execute();
  $num = $stmt->rowCount();

  if($num > 0){
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      $id = $row['UserID'];
      $firstname = $row['FirstName'];
      $lastname = $row['LastName'];
      $password2 = $row['Hash'];
      $email = $row['Email'];
      $role = $row['User_role'];

      if(password_verify($password, $password2))
      {
          $secret_key = "EcomMDJ";
          $issuer_claim = "THE_ISSUER"; // this can be the servername
          $audience_claim = "THE_AUDIENCE";
          $issuedat_claim = time(); // issued at
          $notbefore_claim = 0; //not before in seconds
          $expire_claim = $issuedat_claim + 86400; // expire time in seconds (60*60*24 = 1 day)
          // CARE FOR LATER OVERHEAD!! FIX WHEN BECOMING AN ISSUE.
          $token = array(
              "iss" => $issuer_claim,
              "aud" => $audience_claim,
              "iat" => $issuedat_claim,
              "nbf" => $notbefore_claim,
              "exp" => $expire_claim,
              "data" => array(
                  "id" => $id,
                  "firstname" => $firstname,
                  "lastname" => $lastname,
                  "email" => $email,
                  "hash" => $password2,
                  "role" => $role                  
          ));

          http_response_code(200);

          //$jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUSEVfSVNTVUVSIiwiYXVkIjoiVEhFX0FVRElFTkNFIiwiaWF0IjoxNTY1OTQxNTg5LCJuYmYiOjE1NjU5NDE1OTksImV4cCI6MTU2NjAyNzk4OSwiZGF0YSI6eyJpZCI6Ijk2IiwiZmlyc3RuYW1lIjoiIiwibGFzdG5hbWUiOiIiLCJlbWFpbCI6IiJ9fQ.xgqKV2Yxftnf8sZG1WP6mWGsMBcpWNz78CHY6ySprxc";
          $jwt = JWT::encode($token, $secret_key);
          echo json_encode(
              array(
                  "status" => "200",
                  "message" => "Successful login.",
                  "jwt" => $jwt,
                  "email" => $email,
                  "userid" => $id,
                  "expireAt" => $expire_claim,
                  "role" => $role
              ));


          $queryUpdate = "UPDATE tbl_user
                    SET Token = :Token
                    WHERE UserID = :UserID;";

          $stmtUpdate = $conn->prepare( $queryUpdate );
          $stmtUpdate->bindParam(':Token', $jwt);
          $stmtUpdate->bindParam(':UserID', $id);

          if (!$stmtUpdate->execute()){
            echo json_encode(array("error" => "couldnt log token into sys.",
            "status" => "400"));
            exit();
          }
      }
      else{
          echo json_encode(array("message" => "Invalid password.", "status" => "401"));
      }
  }
  else{
    echo json_encode(array("message" => "Invalid username.", "status" => "401"));

  }
?>
