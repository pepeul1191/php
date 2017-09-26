<?php

class ProvinciaController extends Controller
{
    public static function listar($departamento_id)
    {
      echo json_encode(Model::factory('Provincia')->select('id')->select('nombre')->where('departamento_id', $departamento_id)->find_array());
    }

    public static function crear()
	{
		$rpta = null;

		try {
			$departamento_id = Flight::request()->query['departamento_id'];
			$nombre = Flight::request()->query['nombre'];
			$provincia = Model::factory('Provincia')->create();

			$provincia->nombre = $nombre;
			$provincia->departamento_id = $departamento_id;
			$provincia->save();
			$id_generado = $provincia->id();
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha creado un provincia', $id_generado];
		} catch (Exception $e) {
		    #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en crear el provincia', $e->getMessage()];
		}

		echo json_encode($rpta);
	}   

	public static function editar()
	{
		$rpta = null;

		try {
			$id = Flight::request()->query['id'];
			$nombre = Flight::request()->query['nombre'];

			$provincia = Model::factory('Provincia')->find_one($id);
			$provincia->nombre = $nombre;
			$provincia->save();
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha editado un provincia'];
		} catch (Exception $e) {
		    #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en editar el provincia', $e->getMessage()];
		}

		echo json_encode($rpta);
	}

	public static function eliminar()
	{
		$rpta = null;

		try {
			$id = Flight::request()->query['id'];

			$provincia = Model::factory('Provincia')->find_one($id);
			$provincia->delete();
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha eliminado un provincia'];
		} catch (Exception $e) {
		    #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en eliminar el provincia', $e->getMessage()];
		}

		echo json_encode($rpta);
	}
}

?>
