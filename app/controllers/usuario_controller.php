<?php

class UsuarioController extends Controller
{
    public static function correo_repetido()
    {
        $correo = Flight::request()->query['correo'];
        $rpta = null;

        try {
            $cantidad = Model::factory('Usuario')->select('id')->where('correo', $correo)->count();
            $rpta['tipo_mensaje'] = 'success';
            $rpta['mensaje'] = [$cantidad];
        } catch (Exception $e) {
            #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
            $rpta['tipo_mensaje'] = 'error';
            $rpta['mensaje'] = ['Se ha producido un error en verificar si el correo es repetido', $e->getMessage()];
        }

        echo json_encode($rpta);
    }

    public static function usuario_repetido()
    {
        $usuario = Flight::request()->query['usuario'];
        $rpta = null;

        try {
            $cantidad = Model::factory('Usuario')->select('id')->where('usuario', $usuario)->count();
            $rpta['tipo_mensaje'] = 'success';
            $rpta['mensaje'] = [$cantidad];
        } catch (Exception $e) {
            #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
            $rpta['tipo_mensaje'] = 'error';
            $rpta['mensaje'] = ['Se ha producido un error en verificar si el nombre usuario es repetido', $e->getMessage()];
        }

        echo json_encode($rpta);
    }

    public static function guardar()
    {
        $data = json_decode(Flight::request()->query['data']);
        $usuario_nombre = $data->{'usuario'};
        $correo = $data->{'correo'};
        $contrasenia = $data->{'contrasenia'};
        $rpta = null;

        try {
            $usuario = Model::factory('Usuario')->create();
            $usuario->usuario = $usuario_nombre;
            $usuario->correo = $correo;
            $usuario->contrasenia = $contrasenia;
            $usuario->save();
            $rpta['tipo_mensaje'] = 'success';
        } catch (Exception $e) {
            #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
            $rpta['tipo_mensaje'] = 'error';
            $rpta['mensaje'] = ['Se ha producido un error en registrar al usuario', $e->getMessage()];
        }

        echo json_encode($rpta);
    }

    public static function validar()
    {
        $usuario = Flight::request()->query['usuario'];
        $contrasenia = Flight::request()->query['contrasenia'];
        $rpta = null;

        try {
            $cantidad = Model::factory('Usuario')->select('id')->where('usuario', $usuario)->where('contrasenia', $contrasenia)->count();
            $rpta['tipo_mensaje'] = 'success';
            $rpta['mensaje'] = [$cantidad];
        } catch (Exception $e) {
            #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
            $rpta['tipo_mensaje'] = 'error';
            $rpta['mensaje'] = ['Se ha producido un error en verificar si el nombre usuario es repetido', $e->getMessage()];
        }

        echo json_encode($rpta);
    }
}

?>