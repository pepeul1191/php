const BASE_URL = 'http://localhost/parcial/';

$(document).ready(function() {
    $.ajax({
	   url: BASE_URL + 'departamento/listar', 
	   type: "GET", 
	   async: false, 
	   success: function(data) {
	   		var departamentos = JSON.parse(data);
	   		var rpta =  '<thead><tr><th>id</th><th>Nombre</th><th>Operaciones</th></tr></thead>';
	   		rpta = rpta + '<tbody>';
	   		for (var i = 0; i < departamentos.length; i++) {
			  	rpta = rpta + '<tr>';
			  	var operaciones = '<td><i class="fa fa-search" aria-hidden="true" operacion="cargarProvincia"></i><i class="fa fa-pencil" aria-hidden="true" operacion="editarDepartamento"></i><i class="fa fa-times" aria-hidden="true" operacion="eliminarDepartamento"></i></td>';
			  	rpta = rpta + '<td>' + departamentos[i]['id'] + '</td><td>' + '<input type="text" value="'+ departamentos[i]['nombre'] + '">' +'</td>' + operaciones;
			  	rpta = rpta + '</tr>';
			}
			rpta = rpta + '</tbody>';
			rpta = rpta + '<tfoot><tr><td  colspan="3"><button class="btn btn-primary" id="btnAgregarDepartamento"><i class="fa fa-plus" aria-hidden="true"></i>Agregar Departamento</button></tr></td></tfoot>';
	   		
	   		$('#departamentos').append(rpta);
	   }
	});
});

$(document).on('click', '.btn', function(event) {
	var id_boton = $(event.currentTarget).attr('id');
	
	switch(id_boton) {
  		//Inicio tabla departamento
	    case 'btnAgregarDepartamento':
	   		var fila = '<tr><td><label></label></td><td><input type="text"></td><td><i class="fa fa-plus" aria-hidden="true" operacion="crearDepartamento"></i><i class="fa fa-times" aria-hidden="true" operacion="eliminarFila"></i></td></tr>'; 
	   		$('#departamentos tbody').append(fila);
			break;
	    case 'btnAgregarProvincia':
	    	var fila = '<tr><td><label></label></td><td><input type="text"></td><td><i class="fa fa-plus" aria-hidden="true" operacion="crearProvincia"></i><i class="fa fa-times" aria-hidden="true" operacion="eliminarFila"></i></td></tr>'; 
	   		$('#provincias tbody').append(fila);
			break;
		case 'btnAgregarDistrito':
			var fila = '<tr><td><label></label></td><td><input type="text"></td><td><i class="fa fa-plus" aria-hidden="true" operacion="crearDistrito"></i><i class="fa fa-times" aria-hidden="true" operacion="eliminarFila"></i></td></tr>'; 
	   		$('#distritos tbody').append(fila);
			break;
	    default:
	       alert('Operacion ' + operacion + ' no implementada');
		} 
});

$(document).on('click', '.fa', function(event) {
  	var operacion = $(event.currentTarget).attr('operacion');
  	
  	switch(operacion) {
  		//Inicio tabla departamento
	    case 'cargarProvincia':
	   		var departamentoId = $(event.currentTarget).parent().parent().children().eq(0).html();
	   		cargarProvincia(departamentoId);
			break;
		case 'crearDepartamento':
			var departamentoNombre = $(event.currentTarget).parent().parent().children().eq(1).children().val();
	   		var fila = $(event.currentTarget).parent().parent();
	   		crearDepartamento(departamentoNombre, fila);
			break;
	    case 'eliminarDepartamento':
	    	var departamentoId = $(event.currentTarget).parent().parent().children().eq(0).html();
	    	var fila = $(event.currentTarget).parent().parent();
	    	eliminarDepartamento(departamentoId, fila);
			break;
		case 'editarDepartamento':
			var departamentoId = $(event.currentTarget).parent().parent().children().eq(0).html();
	    	var departamentoNombre = $(event.currentTarget).parent().parent().children().eq(1).children().val();
	    	editarDepartamento(departamentoId, departamentoNombre);
			break;
		//Inicio tabla provincia
		case 'eliminarProvincia':
			var provinciaId = $(event.currentTarget).parent().parent().children().eq(0).html();
	    	var fila = $(event.currentTarget).parent().parent();
	    	eliminarProvincia(provinciaId, fila);
			break;
		case 'editarProvincia':
			var provinciaId = $(event.currentTarget).parent().parent().children().eq(0).html();
	    	var provinciaNombre = $(event.currentTarget).parent().parent().children().eq(1).children().val();
	    	editarProvincia(provinciaId, provinciaNombre);
			break;
		case 'cargarDistrito':
	   		var distritoId = $(event.currentTarget).parent().parent().children().eq(0).html();
	   		cargarDistrito(distritoId);
			break;
		//Inicio tabla distrito
		case 'eliminarDistrito':
			var distritoId = $(event.currentTarget).parent().parent().children().eq(0).html();
	    	var fila = $(event.currentTarget).parent().parent();
	    	eliminarDistrito(distritoId, fila);
			break;
		case 'editarDistrito':
			var distritoId = $(event.currentTarget).parent().parent().children().eq(0).html();
	    	var distritoNombre = $(event.currentTarget).parent().parent().children().eq(1).children().val();
	    	editarDistrito(distritoId, distritoNombre);
			break;
		//Inicio nuevo
		case 'eliminarFila':
			var fila = $(event.currentTarget).parent().parent();
	    	fila.remove();   
			break;
	    default:
	       alert('Operacion ' + operacion + ' no implementada');
		} 
	});

/*++++++++++++++++++++++++ DEPARTAMENTOS ++++++++++++++++++++++++ */

function eliminarDepartamento(departamentoId, fila){
	$('#distritos').empty();
	$('#provincias').empty();
	
	$.ajax({
	   url: BASE_URL + 'departamento/eliminar?id=' + departamentoId, 
	   type: "POST", 
	   async: false, 
	   success: function(data) {
	   		var rpta = JSON.parse(data);
	   		$('#departamentosMensaje').html(rpta['mensaje']);
	   		if(rpta['tipo_mensaje']=='error'){
	   			$('#departamentosMensaje').removeClass('success');
	   			$('#departamentosMensaje').addClass('error');
	   		}else{
	   			$('#departamentosMensaje').removeClass('error');
	   			$('#departamentosMensaje').addClass('success');
	   		}
			fila.remove();   			   		
	   }
	});
}

function crearDepartamento(departamentoNombre, fila){
	$.ajax({
	   url: BASE_URL + 'departamento/crear?nombre=' + departamentoNombre, 
	   type: "POST", 
	   async: false, 
	   success: function(data) {
	   		var rpta = JSON.parse(data);
	   		
	   		fila.children().eq(0).html(rpta['mensaje'][1]);
	   		fila.children().eq(2).empty();
	   		fila.children().eq(2).append('<i class="fa fa-search" aria-hidden="true" operacion="cargarProvincia"></i><i class="fa fa-pencil" aria-hidden="true" operacion="editarDepartamento"></i><i class="fa fa-times" aria-hidden="true" operacion="eliminarDepartamento"></i>');

	   		$('#departamentosMensaje').html(rpta['mensaje'][0]);
	   		if(rpta['tipo_mensaje']=='error'){
	   			$('#departamentosMensaje').removeClass('success');
	   			$('#departamentosMensaje').addClass('error');
	   		}else{
	   			$('#departamentosMensaje').removeClass('error');
	   			$('#departamentosMensaje').addClass('success');
	   		}			   		
	   }
	});
}

function editarDepartamento(departamentoId, departamentoNombre){
	$.ajax({
	   url: BASE_URL + 'departamento/editar?id=' + departamentoId + '&nombre=' + departamentoNombre, 
	   type: "POST", 
	   async: false, 
	   success: function(data) {
	   		var rpta = JSON.parse(data);
	   		$('#departamentosMensaje').html(rpta['mensaje']);
	   		if(rpta['tipo_mensaje']=='error'){
	   			$('#departamentosMensaje').removeClass('success');
	   			$('#departamentosMensaje').addClass('error');
	   		}else{
	   			$('#departamentosMensaje').removeClass('error');
	   			$('#departamentosMensaje').addClass('success');
	   		}		   		
	   }
	});
}

/*++++++++++++++++++++++++ PROVINCIAS ++++++++++++++++++++++++ */

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
	   		rpta = rpta + '<tbody>';
	   		for (var i = 0; i < provincias.length; i++) {
			  	rpta = rpta + '<tr>';
			  	var operaciones = '<td><i class="fa fa-search" aria-hidden="true" operacion="cargarDistrito"></i><i class="fa fa-pencil" aria-hidden="true" operacion="editarProvincia"></i><i class="fa fa-times" aria-hidden="true" operacion="eliminarProvincia"></i></td>';
			  	rpta = rpta + '<td>' + provincias[i]['id'] + '</td><td>' + '<input type="text" value="'+ provincias[i]['nombre'] + '">' +'</td>' + operaciones;
			  	rpta = rpta + '</tr>';
			}
			rpta = rpta + '</tbody>';
			rpta = rpta + '<tfoot><tr><td  colspan="3"><button class="btn btn-primary" id="btnAgregarProvincia"><i class="fa fa-plus" aria-hidden="true"></i>Agregar Provincia</button></tr></td></tfoot>';
	   		
	   		$('#provincias').append(rpta);
	   }
	});
}

function eliminarProvincia(provinciaId, fila){
	$('#distritos').empty();
	
	$.ajax({
	   url: BASE_URL + 'provincia/eliminar?id=' + provinciaId, 
	   type: "POST", 
	   async: false, 
	   success: function(data) {
	   		var rpta = JSON.parse(data);
	   		$('#provinciasMensaje').html(rpta['mensaje']);
	   		if(rpta['tipo_mensaje']=='error'){
	   			$('#provinciasMensaje').removeClass('success');
	   			$('#provinciasMensaje').addClass('error');
	   		}else{
	   			$('#provinciasMensaje').removeClass('error');
	   			$('#provinciasMensaje').addClass('success');
	   		}
			fila.remove();   			   		
	   }
	});
}

function editarProvincia(provinciaId, provinciaNombre){	
	$.ajax({
	   url: BASE_URL + 'provincia/editar?id=' + provinciaId + '&nombre=' + provinciaNombre, 
	   type: "POST", 
	   async: false, 
	   success: function(data) {
	   		var rpta = JSON.parse(data);
	   		$('#provinciasMensaje').html(rpta['mensaje']);
	   		if(rpta['tipo_mensaje']=='error'){
	   			$('#provinciasMensaje').removeClass('success');
	   			$('#provinciasMensaje').addClass('error');
	   		}else{
	   			$('#provinciasMensaje').removeClass('error');
	   			$('#provinciasMensaje').addClass('success');
	   		}		   		
	   }
	});
}


/*++++++++++++++++++++++++ DISTRITOS ++++++++++++++++++++++++ */

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
	   		rpta = rpta + '<tbody>';
	   		for (var i = 0; i < distritos.length; i++) {
			  	rpta = rpta + '<tr>';
			  	var operaciones = '<td style="padding-left:20px;"><i class="fa fa-pencil" aria-hidden="true" operacion="editarDistrito"></i><i class="fa fa-times" aria-hidden="true" operacion="eliminarDistrito"></i></td>';
			  	rpta = rpta + '<td>' + distritos[i]['id'] + '</td><td>' + '<input type="text" value="'+ distritos[i]['nombre'] + '">' +'</td>' + operaciones;
			  	rpta = rpta + '</tr>';
			}
			rpta = rpta + '</tbody>';
			rpta = rpta + '<tfoot><tr><td  colspan="3"><button class="btn btn-primary" id="btnAgregarDistrito"><i class="fa fa-plus" aria-hidden="true"></i>Agregar Distrito</button></tr></td></tfoot>';
	   		
	   		$('#distritos').append(rpta);
	   }
	});
}

function eliminarDistrito(distritoId, fila){
	$.ajax({
	   url: BASE_URL + 'distrito/eliminar?id=' + distritoId, 
	   type: "POST", 
	   async: false, 
	   success: function(data) {
	   		var rpta = JSON.parse(data);
	   		$('#distritosMensaje').html(rpta['mensaje']);
	   		if(rpta['tipo_mensaje']=='error'){
	   			$('#distritosMensaje').removeClass('success');
	   			$('#distritosMensaje').addClass('error');
	   		}else{
	   			$('#distritosMensaje').removeClass('error');
	   			$('#distritosMensaje').addClass('success');
	   		}
			fila.remove();   			   		
	   }
	});
}

function editarDistrito(distritoId, distritoNombre){	
	$.ajax({
	   url: BASE_URL + 'distrito/editar?id=' + distritoId + '&nombre=' + distritoNombre, 
	   type: "POST", 
	   async: false, 
	   success: function(data) {
	   		var rpta = JSON.parse(data);
	   		$('#distritosMensaje').html(rpta['mensaje']);
	   		if(rpta['tipo_mensaje']=='error'){
	   			$('#distritosMensaje').removeClass('success');
	   			$('#distritosMensaje').addClass('error');
	   		}else{
	   			$('#distritosMensaje').removeClass('error');
	   			$('#distritosMensaje').addClass('success');
	   		}		   		
	   }
	});
}