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
        $query = 'SELECT * FROM tbl_transactions ORDER BY id DESC';
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
}

?>