<?php
namespace Dependencies;

use function Lightroom\Requests\Functions\{session};
/**
 * @package Session
 * @author Amadi Ifeanyi <amadiify.com>
 */
class Session
{
    /**
     * @method Session isAuthenticated
     * @return bool
     */
    public static function isAuthenticated() : bool 
    {
        // @var bool $authenticated 
        $authenticated = false;

        // session has basic auth 
        if (session()->has('user.basic.auth')) :

            // get token
            $token = session()->get('user.basic.auth');

            // check database
            if (app('jsondb')->query('tokens', ['token' => $token])->hasRecord()) $authenticated = true;

        endif;

        // return bool
        return $authenticated;
    }

    /**
     * @method Session authorizeConnection
     * @param string $token
     * @param string $username
     * @return void
     */
    public static function authorizeConnection(string $token, string $username)
    {
        // session has basic auth 
        if (!session()->has('user.basic.auth')) :

            // set token 
            session()->set('user.basic.auth', $token);

            // set the user name
            session()->set('user.name', $username);

            // add to db
            app('jsondb')->query('tokens')->insert(function($index, $data){

                // set the data
                $data['id'] = $index;

            }, [
                'token' => $token
            ]);

        endif;
    }

    /**
     * @method Session endSession
     * @return bool
     */
    public static function endSession() : bool 
    {
        // @var bool $successful 
        $successful = false;

        // session has basic auth 
        if (session()->has('user.basic.auth')) :

            // get token
            $token = session()->get('user.basic.auth');

            // drop token
            session()->dropMultiple('user.basic.auth', 'user.name');

            // run delete operation
            if (app('jsondb')->query('tokens')->delete(['token' => $token])) $successful = true;

        endif;

        // return bool
        return $successful;
    }
}