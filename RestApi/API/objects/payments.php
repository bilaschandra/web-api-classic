<?php
class Payments{

    // database connection and table name
    private $conn;
    private $table_name = "tbl_category";

    // object properties
    public $id;
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function read($id){
      // select all query
      $query  = "SELECT `invoice_no` FROM tbl_transactions WHERE id = '$id';";      
      $stmt = $this->conn->prepare($query);
      // execute query
      $stmt->execute();
      return $stmt;
    }


}
?>