<?php

class DistritoController extends Controller
{
   public static function listar($provincia_id)
   {
   	echo json_encode(Model::factory('Distrito')->select('id')->select('nombre')->where('provincia_id', $provincia_id)->find_array());
   }

   public static function buscar()
   {
     echo json_encode(Model::factory('VWDistritoProvinciaDepartamento')->select('id')->select('nombre')->where_like('nombre', Flight::request()->query['nombre'] . '%')->limit(10)->find_array());
   }

   public static function buscar_vista($distrito_id)
   {
		echo json_encode(Model::factory('VWDistritoProvinciaDepartamento')->select('nombre')->where('id', $distrito_id)->find_one()->as_array());
   }

   public static function crear()
	{
		$rpta = null;

		try {
			$data = json_decode(Flight::request()->data['data']);
			$provincia_id = $data->{'provincia_id'};
			$nombre = $data->{'nombre'};
			$distrito = Model::factory('Distrito')->create();

			$distrito->nombre = $nombre;
			$distrito->provincia_id = $provincia_id;
			$distrito->save();
			$id_generado = $distrito->id();
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha creado un distrito', $id_generado];
		} catch (Exception $e) {
		    #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en crear el distrito', $e->getMessage()];
		}

		echo json_encode($rpta);
	}   

	public static function editar()
	{
		$rpta = null;

		try {
			$data = json_decode(Flight::request()->data['data']);
			$id = $data->{'id'};
			$nombre = $data->{'nombre'};

			$distrito = Model::factory('Distrito')->find_one($id);
			$distrito->nombre = $nombre;
			$distrito->save();
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha editado un distrito'];
		} catch (Exception $e) {
		    #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en editar el distrito', $e->getMessage()];
		}

		echo json_encode($rpta);
	}

	public static function eliminar()
	{
		$rpta = null;

		try {
			$id = Flight::request()->query['id'];

			$distrito = Model::factory('Distrito')->find_one($id);
			$distrito->delete();
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha eliminado un distrito'];
		} catch (Exception $e) {
		    #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en eliminar el distrito', $e->getMessage()];
		}

		echo json_encode($rpta);
	}
}

?>
