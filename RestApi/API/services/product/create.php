<?php
// required headers

include_once '../../configration/database.php';
include_once '../../objects/product.php'; 

// instantiate database and product object
$database = new Database();
$conn     = $database->getConnection();

// JWT TOKEN VALIDATION
$data = json_decode(file_get_contents("php://input"));
// Public $image;


$product = new Product($conn);

// make sure data is not empty
if (is_string($data->product_name) && is_string($data->vendor) && is_string($data->description) && is_string($data->category_id)) 
{


  $product->product_name = $data->product_name;
  $product->vendor = $data->vendor;
  $product->description = $data->description;
  $product->category_id = $data->category_id;
  
    
    // create the product
    if ($product->create()) {
        
        http_response_code(200);
    } else {
        
        http_response_code(503);
        
        echo json_encode(array(
            "message" => "Unable to create product."
        ));
    }
}

else {
    
    http_response_code(400);
    echo json_encode(array(
        "message" => "Unable to create order. Data is incomplete."
    ));
}


// $filename = md5(uniqid());
// $folderPathimage ="productimages/".$filename.".png";  
// $orignal_image = create_thumbnail($image,0,0); 

// function create_thumbnail($attr,$width,$height)
// {
//     $image = imagecreatefromstring(base64_decode($attr));          

//         ob_start();
//         if ($height != 0 && $width != 0)
//         {
//             $size_info2 = getimagesizefromstring(base64_decode($attr));
//             $old_x = $size_info2[0];
//             $old_y = $size_info2[1];

//             if($old_x > $old_y) 
//             {
//                 $thumb_w =  $width;
//                 $thumb_h =  $old_y*($height/$old_x);
//             }
        
//             if($old_x < $old_y) 
//             {
//                 $thumb_w = $old_x*($width/$old_y);
//                 $thumb_h = $height;
//             }
        
//             if($old_x == $old_y) 
//             {
//                 $thumb_w = $width;
//                 $thumb_h = $height;
//             }

//             $dst_img = ImageCreateTrueColor($thumb_w,$thumb_h);
//             imagecopyresampled($dst_img,$image,0,0,0,0,$thumb_w,$thumb_h,$old_x,$old_y);
//             $image = $dst_img;
//             imagepng($image);
//         }  
//         else
//         {
//         imagepng($image);
//         } 
       
//         $contents =  ob_get_contents();        
//         ob_end_clean();  
//         return $contents;
// }
?>