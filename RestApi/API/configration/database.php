<?php
include_once 'GlobalConfig.php';

class Database
{

    public $conn;

    public function getConnection(){
        $config= new GlobalConfig();
        $this->conn = null;
     
        try{
            $dsn = "mysql:host={$config->host};port={$config->port};dbname={$config->db_name};charset=utf8";

            $this->conn = new PDO($dsn, $config->username, $config->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();   
        }

        return $this->conn;
    }

    public function getConnectionAndValidate($data){
    
        $this->conn = null;
        $config= new GlobalConfig();

        try{
            $dsn = "mysql:host={$config->host};port={$config->port};dbname={$config->db_name};charset=utf8";

            $this->conn = new PDO($dsn, $config->username, $config->password);
            $this->conn->exec("set names utf8");
            }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }

        if (!validateToken($data->JWT, $data->UserID, $this->conn)){
          http_response_code(401);
        echo "Authorization: declined";
          exit();
        }

        return $this->conn;
    }

}


?>
