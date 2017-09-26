<?php

require 'app/vendor/autoload.php';
require_once 'app/config/database.php';

header('x-powered-by: PHP');
header('Server: Ubuntu');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Content-type: text/html; charset=UTF-8');

define('KEY', '9fo0lOias2f6Z');

Configuration::init( realpath(dirname(__FILE__)) . '/app/', 'http://localhost/parcial/', realpath(dirname(__FILE__) . '/db/' . 'db_ubicaciones.db'));

Flight::set('flight.views.path', 'app/views');

Flight::route('GET /', array('IndexController','index'));
Flight::route('GET /error/404', array('ErrorController','error_404'));

//Flight::route('POST /departamento/guardar', array('DepartamentoController','guardar'));
//Flight::route('POST /provincia/guardar', array('ProvinciaController','guardar'));
//Flight::route('POST /distrito/guardar', array('DistritoController','guardar'));
//Flight::route('GET /distrito/buscar', array('DistritoController','buscar'));
//Flight::route('GET /distrito/buscar_vista/@distrito_id', array('DistritoController','buscar_vista'));
Flight::route('GET /key', array('CipherController','key'));
Flight::route('POST /encode', array('CipherController','encode'));
Flight::route('POST /decode', array('CipherController','decode'));
Flight::route('GET /login', array('ParcialController','login'));
Flight::route('GET /home', array('ParcialController','home'));
Flight::route('GET /departamento/listar', array('DepartamentoController','listar'));
Flight::route('POST /departamento/crear', array('DepartamentoController','crear'));
Flight::route('POST /departamento/editar', array('DepartamentoController','editar'));
Flight::route('POST /departamento/eliminar', array('DepartamentoController','eliminar'));
Flight::route('GET /provincia/listar/@departamento_id', array('ProvinciaController','listar'));
Flight::route('POST /provincia/crear', array('ProvinciaController','crear'));
Flight::route('POST /provincia/editar', array('ProvinciaController','editar'));
Flight::route('POST /provincia/eliminar', array('ProvinciaController','eliminar'));
Flight::route('GET /distrito/listar/@provincia_id', array('DistritoController','listar'));
Flight::route('POST /distrito/crear', array('DistritoController','crear'));
Flight::route('POST /distrito/editar', array('DistritoController','editar'));
Flight::route('POST /distrito/eliminar', array('DistritoController','eliminar'));


/*
Flight::map('notFound', function(){
	header('HTTP/1.0 404 Not Found');
	Flight::redirect('/error/404');
});
*/
Flight::start();

?>
