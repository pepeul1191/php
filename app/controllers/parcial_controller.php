<?php

class ParcialController extends Controller
{
    public static function login()
    {
        Flight::render('login.php', array('name' => 'Bob'));    
    }

    public static function home()
    {
    		Flight::render('home.php');    	
    }
}

?>
