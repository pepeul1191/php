const BASE_URL = 'http://localhost/parcial/';

$(document).ready(function() {
    $.ajax({
	   url: BASE_URL + 'departamento/listar', 
	   type: "GET", 
	   async: false, 
	   success: function(data) {
	   		var departamentos = JSON.parse(data);
	   		var rpta =  '<thead><tr><th>id</th><th>Nombre</th><th>Operaciones</th></tr></thead>';
	   		for (var i = 0; i < departamentos.length; i++) {
			  	rpta = rpta + '<tr>';
			  	var operaciones = '<td><i class="fa fa-search" aria-hidden="true" operacion="cargarProvincia"></i><i class="fa fa-pencil" aria-hidden="true" operacion="editarDepartamento"></i><i class="fa fa-times" aria-hidden="true" operacion="eliminarDepartamento"></i></td>';
			  	rpta = rpta + '<td>' + departamentos[i]['id'] + '</td><td>' + '<input type="text" value="'+ departamentos[i]['nombre'] + '">' +'</td>' + operaciones;
			  	rpta = rpta + '</tr>';
			}
			rpta = rpta + '<tfoot><tr><td  colspan="3"><button class="btn btn-primary" id="btnAgregarDepartamento"><i class="fa fa-plus" aria-hidden="true"></i>Agregar Departamento</button></tr></td></tfoot>';
	   		
	   		$('#departamentos').append(rpta);
	   }
	});
});

$(document).on('click', '.fa', function(event) {
  	var operacion = $(event.currentTarget).attr('operacion');
  	
  	switch(operacion) {
  		//Inicio tabla departamento
	    case 'cargarProvincia':
	   		var departamentoId = $(event.currentTarget).parent().parent().children().eq(0).html();
	   		cargarProvincia(departamentoId);
			break;
	    case 'eliminarDepartamento':
	    	
			break;
		case 'editarDepartamento':

			break;
		//Inicio tabla provincia
		case 'eliminarProvincia':

			break;
		case 'editarProvincia':

			break;
		case 'cargarDistrito':
	   		var distritoId = $(event.currentTarget).parent().parent().children().eq(0).html();
	   		cargarDistrito(distritoId);
			break;
		//Inicio tabla distrito
		case 'eliminarDistrito':

			break;
		case 'editarDistrito':

			break;
	    default:
	       alert('Operacion ' + operacion + ' no implementada');
		} 
	});

function cargarProvincia(departamentoId){
	$('#distritos').empty();
	$('#provincias').empty();
	$('#departamentoId').html(departamentoId);

	$.ajax({
	   url: BASE_URL + 'provincia/listar/' + departamentoId, 
	   type: "GET", 
	   async: false, 
	   success: function(data) {
	   		var provincias = JSON.parse(data);
	   		var rpta =  '<thead><tr><th>id</th><th>Nombre</th><th>Operaciones</th></tr></thead>';
	   		for (var i = 0; i < provincias.length; i++) {
			  	rpta = rpta + '<tr>';
			  	var operaciones = '<td><i class="fa fa-search" aria-hidden="true" operacion="cargarDistrito"></i><i class="fa fa-pencil" aria-hidden="true" operacion="editarProvincia"></i><i class="fa fa-times" aria-hidden="true" operacion="eliminarProvincia"></i></td>';
			  	rpta = rpta + '<td>' + provincias[i]['id'] + '</td><td>' + '<input type="text" value="'+ provincias[i]['nombre'] + '">' +'</td>' + operaciones;
			  	rpta = rpta + '</tr>';
			}
			rpta = rpta + '<tfoot><tr><td  colspan="3"><button class="btn btn-primary" id="btnAgregarProvincia"><i class="fa fa-plus" aria-hidden="true"></i>Agregar Provincia</button></tr></td></tfoot>';
	   		
	   		$('#provincias').append(rpta);
	   }
	});
}

function cargarDistrito(provinciaId){
	$('#distritos').empty();
	$('#provincaiId').html(provinciaId);

	$.ajax({
	   url: BASE_URL + 'distrito/listar/' + provinciaId, 
	   type: "GET", 
	   async: false, 
	   success: function(data) {
	   		var distritos = JSON.parse(data);
	   		var rpta =  '<thead><tr><th>id</th><th>Nombre</th><th>Operaciones</th></tr></thead>';
	   		for (var i = 0; i < distritos.length; i++) {
			  	rpta = rpta + '<tr>';
			  	var operaciones = '<td style="padding-left:20px;"><i class="fa fa-pencil" aria-hidden="true" operacion="editarDistrito"></i><i class="fa fa-times" aria-hidden="true" operacion="eliminarDistrito"></i></td>';
			  	rpta = rpta + '<td>' + distritos[i]['id'] + '</td><td>' + '<input type="text" value="'+ distritos[i]['nombre'] + '">' +'</td>' + operaciones;
			  	rpta = rpta + '</tr>';
			}
			rpta = rpta + '<tfoot><tr><td  colspan="3"><button class="btn btn-primary" id="btnAgregarProvincia"><i class="fa fa-plus" aria-hidden="true"></i>Agregar Provincia</button></tr></td></tfoot>';
	   		
	   		$('#distritos').append(rpta);
	   }
	});
}