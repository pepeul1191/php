<?php

class DepartamentoController extends Controller
{
	public static function listar()
   {
     	echo json_encode(Model::factory('Departamento')->find_array());
   }

	public static function crear()
	{
		$rpta = null;

		try {
			$nombre = Flight::request()->query['nombre'];
			$departamento = Model::factory('Departamento')->create();

			$departamento->nombre = $nombre;
			$departamento->save();
			$id_generado = $departamento->id();
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha editado un departamento', $id_generado];
		} catch (Exception $e) {
		    #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en crear el departamento', $e->getMessage()];
		}

		echo json_encode($rpta);
	}   

	public static function editar()
	{
		$rpta = null;

		try {
			$id = Flight::request()->query['id'];
			$nombre = Flight::request()->query['nombre'];

			$departamento = Model::factory('Departamento')->find_one($id);
			$departamento->nombre = $nombre;
			$departamento->save();
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha editado un departamento'];
		} catch (Exception $e) {
		    #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en editar el departamento', $e->getMessage()];
		}

		echo json_encode($rpta);
	}

	public static function eliminar()
	{
		$rpta = null;

		try {
			$id = Flight::request()->query['id'];

			$departamento = Model::factory('Departamento')->find_one($id);
			$departamento->delete();
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha eliminado un departamento'];
		} catch (Exception $e) {
		    #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en eliminar el departamento', $e->getMessage()];
		}

		echo json_encode($rpta);
	}
}

?>
