<?php
class Category{

    // database connection and table name
    private $conn;
    private $table_name = "tbl_category";

    // object properties
    public $id;
    public $name;
    public $isActive; 

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
      // select all query
      $query  = "SELECT `id`,`category`,`isActive` FROM tbl_category WHERE isActive = 1;";

      
      $stmt = $this->conn->prepare($query);

      // execute query
      $stmt->execute();

      return $stmt;
    }


    function readadmin(){
      // select all query
      $query  = "SELECT `id`,`category`,`isActive` FROM tbl_category ;";

      
      $stmt = $this->conn->prepare($query);

      // execute query
      $stmt->execute();

      return $stmt;
    }


    function create()
    {
    $query = " INSERT INTO $this->table_name (`category`) VALUES (:category);";
                $stmt                 = $this->conn->prepare($query);
                $this->name  =    htmlspecialchars(strip_tags($this->name));               
                
                // bind values
                $stmt->bindParam(":category",  $this->name);
                $stmt->execute();
                return $stmt;




     }

     function update(){
      $this->name  = htmlspecialchars(strip_tags($this->name));          
      $this->isActive = (int)htmlspecialchars(strip_tags($this->isActive));        
      $this->id = (int)htmlspecialchars(strip_tags($this->id));  

      $query = "UPDATE tbl_category c SET c.category =  '$this->name'  , c.isActive = b'$this->isActive'  WHERE  c.id  =  $this->id ;";
      $stmt = $this->conn->prepare($query);
        
      // bind values
    
      $stmt->execute();
      return $stmt;
     }               //UPDATE `db_ecommerce`.`tbl_category` SET `category`=0x35333435, `isActive`=b'0' WHERE  `id`=6;





     function delete(){
      $query = "UPDATE  $this->table_name 
                SET   `isActive`=b'0' 
                WHERE  `id`= :id";
      $stmt = $this->conn->prepare($query);
      $this->id = htmlspecialchars(strip_tags($this->id));     
      // bind values
      $stmt->bindParam(":id",  $this->id);
      $stmt->execute();
      return $stmt;
     }















    
}
?>