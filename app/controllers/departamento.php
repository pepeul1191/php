<?php

class Controller_Departamento extends Controller
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
				    $id_generado = self::crear($nuevo->{'nombre'});
				    $temp = [];
				    $temp['temporal'] = $nuevo->{'id'};
	              $temp['nuevo_id'] = $id_generado;
	              array_push( $array_nuevos, $temp );
				}
			}
			if(count($editados) > 0){
				foreach ($editados as &$editado) {
					self::editar($editado->{'id'}, $editado->{'nombre'});
				}
			}
			if(count($eliminados) > 0){
				foreach ($eliminados as &$eliminado) {
			    	self::eliminar((int)$eliminado);
				}
			}
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha registrado los cambios en los departamentos', $array_nuevos];
		} catch (Exception $e) {
		    #echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en guardar la tabla de departamentos', $e->getMessage()];
		}

		echo json_encode($rpta);
	}

    public static function listar()
    {
    		$departamentos = Controller::load_model('departamentos');
        	echo json_encode($departamentos->listar());
    }

    public static function crear($nombre)
    {
    	$departamentos = Controller::load_model('departamentos');
		return $departamentos->crear($nombre);
    }

    public static function editar($id, $nombre)
    {
    	$departamentos = Controller::load_model('departamentos');
		$departamentos->editar($id, $nombre);
    }

    public static function eliminar($id)
    {
    	$departamentos = Controller::load_model('departamentos');
		$departamentos->eliminar($id);
    }
}

?>
