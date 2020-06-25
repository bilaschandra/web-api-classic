<?php
class Product
{
    
    // database connection and table name
    private $conn;
    private $table_name = "tbl_product";
    
    // object properties
    public $id;
    public $product_name;
    public $vendor;
    public $description;
    public $category_id;
    public $imageurl;
    public $product_id;
    public $color_option;
    public $varient;
    public $instock;
    public $purchase_price;
    public $sell_price;
    public $discount;
    public $quantity;
    
    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    
    
    
    function read()
    {
        // select all query
        $query = "SELECT p.id,p.product_name,
        c.id  AS category_id ,a.purchase_price,a.sell_price,p.description,p.vendor,
        p.image_url,c.category,a.instock,a.discount,p.create_date
        FROM tbl_product p
        JOIN tbl_category c ON c.id = p.category_id
        JOIN tbl_product_attribute a ON a.product_id = p.id
        GROUP BY p.id
        ORDER BY p.create_date DESC;";
        $stmt  = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    
    function readid($id)
    {
        // select all query
        $query = "SELECT p.id,p.product_name,
        c.id  AS category_id ,a.purchase_price,a.sell_price,p.description,p.vendor,
        p.image_url,c.category,a.instock,a.discount,p.create_date
        FROM tbl_product p
        JOIN tbl_category c ON c.id = p.category_id
        JOIN tbl_product_attribute a ON a.product_id = p.id
        where p.id = :id
        GROUP BY p.id
        ORDER BY p.create_date DESC;";
        $stmt  = $this->conn->prepare($query);
        $id    = htmlspecialchars(strip_tags($id));
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt;
    }
    
    function readproductdetail($id)
    {
        $query = "SELECT * FROM tbl_product_attribute WHERE product_id  = :id; ";
        $stmt  = $this->conn->prepare($query);
        $id    = htmlspecialchars(strip_tags($id));
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt;
    }

    function readproductattrdetail($id) {
        $query = "SELECT * FROM tbl_product_attribute WHERE id  = :id; ";
        $stmt  = $this->conn->prepare($query);
        $id    = htmlspecialchars(strip_tags($id));
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt;
    }
    
    function readproductimages($id)
    {
        $query = "SELECT * FROM tbl_product_image WHERE product_id  = :id; ";
        $stmt  = $this->conn->prepare($query);
        $id    = htmlspecialchars(strip_tags($id));
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt;
    }
    
    
    function readcatid($id)
    {
        // select all query
        $query = "SELECT p.id,p.product_name,
        c.id  AS category_id  ,a.purchase_price,a.sell_price,p.description,p.vendor,
        p.image_url,c.category,a.instock,a.discount,p.create_date
        FROM tbl_product p
        JOIN tbl_category c ON c.id = p.category_id
        JOIN tbl_product_attribute a ON a.product_id = p.id
        WHERE c.id = :id
        GROUP BY p.id
        ORDER BY p.create_date DESC;";
        
        $stmt = $this->conn->prepare($query);
        $id   = htmlspecialchars(strip_tags($id));
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt;
    }
    //SELECT  * FROM tbl_product p WHERE p.category_id = 1
    
    function read_vendorid($vendor_id)
    {
        // select all query
        $query = "SELECT distinct vendor FROM tbl_product WHERE category_id = :id; ";
        $stmt  = $this->conn->prepare($query);
        $id    = htmlspecialchars(strip_tags($vendor_id));
        // bind values
        $stmt->bindParam(":id", $id);
        
        
        // execute query
        $stmt->execute();
        
        return $stmt;
    }
    
    
    
    
    function maxprice()
    {
        // select all query
        $query = "SELECT MAX(p.sell_price) AS maxprice FROM tbl_product_attribute p ;";
        $stmt  = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    
    // INSERT INTO `tbl_product
    
    
    function create()
    {
        
        $this->category_id  = htmlspecialchars(strip_tags($this->category_id));
        $this->product_name = htmlspecialchars(strip_tags($this->product_name));
        $this->description  = htmlspecialchars(strip_tags($this->description));
        $this->vendor       = htmlspecialchars(strip_tags($this->vendor));
        $this->imageurl     = htmlspecialchars(strip_tags($this->imageurl));
        
        // select all query
        $query = " INSERT INTO `tbl_product` (`product_name`, `category_id`, `description`, `vendor`, `image_url`) 
                VALUES ('$this->product_name', '$this->category_id', '$this->description', '$this->vendor', '$this->imageurl');";
        $stmt  = $this->conn->prepare($query);
        if ($stmt->execute()) {
            $this->product_id = $this->conn->lastInsertId();
            echo json_encode(array(
                "product_id" => $this->product_id
            ));
            return $stmt;
        } else {
            return false;
        }
        
        
    }

      //INSERT INTO `tbl_product_image` (`product_id`, `Url`) 
      //VALUES ('4', '../../../../assets/sliderimages/4.jpg');
    function createimages($coverimage,$image1,$image2,$image3,$image4){
      
        $this->product_id  = htmlspecialchars(strip_tags($this->product_id)); 
       $query0 = "";
       $query1 = ""; 
       $query2 = "";
       $query3 = "";
       $query4 = "";
       $query5 = "";
       
       $directory = dir(getcwd())->path;
       
          
        if($coverimage !=null){
            $param0 =  md5(uniqid()); 
            $filenamecover = $directory.'\\productimages\\coverimages\\' . $param0 . '.jpg' ;
            generateimage($coverimage,$filenamecover);
            $filenamecover =  explode("API",$filenamecover)[1];
            $query0 = "UPDATE `tbl_product` SET `image_url` =   '$filenamecover' WHERE id = '$this->product_id';";   
            $query5 = "INSERT INTO `tbl_product_image` (`product_id`, `Url`) VALUES  ('$this->product_id', '$filenamecover');"; 
        }
         
        if($image1 !=null){
            
            $param1 =  md5(uniqid());
            $filenameimage1 = $directory.'\\productimages\\fleximages\\' . $param1 .  '.jpg' ;
            generateimage($image1,$filenameimage1);            
            $filenameimage1 =  explode("API",$filenameimage1)[1];
            $query1 = "INSERT INTO `tbl_product_image` (`product_id`, `Url`) VALUES  ('$this->product_id', '$filenameimage1');";   
        }
        if($image2 !=null ){
            
            $param2 =  md5(uniqid());
            $filenameimage2 =$directory.'\\productimages\\fleximages\\'  . $param2 .  '.jpg' ;       
            generateimage($image2,$filenameimage2);
            
            $filenameimage2 =  explode("API",$filenameimage2)[1];
            $query2 = "INSERT INTO `tbl_product_image` (`product_id`, `Url`) VALUES  ('$this->product_id', '$filenameimage2');";
        }

        if($image3 !=null){
            
            $param3 =  md5(uniqid());
            $filenameimage3 = $directory.'\\productimages\\fleximages\\'  . $param3 .  '.jpg' ;       
            generateimage($image3,$filenameimage3);
            $filenameimage3 =  explode("API",$filenameimage3)[1];
            $query3 = "INSERT INTO `tbl_product_image` (`product_id`, `Url`) VALUES  ('$this->product_id', '$filenameimage3');";
        }
        if($image4 !=null){  
            
            $param4 =  md5(uniqid());          
            $filenameimage4 = $directory.'\\productimages\\fleximages\\'  . $param4 .  '.jpg' ;      
            generateimage($image4,$filenameimage4);
            $filenameimage4 =  explode("API",$filenameimage4)[1];
            $query4 = "INSERT INTO `tbl_product_image` (`product_id`, `Url`) VALUES  ('$this->product_id', '$filenameimage4.');";
        }

        $query =str_replace("\\" ,"/" , $query0. $query1 . $query2 . $query3 . $query4 .$query5);
         

     
        $stmt  = $this->conn->prepare($query);
        if ($stmt->execute()) {           
            return $stmt;
        } else {
            return false;
        }


    }


     
    function createproductdetails(){
        $this->product_id=htmlspecialchars(strip_tags($this->product_id));
        $this->color_option=htmlspecialchars(strip_tags($this->color_option));
        $this->varient=htmlspecialchars(strip_tags($this->varient));
        $this->purchase_price=htmlspecialchars(strip_tags($this->purchase_price));
        $this->sell_price=htmlspecialchars(strip_tags($this->sell_price));
        $this->discount=htmlspecialchars(strip_tags($this->discount));
        $this->quantity=htmlspecialchars(strip_tags($this->quantity));
        $status = $this->quantity > 0 ? 1 : 0  ;
        
        // select all query
        $query  = "INSERT INTO `tbl_product_attribute` (`product_id`, `color_option`, `varient`, `instock`, `purchase_price`, `sell_price`, `discount`, `quantity`)
         VALUES ('$this->product_id', '$this->color_option', '$this->varient', b'$status', '$this->purchase_price', '$this->sell_price', '$this->discount', '$this->quantity'); ";       
        $stmt = $this->conn->prepare($query); 
         
        
        if (!$stmt->execute()) {
            return false;
          }
      
          $this->product_id = $this->conn->lastInsertId();
          echo json_encode(array("product_id" => $this->product_id));
        return $stmt;
    }
    
    function Deleteproduct($id){

        $this->product_id=htmlspecialchars(strip_tags($id));
       
        
        // select all query
       $query = "DELETE FROM tbl_product_image WHERE product_id = '$id'; DELETE FROM tbl_product_attribute WHERE product_id = '$id'; DELETE FROM tbl_product WHERE id = '$id';";
       
       $stmt = $this->conn->prepare($query); 
         
        
        if (!$stmt->execute()) {
            return false;
          }
      
          $this->product_id = $this->conn->lastInsertId();
          echo json_encode(array("product_id" => $this->product_id));
        return $stmt;


    }
    
    //Deletevarient
      
    function Deletevarient($id){

        $this->product_id=htmlspecialchars(strip_tags($id));
       
        
        // select all query
       $query = "DELETE FROM tbl_product_attribute WHERE id = '$id';";
       
       $stmt = $this->conn->prepare($query); 
         
        
        if (!$stmt->execute()) {
            return false;
          }
      
          $this->product_id = $this->conn->lastInsertId();
          echo json_encode(array("product_id" => $this->product_id));
        return $stmt;


    }
    function readalldetails()
    {
        $query = "SELECT * FROM tbl_product_attribute ";
        $stmt  = $this->conn->prepare($query);
     
        $stmt->execute();
        return $stmt;
    }

    function update($id){
        $this->category_id  = htmlspecialchars(strip_tags($this->category_id));
        $this->product_name = htmlspecialchars(strip_tags($this->product_name));
        $this->description  = htmlspecialchars(strip_tags($this->description));
        $this->vendor       = htmlspecialchars(strip_tags($this->vendor)); 
        
        $id       = htmlspecialchars(strip_tags($id)); 

        $query = "UPDATE `tbl_product` SET `product_name`= '$this->product_name', `category_id`='$this->category_id', `description`='$this->description', `vendor`='$this->vendor' WHERE  `id`= '$id';";
        $stmt  = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
        
    }

    
    function updatevarient($id){
        $this->product_id=htmlspecialchars(strip_tags($this->product_id));
        $this->color_option=htmlspecialchars(strip_tags($this->color_option));
        $this->varient=htmlspecialchars(strip_tags($this->varient));
        $this->purchase_price=htmlspecialchars(strip_tags($this->purchase_price));
        $this->sell_price=htmlspecialchars(strip_tags($this->sell_price));
        $this->discount=htmlspecialchars(strip_tags($this->discount));
        $this->quantity=htmlspecialchars(strip_tags($this->quantity));
        $status = $this->quantity > 0 ? 1 : 0  ;        
        $id       = htmlspecialchars(strip_tags($id)); 
         
        $query = "UPDATE `tbl_product_attribute` SET `color_option`='$this->color_option', `varient`='$this->varient', 
        `instock`=b'$status', `purchase_price`='$this->purchase_price', `sell_price`='$this->sell_price', `discount`='$this->discount', `quantity`='$this->quantity'
        WHERE  `id`=$id and  product_id =$this->product_id ;";
        $stmt  = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
        
    }
    
}

function generateimage($content,$filname)
{
  
    $image_parts = explode(";base64,", $content);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];
    $image_base64 = base64_decode($image_parts[1]);    
    file_put_contents($filname, $image_base64);

      
}

?>