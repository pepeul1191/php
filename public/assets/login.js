const BASE_URL = 'http://localhost/parcial/';

$( "#linkModal" ).on( "click", function() {
    $('#btnModal').click();
});

$(document).ready(function() {
	var chkTerminosCondiciones = $('#chkTerminosCondiciones');
	var txtCorreo = $('#txtCorreo');
	var txtCorreoRepetido = $('#txtCorreoRepetido');
	var txtUsuario = $('#txtUsuario');
	var txtContrasenia = $('#txtContrasenia');
	var txtContraseniaRepetir = $('#txtContraseniaRepetir');
	var btnGuardar = $('#btnGuardar');

	$('#chkTerminosCondiciones').change(function() {
       if($(this).is(":checked")) {
       	//alert("si");
			txtCorreo.prop("disabled", false);
			txtCorreoRepetido.prop("disabled", false);
			txtUsuario.prop("disabled", false);
			txtContrasenia.prop("disabled", false);
			txtContraseniaRepetir.prop("disabled", false);
			btnGuardar.prop("disabled", false);
       }else{
       	//alert("no");
       	txtCorreo.prop("disabled", true);
			txtCorreoRepetido.prop("disabled", true);
			txtUsuario.prop("disabled", true);
			txtContrasenia.prop("disabled", true);
			txtContraseniaRepetir.prop("disabled", true);
			btnGuardar.prop("disabled", true);
       }
    });
});

$('#txtCorreo').on('keyup', function(event) {
	var correo = $(event.currentTarget).val();
	
	$.ajax({
	   url: BASE_URL + 'usuario/correo_repetido?correo=' + correo, 
	   type: "POST", 
	   async: false, 
	   success: function(data) {
	   		var rpta = JSON.parse(data);
	   		console.log(rpta['mensaje'][0]);
	   		if(rpta['mensaje'][0] == 1){
	   			$('#mensajeCorreo').html('Correo ingresado ya se encuentra en uso');
	   		}else{
	   			$('#mensajeCorreo').html('');
	   		}
	   }
	});
});