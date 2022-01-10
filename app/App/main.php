<?php
namespace Moorexa\Framework;

use Lightroom\Packager\Moorexa\MVC\Controller;
use function Lightroom\Requests\Functions\{get};
use function Lightroom\Templates\Functions\{render, redirect, json, view};
/**
 * Documentation for App Page can be found in App/readme.txt
 *
 *@package      App Page
 *@author       Moorexa <www.moorexa.com>
 *@author       Amadi Ifeanyi <amadiify.com>
 **/

class App extends Controller
{
    /**
    * @method App home
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/

    public function home() : void 
    {
        // set title
        view()->setTitle('Welcome to AUTOFIXER Nigeria');

        // render view
        $this->view->render('home');
    }

    /**
    * @method App contact
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function contact() : void
    {
        // set title
        view()->setTitle('Contact us');

        // render view
        $this->view->render('contact');
    }

    /**
    * @method App aboutUs
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function aboutUs() : void
    {
        // set title
        view()->setTitle('About us');

        // render view
        $this->view->render('aboutus');
    }

    /**
    * @method App whatWeDo
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function whatWeDo() : void
    {
        // set title
        view()->setTitle('What we do');

        // render view
        $this->view->render('whatwedo');
    }

    /**
    * @method App whatWeDontDo
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function whatWeDontDo() : void
    {
        // set title
        view()->setTitle('What we don\'t do');

        // render view
        $this->view->render('whatwedontdo');
    }

    /**
    * @method App services
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function services($service) : void
    {
        // export to js
        app('assets')->exportVars([
            'service' => $service
        ]);

        // set title
        view()->setTitle(($service == '' ? 'Our Services' : $service . ' Service'));

        // render view
        $this->view->render('services');
    }

    /**
    * @method App faq
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function faq() : void
    {
        // set title
        view()->setTitle('Frequently asked questions');

        // render view
        $this->view->render('faq');
    }

    /**
    * @method App issues
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function issues() : void
    {
        // set title
        view()->setTitle('Releated issues');

        // render view
        $this->view->render('issues');
    }

    /**
    * @method App bookOnline
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function bookOnline() : void
    {
        // set title
        view()->setTitle('Book Online');

        // render view
        $this->view->render('bookonline');
    }

    /**
    * @method App testimonials
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function testimonials() : void
    {
        // set title
        view()->setTitle('Testimonials');

        // render view
        $this->view->render('testimonials');
    }

    /**
    * @method App getAQuote
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function getAQuote($option) : void
    {
        // set title
        view()->setTitle('Request for a quote');

        // is success ?
        if ($option == 'success') :

            // redirect
            redirect('get-a-quote', [
                'status' => 'success', 
                'message' => 'You Request has been submitted successfully. You will be contact shortly'
            ]);

        endif;

        // read response
        $response = redirect('', [], 'get-a-quote');

        // update option
        $option = $response->has('status') ? $response->data() : null;

        // render view
        $this->view->render('getaquote', ['option' => $option]);
    }

    /**
    * @method App membership
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function membership() : void
    {
        $this->view->render('membership');
    }

    /**
    * @method App notification
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function notification() : void
    {
        $this->view->render('notification');
    }

    /**
    * @method App job
    *
    * See documentation https://www.moorexa.com/doc/controller
    *
    * You can catch params sent through the $_GET request
    * @return void
    **/
    public function job() : void
    {
        // set title
        view()->setTitle('Job Information');

        if (!get()->has('utm')) $this->view->redirect('home');

        // decode
        $decodedData = json_decode(base64_decode(get()->utm));

        // failed
        if (!is_object($decodedData)) $this->view->redirect('home');

        // completed ? 
        if ($decodedData->status->name == 'completed') $this->view->redirect('home');

        // render view
        $this->view->render('job', ['data' => $decodedData]);
    }
}
// END class