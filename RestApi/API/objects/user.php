<?php
class User{

    // database connection and table name
    private $conn;
    private $table_name ="tbl_user";
    public  $UserName;
    public  $LastName;
    public  $FirstName;
    public  $Email;  
    public  $ImageURL;
    public  $isactive;
    
    // object properties
    public $contact_number;
    public $billing_street_address;
    public $billing_city_address;
    public $billing_state_address;
    public $billing_country_address;
    public $billing_zip;
    public $shipping_street_address;
    public $shipping_city_address;
    public $shipping_state_address;
    public $shipping_country_address;
    public $shipping_zip;
    

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }


    function readalluser(){
      // select all query
      $query  ="SELECT * FROM tbl_user"; // where User_role = 'user';      
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      return $stmt;
    }

    function readuserid($userid){
      // select all query
      $query  ="SELECT u.UserName,u.FirstName,u.LastName,u.Email,u.ProflieImage_url FROM tbl_user u WHERE u.UserID = :userid;";      
      $stmt = $this->conn->prepare($query);
      $userid = htmlspecialchars(strip_tags($userid));    
      $stmt->bindParam(":userid", $userid);
      $stmt->execute();
      return $stmt;
    }

    function readuserdetailid($userid){
        // select all query
        $query  ="SELECT * FROM tbl_address a        
        WHERE a.UserID = :userid
        ;";      
        $stmt = $this->conn->prepare($query);
        $userid = htmlspecialchars(strip_tags($userid));    
        $stmt->bindParam(":userid", $userid);
        $stmt->execute();
        return $stmt;
      }

    function updateuser($userid)
    {
        $query =" UPDATE tbl_user u SET  u.UserName = :UserName,u.FirstName = :FirstName,u.LastName = :LastName,
                    u.Email = :Email, u.ProflieImage_url = :ProflieImage_url WHERE u.UserID  =:UserID ;";

        $stmt = $this->conn->prepare($query);
        $userid = htmlspecialchars(strip_tags($userid));          
        $this->UserName = htmlspecialchars(strip_tags($this->UserName));          
        $this->FirstName = htmlspecialchars(strip_tags($this->FirstName));                 
        $this->LastName = htmlspecialchars(strip_tags($this->LastName));         
        $this->Email = htmlspecialchars(strip_tags($this->Email));             
        $this->ImageURL = htmlspecialchars(strip_tags($this->ImageURL)); 

        $stmt->bindParam(":UserID" , $userid);
        $stmt->bindParam(":UserName" , $this->UserName);
        $stmt->bindParam(":FirstName" , $this->FirstName);
        $stmt->bindParam(":LastName" , $this->LastName);
        $stmt->bindParam(":Email" , $this->Email);
        $stmt->bindParam(":ProflieImage_url" , $this->ImageURL);
        $stmt->execute();
        return $stmt;
    }

  
    function updateuserdetails($userid)
    {
      



       
      $query = "SELECT * FROM tbl_address WHERE UserID = '$userid';";
      $stmt = $this->conn->prepare($query); 
      $stmt->execute();
          if ($stmt->rowCount() == 0) {

            $this->contact_number           = htmlspecialchars(strip_tags($this->contact_number));
            $this->billing_street_address   = htmlspecialchars(strip_tags($this->billing_street_address));
            $this->billing_city_address     = htmlspecialchars(strip_tags($this->billing_city_address));
            $this->billing_state_address    = htmlspecialchars(strip_tags($this->billing_state_address));
            $this->billing_country_address  = htmlspecialchars(strip_tags($this->billing_country_address));
            $this->billing_zip              = htmlspecialchars(strip_tags($this->billing_zip));
            $this->shipping_street_address  = htmlspecialchars(strip_tags($this->shipping_street_address));
            $this->shipping_city_address    = htmlspecialchars(strip_tags($this->shipping_city_address));
            $this->shipping_state_address   = htmlspecialchars(strip_tags($this->shipping_state_address));
            $this->shipping_country_address = htmlspecialchars(strip_tags($this->shipping_country_address));
            $this->shipping_zip             = htmlspecialchars(strip_tags($this->shipping_zip));
            
              $query = " INSERT INTO `tbl_address` 
              (`contact_number`,`UserID` ,`billing_street_address`, `billing_city_address`, `billing_state_address`, `billing_country_address`, `billing_zip`,
               `shipping_street_address`, `shipping_city_address`, `shipping_state_address`, `shipping_country_address`, `shipping_zip`) 
  
               VALUES ('$this->contact_number' ,'$userid', '$this->billing_street_address', '$this->billing_city_address', '$this->billing_state_address', 
               '$this->billing_country_address', '$this->billing_zip', '$this->shipping_street_address', '$this->shipping_city_address',
                '$this->shipping_state_address', '$this->shipping_country_address', '$this->shipping_zip');";   
              $stmt = $this->conn->prepare($query);
             
              // bind values
           
              
              if ($stmt->execute()) {
                      return $stmt;
              } 
              else {
                  echo json_encode(array("message" => "Unable to get address."));                        
              }
          }
          else{


            $this->contact_number = htmlspecialchars(strip_tags($this->contact_number));   
            $this->billing_street_address = htmlspecialchars(strip_tags($this->billing_street_address));     
            $this->billing_city_address = htmlspecialchars(strip_tags($this->billing_city_address));     
            $this->billing_state_address = htmlspecialchars(strip_tags($this->billing_state_address));     
            $this->billing_country_address = htmlspecialchars(strip_tags($this->billing_country_address));     
            $this->billing_zip = htmlspecialchars(strip_tags($this->billing_zip));     
            $this->shipping_street_address = htmlspecialchars(strip_tags($this->shipping_street_address));     
            $this->shipping_city_address = htmlspecialchars(strip_tags($this->shipping_city_address));      
            $this->shipping_state_address = htmlspecialchars(strip_tags($this->shipping_state_address));     
            $this->shipping_country_address = htmlspecialchars(strip_tags($this->shipping_country_address));     
            $this->shipping_zip = htmlspecialchars(strip_tags($this->shipping_zip));     
            $userid = htmlspecialchars(strip_tags($userid));   
            
            $query ="UPDATE tbl_address a 
                            SET a.contact_number =  '$this->contact_number',
                            a.billing_street_address = '$this->billing_street_address',
                            a.billing_city_address = '$this->billing_city_address',
                            a.billing_state_address = '$this->billing_state_address',
                            a.billing_country_address = '$this->billing_country_address',
                            a.billing_zip = '$this->billing_zip',
                            a.shipping_street_address = '$this->shipping_street_address',
                            a.shipping_city_address= '$this->shipping_city_address',
                            a.shipping_state_address= '$this->shipping_state_address',
                            a.shipping_country_address= '$this->shipping_country_address',
                            a.shipping_zip= '$this->shipping_zip'
                            WHERE a.UserID = '$userid';";
                            $stmt  = $this->conn->prepare($query);
                            $stmt->execute();
                            return $stmt;
      
          }
    }

      
    function deleteuser($userid){
      $query  ="UPDATE  `tbl_user` SET  `isactive`= b'0' WHERE  `UserID`= $userid;";      
      $stmt = $this->conn->prepare($query);   
      $stmt->execute();
      return $stmt;
    
    }

    function createimages($user_id,$profileimage){
      
     $user_id  = htmlspecialchars(strip_tags($user_id)); 
     $query0 = "";
     
     
     $directory = dir(getcwd())->path;
     
        
      if($profileimage !=null){
          $param0 =  md5(uniqid()); 
          $filenamecover = $directory.'\\userimages\\profileimages\\' . $param0 . '.jpg' ;
          generateimage($profileimage,$filenamecover);
          $filenamecover =  explode("API",$filenamecover)[1];
          $query0 = "UPDATE `tbl_user` SET `ProflieImage_url` =   '$filenamecover' WHERE UserID = '$user_id';";   
         
      }
       
     
      $query =str_replace("\\" ,"/" , $query0);
       

   
      $stmt  = $this->conn->prepare($query);
      if ($stmt->execute()) {           
          return $stmt;
      } else {
          return false;
      }


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