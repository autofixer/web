<?php

use Lightroom\Adapter\ClassManager;
use Lightroom\Exceptions\ClassNotFound;
use Lightroom\Packager\Moorexa\Helpers\Assets;

/**
 * @method Assets Asset
 * @return Assets
 * @throws ClassNotFound
 */
function assets() : Assets 
{
    return ClassManager::singleton(Assets::class);
}

/**
 * @method Assets assets_image
 * @param string $image
 * @return string
 * @throws ClassNotFound
 * @throws Exception
 */
function assets_image(string $image) : string
{
    return assets()->image($image);
}

/**
 * @method Assets assets_js
 * @param string $js
 * @return string
 * @throws ClassNotFound
 * @throws Exception
 */
function assets_js(string $js) : string
{
    return assets()->js($js);
}

/**
 * @method Assets assets_media
 * @param string $media
 * @return string
 * @throws ClassNotFound
 */
function assets_media(string $media) : string
{
    return assets()->media($media);
}

/**
 * @method Assets assets_css
 * @param string $css
 * @return string
 * @throws ClassNotFound
 * @throws Exception
 */
function assets_css(string $css) : string
{
    return assets()->css($css);
}

/**
 * @method \Lightroom\Adapter\URL web_url
 * @param string $path
 * @return string
 */
function web_url(string $path) : string
{
    return func()->url($path);
}

/**
 * @method \Lightroom\Adapter\URL web_secure_url
 * @param string $path
 * @return string
 */
function web_secure_url(string $path) : string
{
    return func()->url(rawurlencode($path));
}