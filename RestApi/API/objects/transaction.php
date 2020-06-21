<?php

include_once __DIR__.'/../configration/database.php';

class Transaction extends Database
{
    public $conn;
    private $table_name = 'tbl_transactions';
    private $id;
    private $status;

    public function __construct()
    {
        $this->conn = $this->getConnection();
    }

    /**
     * @param $val
     * @return $this
     */
    public function setId($val) {
        if (!is_numeric($val) || $val > 0) {
            new Exception('ID is invalid');
        }
        $this->id = $val;

        return $this;
    }

    /**
     * @param $val
     * @return $this
     */
    public function setStatus($val) {
        if (!is_bool($val)) {
            new Exception('Status is invalid');
        }
        $this->status = $val;

        return $this;
    }

    public function getAllTransaction()
    {
        $query = 'SELECT * FROM tbl_transactions ORDER BY transaction_date DESC';
        $stmt = $this
            ->conn
            ->prepare($query);

        if ($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function getTransactionInvoiceWise()
    {
        $query = 'SELECT
                o.invoice_id,
                t.invoice_no,
                t.transaction_no,
                SUM(IF(t.status = 1, Amount, 0)) as active_amount,
                SUM(t.Amount) as total_amount,
                DATE_FORMAT(t.transaction_date, \'%d/%m/%Y\') AS transaction_date,
                t.currency
            FROM tbl_transactions t
            LEFT JOIN tbl_orders o ON o.invoice_id = t.id
            GROUP BY t.invoice_no
            ORDER BY t.transaction_date DESC';

        $stmt = $this
            ->conn
            ->prepare($query);

        if ($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function updateStatus()
    {
        try {
            $sql = 'UPDATE tbl_transactions SET status = :status WHERE id = :id';
            $stmt = $this
                ->conn
                ->prepare($sql);
            $stmt->bindParam(':status', $this->status, PDO::PARAM_BOOL);
            $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
            $stmt->execute();
        } catch (Exception $e) {
            return false;
        }

        return true;
    }

    public function getProductsByInvoiceNo($invoiceNo)
    {
        $query = "SELECT
            t.invoice_no,
            t.transaction_no,
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
        FROM tbl_transactions t
        INNER JOIN tbl_orders o ON t.id = o.invoice_id
        INNER JOIN tbl_product p ON p.id = o.product_id
        LEFT JOIN tbl_product_attribute pa ON pa.id = o.product_attribute_id
        LEFT JOIN tbl_category c ON c.id = p.category_id
        LEFT JOIN tbl_user u ON u.UserID = o.user_id
        WHERE t.invoice_no = :invoice_no";

        $stmt = $this
            ->conn
            ->prepare($query);
        $stmt->bindParam(':invoice_no', $invoiceNo);
        if ($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }
}

?>