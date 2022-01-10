<?php
namespace Lightroom\Templates\Happy\Web\Plugins;

/**
 * @package Plugins Views
 * @author Amadi Ifeanyi <amadiify.com>
 */
class Views
{
    /**
     * @var string $templateBody
     */
    private $templateBody = 'View Autogenerated';

    /**
     * @method Views loadView
     * @param string $view
     * @param string $directory
     * @param string $extension
     * @return string
     */
    public function loadView(string $view, string $directory, string $extension) : string 
    {
        // get filename
        $fileArray = explode("/", $view);
        $filename = end($fileArray);

        // check if '.' exists in filename
        $filename = strrpos($filename, '.') !== false ? substr($filename, 0, strrpos($filename, '.')) : $filename;

        // determine size of fileArray, load subfolder if greater than 1
        switch (count($fileArray) == 1) :
        
            // load from <CONT>/views/
            case true:
                $filenames = $fileArray[0];
            break;

            // load from <CONT>/views/<SUBPATH>/
            case false:

                // change folder
                if (substr($fileArray[0], 0, 2) == './') :
                
                    $folder = preg_replace('/^(.\/)/', '', $fileArray[0]);
                    unset($fileArray[0]);

                endif;

                // load filename
                $filename = implode('/', $fileArray);
            break;

        endswitch;

        // get view path
        $viewpath = $directory . '/' . $filename . '.' . $extension;

        // check if $view is a file and for existance.
        if (is_file($view) && file_exists($view)) $viewpath = $view;

        // here we can load subscribers.
        $viewpath = rtrim($viewpath, '/');

        // lets check if view doesn't exists in path then create
        if (!file_exists($viewpath) && is_dir($directory) && strlen($filename) > 1) :
        
            // create directory or file
            $view = str_replace($filename, '', $view);

            // check if directory exists within $render
            if (strlen($view) > 1) :
            
                // right trim '/'
                $view = rtrim($view, '/');

                // define directory
                $directory = $directory . '/' . $view;

                // unformatted
                $directoryCopy = $directory;
                
                // format directory
                $directory = str_replace(' ', '/', ucwords(str_replace('/', ' ', $directory)));

                // create directory if doesn't exists
                if (!is_dir($directory) && strlen($directory) > 1) :
                
                    // create directory
                    mkdir($directory);

                    // replace directory from view path to formatted path.
                    $viewpath = str_replace($directoryCopy, $directory, $viewpath);

                endif;

                // clone view
                $subpath =& $view;

            endif;

            $viewpath = preg_replace('/[\/]{2,}/', '/', $viewpath);

            // create view if it doesn't exists
            if (!file_exists($viewpath)) $this->createViewFile($viewpath, $directory);

        endif;

        return $viewpath;
    }

    /**
     * @method Views loadTemplateFile
     * @param mixed $templateFile
     * @return void
     */
    public function loadTemplateFile($templateFile) : void
    {
        //  handle file path
        if (is_string($templateFile) && file_exists($templateFile)) $this->templateBody = file_get_contents($templateFile);
        
        // handle closure
        if ($templateFile !== null && is_callable($templateFile)) $this->templateBody = $templateFile;
    }

    /**
     * @method Views getTemplateBody
     * @param string $viewpath
     * @return string
     */
    private function getTemplateBody(string $viewpath) : string 
    {
        // @var string $templateBody
        $templateBody = '';

        // handle closure function
        if (is_callable($this->templateBody) && $this->templateBody !== null):

            $templateBody = call_user_func($this->templateBody, $viewpath);

        endif;

        // load template body
        if (is_string($this->templateBody)) $templateBody = $this->templateBody;

        // return string
        return $templateBody;
    }

    /**
     * @method Views createViewFile
     * @param string $viewpath
     * @param string $directory
     * @return void
     */
    private function createViewFile(string $viewpath, string $directory) : void
    {
        // check and create folder.
        $base = basename($viewpath);
        $dir = rtrim($viewpath, $base);

        // remove directory from dir
        $viewDirectory = trim(str_replace($directory . '/', '', $dir));

        if ($viewDirectory != '' && !is_dir($viewDirectory)) :
        
            // @var array viewDirectory
            $viewDirectory = explode('/', $viewDirectory);

            // @var string $breadcum
            $breadcum = '';

            foreach ($viewDirectory as $folder) :
            
                if (preg_match('/[a-zA-Z\_\-\0-9]+/', $folder)) :

                    if ($breadcum == '') :
                    
                        $breadcum .= $folder . '/';
                    
                    else:
                    
                        $breadcum .= $folder . '/';

                    endif;

                    // @var string $dir
                    $dir = $directory .  '/' . $breadcum;

                    // make directory
                    if (!is_dir($dir)) mkdir($dir);

                endif;

            endforeach;

        endif;

        if (is_dir($dir)) :
        
            // create view
            $fh = fopen($viewpath, 'w+');
            fwrite($fh, $this->getTemplateBody($viewpath));
            fclose($fh);

        endif;
    }
}