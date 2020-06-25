<?php

class Order
{

    private $conn;
    private $table_name = "tbl_orders";
    public $id;
    public $user_id;
    public $product_id;
    public $issue_date;
    public $delivered_date;
    public $status;
    public $order_quantity;
    public $instoackquantity;
    public $address_id;
    // order table attributes 
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

    public $varient_id;
    public $subtotal;
    public $saveinfo;
    ///////////////////////
    public $transaction_status;
    public $inovice_no;
    public $transaction_no;
    public $invoice_id;
    public $currency;
    public $error_message;
    public $success_message;
    public $transaction_date;
    // user
    public $User_role;
    public $UserName;
    public $FirstName;
    public $LastName;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function Update($orderid)
    {

        $query = " UPDATE tbl_orders SET          
          `issue_date` = '$this->issue_date',
          `delivered_date` = '$this->delivered_date',
          `status` = b'$this->status',
          `order_quantity` = '$this->order_quantity',
          `order_total_price` = '$this->subtotal',
          `contact_number` = '$this->contact_number',
          `billing_street_address` = '$this->billing_street_address',
          `billing_city_address` = '$this->billing_city_address',
          `billing_state_address` = '$this->billing_state_address',
          `billing_country_address` ='$this->billing_country_address',
          `billing_zip`  ='$this->billing_zip',
          `shipping_street_address`  ='$this->shipping_street_address',
          `shipping_city_address` = '$this->shipping_city_address',
          `shipping_state_address` = '$this->shipping_state_address',
          `shipping_country_address` = '$this->shipping_country_address',
          `shipping_zip` = '$this->shipping_zip'
          WHERE id = '$orderid';";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }


    function create_new()
    {

        $this->conn->beginTransaction();

        $this->varient_id = (int)$this->varient_id;
        if ($this->saveinfo && $this->user_id) {
            $query = " INSERT INTO `tbl_address` 
                (`contact_number`,`UserID` ,`billing_street_address`, `billing_city_address`, `billing_state_address`, `billing_country_address`, `billing_zip`,
                 `shipping_street_address`, `shipping_city_address`, `shipping_state_address`, `shipping_country_address`, `shipping_zip`) 
    
                VALUES (:contact_number,'$this->user_id', :billing_street_address, :billing_city_address, :billing_state_address, :billing_country_address, :billing_zip, 
                :shipping_street_address, :shipping_city_address, :shipping_state_address, :shipping_country_address, :shipping_zip);";

            $stmt = $this->conn->prepare($query);
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

            // bind values
            $stmt->bindParam(":contact_number", $this->contact_number);
            $stmt->bindParam(":billing_street_address", $this->billing_street_address);
            $stmt->bindParam(":billing_city_address", $this->billing_city_address);
            $stmt->bindParam(":billing_state_address", $this->billing_state_address);
            $stmt->bindParam(":billing_country_address", $this->billing_country_address);
            $stmt->bindParam(":billing_zip", $this->billing_zip);
            $stmt->bindParam(":shipping_street_address", $this->shipping_street_address);
            $stmt->bindParam(":shipping_city_address", $this->shipping_city_address);
            $stmt->bindParam(":shipping_state_address", $this->shipping_state_address);
            $stmt->bindParam(":shipping_country_address", $this->shipping_country_address);
            $stmt->bindParam(":shipping_zip", $this->shipping_zip);

            if ($stmt->execute()) {
                $this->address_id = $this->conn->lastInsertId();
            } else {
                echo json_encode(array("message" => "Unable to get address."));
            }
        }

        $query = "SELECT quantity FROM tbl_product_attribute WHERE id = :id;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->varient_id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            $this->instoackquantity = $stmt->fetchColumn();
            if (!$this->instoackquantity) {
                echo json_encode(array(
                    "message" => "low quantity..."
                ));
                return false;
            }
        } else {
            $this->conn->rollBack();
            echo json_encode(array("message" => "Unable to get quantity."));
            return fasle;
        }

        $this->inovice_no = htmlspecialchars(strip_tags($this->inovice_no));
        $this->transaction_no = ($this->transaction_no);
        $this->transaction_status = $this->transaction_status == "true" ? 1 : 0;
        $this->subtotal = htmlspecialchars(strip_tags($this->subtotal));
        $this->currency = htmlspecialchars(strip_tags($this->currency));
        $this->error_message = htmlspecialchars(strip_tags($this->error_message));
        $this->success_message = htmlspecialchars(strip_tags($this->success_message));
        $this->transaction_date = htmlspecialchars(strip_tags($this->transaction_date));

        $query = "INSERT INTO `tbl_transactions` (`user_id`, `invoice_no`, `transaction_no`, `status`, `Amount`, `transaction_date`, `error_meassge`, `success_message`, `currency`)
                VALUES ('$this->user_id', '$this->inovice_no', '$this->transaction_no', b'$this->transaction_status','$this->subtotal','$this->transaction_date'
                ,'$this->error_message','$this->success_message','$this->currency')";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            $this->invoice_id = $this->conn->lastInsertId();
        } else {
            $this->conn->rollBack();
            echo json_encode(array("message" => "Unable to get transaction at local ."));
            return false;
        }

        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $this->order_quantity = htmlspecialchars(strip_tags($this->order_quantity));
        $this->subtotal = htmlspecialchars(strip_tags($this->subtotal));
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

        $query = "INSERT INTO $this->table_name (`user_id`, `product_id`, `product_attribute_id`, `order_quantity` ,`order_total_price`,`contact_number`,
                                            `billing_street_address`, `billing_city_address`, `billing_state_address`, `billing_country_address`, `billing_zip`,
                                            `shipping_street_address`, `shipping_city_address`, `shipping_state_address`, `shipping_country_address`, `shipping_zip`,`invoice_id`)  


            VALUES ('$this->user_id', '$this->product_id', $this->varient_id, '$this->order_quantity ', $this->subtotal,'$this->contact_number', '$this->billing_street_address',
            '$this->billing_city_address', '$this->billing_state_address', '$this->billing_country_address', '$this->billing_zip','$this->shipping_street_address',
            '$this->shipping_city_address', '$this->shipping_state_address', '$this->shipping_country_address', '$this->shipping_zip','$this->invoice_id');";
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
        } else {
            $this->conn->rollBack();
            echo json_encode(array(
                "message" => "Unable to place order in orders table."
            ));
            return false;
        }
        $this->instoackquantity = (int)$this->instoackquantity - (int)$this->order_quantity;
        if ($this->instoackquantity < 0) {
            $this->conn->rollBack();
            echo json_encode(array(
                "message" => "Quantity could not be less than 0."
            ));
            return false;
        }

        $query = "UPDATE tbl_product_attribute 
                                SET quantity = :quantity , instock = :prodleft 
                                WHERE product_id = :product_id AND id  = :varient";
        $stmt = $this->conn->prepare($query);
        $this->instoackquantity = $this->instoackquantity;
        $prodleft = (int)$this->instoackquantity > 0 ? 1 : 0;
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $this->varient_id = htmlspecialchars(strip_tags($this->varient_id));
        $stmt->bindParam(":quantity", $this->instoackquantity);
        $stmt->bindParam(":prodleft", $prodleft, PDO::PARAM_BOOL);
        $stmt->bindParam(":product_id", $this->product_id);
        $stmt->bindParam(":varient", $this->varient_id);

        if (!$stmt->execute()) {
            $this->conn->rollBack();
            echo json_encode(array(
                "message" => "Unable to update stock in product attributes."
            ));
        }

        $this->conn->commit();
        return true;
    }


    function readid($id)
    {
        // select all query
        $query = "SELECT *,o.status AS orderstaus
        FROM tbl_orders o 
        JOIN tbl_transactions t ON t.id = o.invoice_id
        JOIN tbl_product_attribute a ON a.id = o.product_attribute_id
        WHERE o.user_id = '$id'
        ORDER BY issue_date DESC;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }


    function read()
    {
        // select all query
        $query = "SELECT *,o.status AS orderstaus, o.id AS OrderID
        FROM tbl_orders o JOIN 
        tbl_transactions t ON t.id = o.invoice_id       
        ORDER BY issue_date DESC;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }


    function delete($orderid)
    {
        // select all query   DELETE FROM `db_ecommerce`.`tbl_orders` WHERE  `id`=35;
        // select all query
        $query = "DELETE FROM tbl_orders where id = :id; ";
        $stmt = $this->conn->prepare($query);
        $orderid = htmlspecialchars(strip_tags($orderid));
        $stmt->bindParam(":id", $orderid);
        $stmt->execute();
        return $stmt;
    }

    function detailsByOrderId($orderId)
    {
        $query = "SELECT
            t.invoice_no,
            DATE_FORMAT(o.issue_date, '%d/%m/%Y') AS issue_date,
            DATE_FORMAT(o.delivered_date, '%d/%m/%Y') AS delivered_date,
            IF(o.status = 1, 'Delivered', 'Pending') as status,
            o.order_quantity as quantity,
            o.order_total_price as price,
            p.product_name,
            p.vendor,
            p.image_url,
            c.category,
            pa.color_option as color,
            pa.varient,
            CONCAT(u.FirstName, ' ', u.LastName) as name,
            CONCAT(
                o.billing_street_address, ', ',
                o.billing_city_address, ', ',
                o.billing_state_address, ', ',
                o.billing_country_address, ', ',
                o.billing_zip
            ) as billing_address,
            CONCAT(
                o.shipping_street_address, ', ',
                o.shipping_city_address, ', ',
                o.shipping_state_address, ', ',
                o.shipping_country_address, ', ',
                o.shipping_zip
            ) as shipping_address,
            o.contact_number,
            o.billing_street_address,
            o.billing_city_address,
            o.billing_state_address,
            o.billing_country_address,
            o.billing_zip,
            o.shipping_street_address,
            o.shipping_city_address,
            o.shipping_state_address,
            o.shipping_country_address,
            o.shipping_zip
        FROM tbl_orders o 
        LEFT JOIN tbl_transactions t ON t.id = o.invoice_id
        LEFT JOIN tbl_product p ON p.id = o.product_id
        LEFT JOIN tbl_product_attribute pa ON pa.id = o.product_attribute_id
        LEFT JOIN tbl_category c ON c.id = p.category_id
        LEFT JOIN tbl_user u ON u.UserID = o.user_id
        WHERE o.id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $orderId, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return [];
    }


}

?>