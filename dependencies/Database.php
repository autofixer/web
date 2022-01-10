<?php
namespace Dependencies;
use Closure;
/**
 * @package Database
 * @author Amadi Ifeanyi <amadiify.com>
 */
class Database
{
    /**
     * @var array $records
     */
    private $records = [];

    /**
     * @var mixed $rows 
     */
    private $rows;

    /**
     * @var string $filePath
     */
    private $filePath = '';

    /**
     * @method Database get
     * @param string $table 
     * @param array $where
     * @param array $replacement
     * @return Database
     */
    public function query(string $table, array $where = [], array $replacement = []) : Database 
    {
        // read table
        $this->filePath = HOME . 'db/' . $table . '.json';

        // check if file exists
        if (file_exists($this->filePath)) :

            // read from file
            $this->records = $this->rows = json_decode(file_get_contents($this->filePath));

            // check if we have a where clause
            if (count($where) > 0) :

                // check records
                switch(is_array($this->records)):

                    // an array
                    case true:

                        if (count($this->records) > 0) :

                            // @var array $record
                            $records = [];

                            // run loop
                            foreach ($this->records as $index => $record) :

                                // @var int $whereCount 
                                $whereCount = 0;

                                // run loop on where
                                foreach ($where as $key => $val) :

                                    // compare key
                                    if (isset($record->{$key}) && $record->{$key} == $val) $whereCount++;

                                endforeach;

                                // add to record
                                if ($whereCount == count($where)) :

                                    // update record
                                    if (count($replacement) > 0) :

                                        foreach ($replacement as $key => $val) : 

                                            if (isset($record->{$key})) $record->{$key} = $val;

                                        endforeach;

                                        // update records
                                        $this->records[$index] = $record;

                                    endif;

                                    // add to local records
                                    $records[] = $record;

                                endif;

                            endforeach;

                            // update private records
                            $this->rows = $records;

                        endif;
                    break;

                    // not an array
                    case false:
                        if (is_object($this->records)):
                        endif;
                    break;

                endswitch;

            endif;

        endif;

        // return records
        return $this;
    }

    /**
     * @method Database hasRecord
     * @return bool
     */
    public function hasRecord() : bool 
    {
        // @var bool $hasRecord 
        $hasRecord = false;

        // is array and has record[s]
        if (is_array($this->rows) && count($this->rows) > 0) $hasRecord = true;

        // check object
        if (is_object($this->rows)) $hasRecord = true;

        // return bool
        return $hasRecord;
    }

    /**
     * @method Database rowCount
     * @return int
     */
    public function rowCount() : int 
    {
        // return rows
        return (is_array($this->rows) ? count($this->rows) : (is_object($this->rows) ? 1 : 0));
    }

    /**
     * @method Database get 
     * @return mixed 
     */
    public function get()
    {
        // @var mixed $data 
        $data = null;

        // check if record exists
        if ($this->hasRecord()) :

            // update data
            $data = $this->rows;

            if (is_array($this->rows)) :

                // check length
                if ($this->rowCount() == 1) : $data = $this->rows[0]; endif;

            endif;

        endif;

        // return data
        return $data;
    }

    /**
     * @method Database getAll 
     * @return mixed 
     */
    public function getAll()
    {
        // @var mixed $data 
        $data = null;

        // check if record exists
        if ($this->hasRecord()) :

            // update data
            $data = $this->rows;

            if (is_array($this->rows)) :

                // fetch all
                $data = $this->rows;

            endif;

        endif;

        // return data
        return $data;
    }

    /**
     * @method Database update
     * @return bool
     */
    public function update() : bool
    {
        // @var bool $updated
        $updated = false;

        // do we have records?
        if ($this->hasRecord()) :

            // update file path
            file_put_contents($this->filePath, json_encode($this->records, JSON_PRETTY_PRINT));

            // is updated
            $updated = true;

        endif;

        // return bool
        return $updated;
    }

    /**
     * @method Database insert
     * @param array $data 
     * @return bool
     */
    public function insert(Closure $container, array $data = []) : bool
    {
        // @var bool $updated
        $updated = false;

        // set the next index 
        $index = (is_array($this->records) ? count($this->records) : (is_object($this->records) ? 1 : 0)) + 1;

        // run callback
        call_user_func_array($container, [$index, &$data]);

        // is object previously
        if (is_object($this->records)) :

            // create array
            $this->records = [$this->records, $data];

        elseif (is_array($this->records)) :

            // add to records
            $this->records[] = $data;

        endif;

        // check file path 
        if ($this->filePath != '' && file_exists($this->filePath) && $this->records !== null) :

            // update file path
            file_put_contents($this->filePath, json_encode($this->records, JSON_PRETTY_PRINT));

            // update bool
            $updated = true;

        endif;

        // return bool
        return $updated;
    } 

    /**
     * @method Database delete
     * @param array $where
     * @return bool
     */
    public function delete(array $where) : bool
    {
        // @var bool $deleted 
        $deleted = false;

        // check if we have a where clause
        if (count($where) > 0) :

            // check records
            switch(is_array($this->records)):

                // an array
                case true:

                    if (count($this->records) > 0) :

                        // run loop
                        foreach ($this->records as $index => $record) :

                            // @var int $whereCount 
                            $whereCount = 0;

                            // run loop on where
                            foreach ($where as $key => $val) :

                                // compare key
                                if (isset($record->{$key}) && $record->{$key} == $val) $whereCount++;

                            endforeach;

                            // add to record
                            if ($whereCount == count($where)) :

                                // remove record
                                unset($this->records[$index]);

                            endif;

                        endforeach;

                    endif;
                break;

                // not an array
                case false:
                    if (is_object($this->records)):
                    endif;
                break;

            endswitch;

            // check file path 
            if ($this->filePath != '' && file_exists($this->filePath) && $this->records !== null) :

                // update file path
                file_put_contents($this->filePath, json_encode($this->records, JSON_PRETTY_PRINT));

                // update bool
                $deleted = true;

            endif;

        endif;

        // return bool
        return $deleted;
    }
}