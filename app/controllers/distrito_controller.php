<?php

class DistritoController extends Controller
{
  public static function guardar()
	{
		$data = json_decode(Flight::request()->query['data']);
		$nuevos = $data->{'nuevos'};
		$editados = $data->{'editados'};
		$eliminados = $data->{'eliminados'};
		$rpta = []; $array_nuevos = [];

    try {
			if(count($nuevos) > 0){
				foreach ($nuevos as &$nuevo) {
				   $distrito = Model::factory('Distrito')->create();
					$distrito->nombre = $nuevo->{'nombre'};
					$distrito->save();
					$id_generado = $distrito->id();
				   $temp = [];
				   $temp['temporal'] = $nuevo->{'id'};
	            $temp['nuevo_id'] = $id_generado;
	            array_push( $array_nuevos, $temp );
				}
			}
			if(count($editados) > 0){
				foreach ($editados as &$editado) {
					$distrito = Model::factory('Distrito')->find_one($editado->{'id'});
					$distrito->nombre = $editado->{'nombre'};
					$distrito->save();
				}
			}
			if(count($eliminados) > 0){
				foreach ($eliminados as &$eliminado) {
			    	$distrito = Model::factory('Distrito')->find_one($eliminado);
					$distrito->delete();
				}
			}
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha registrado los cambios en los distritos', $array_nuevos];
		} catch (Exception $e) {
		    #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en guardar la tabla de distritos', $e->getMessage()];
		}

		echo json_encode($rpta);
	}

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
}

?>
