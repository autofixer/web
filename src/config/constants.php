<?php

/**
 * @package constants
 * You can define your constants here
*/
/** @var Lightroom\Core\GlobalConstants $set */
$set->NONE = null;
$set->GET = 'GET';
$set->POST = 'POST';
$set->DELETE = 'DELETE';
$set->PUT = 'PUT';
$set->FETCH_NAMED = PDO::FETCH_NAMED;
$set->FETCH_ASSOC = PDO::FETCH_ASSOC;
$set->FETCH_LAZY = PDO::FETCH_LAZY;
$set->FETCH_NUM = PDO::FETCH_NUM;
$set->FETCH_BOTH = PDO::FETCH_BOTH;
$set->FETCH_OBJ = PDO::FETCH_OBJ;
$set->FETCH_BOUND = PDO::FETCH_BOUND;
$set->FETCH_COLUMN = PDO::FETCH_COLUMN;
$set->FETCH_CLASS = PDO::FETCH_CLASS;
$set->FETCH_INTO = PDO::FETCH_INTO;
$set->FETCH_GROUP = PDO::FETCH_GROUP;
$set->FETCH_UNIQUE = PDO::FETCH_UNIQUE;
$set->FETCH_FUNC = PDO::FETCH_FUNC;
$set->FETCH_KEY_PAIR = PDO::FETCH_KEY_PAIR;
$set->FETCH_CLASSTYPE = PDO::FETCH_CLASSTYPE;
$set->FETCH_SERIALIZE = PDO::FETCH_SERIALIZE;
$set->FETCH_PROPS_LATE = PDO::FETCH_PROPS_LATE;
$set->REDIRECT_DATA_ONLY = true;
$set->CAN_CONTINUE = true;
$set->STOP = false;
$set->URL_ENCODE = true;
$set->NO_PREFIX = 'no prefix for table name';
$set->DEFAULT_DATABASE = 'default.database';
$set->ENABLE_CACHING = true;

// get host
$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'localhost:';

// use development constants
if (preg_match('/(localhost)(:[0-9]+)/', $host)) :

    // set services
    $set->SERVICES_API = 'http://localhost:8888/autofixer/services/fatapi';

else:

    // set services
    $set->SERVICES_API = 'https://api.autofixer.com.ng';

endif;