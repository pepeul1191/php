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

	   		if(rpta['mensaje'][0] == 1){
	   			$('#mensajeCorreo').html('Correo ingresado ya se encuentra en uso');
	   			$('#mensajeCorreo').removeClass('oculto');
	   		}else{
	   			$('#mensajeCorreo').html('');
	   			$('#mensajeCorreo').addClass('oculto');
	   		}
	   }
	});
});

$('#txtCorreo').on('focusout', function(event) {
	var correo = $(event.currentTarget).val();
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var rpta = re.test(correo);

	if(rpta == false){
		$('#mensajeCorreo').html('Correo ingresado no es de un formato válido');
		$('#mensajeCorreo').removeClass('oculto');
	}else{
		$('#mensajeCorreo').html('');
		$('#mensajeCorreo').addClass('oculto');
	}
});

$('#txtCorreoRepetido').on('focusout', function(event) {;
	var correo = $(txtCorreo).val();
	var correo_repetido = $(txtCorreoRepetido).val();
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var rpta = re.test(correo_repetido);

	if(rpta == false){
		$('#mensajeCorreoRepetido').html('Correo ingresado no es de un formato válido');
		$('#mensajeCorreoRepetido').removeClass('oculto');
	}else{
		if(correo != correo_repetido){
			$('#mensajeCorreoRepetido').html('El correo ingresado no coincide con el primero');
			$('#mensajeCorreoRepetido').removeClass('oculto');
		}else{
			$('#mensajeCorreoRepetido').html('');
			$('#mensajeCorreoRepetido').addClass('oculto');
		}
	}
});

$('#txtUsuario').on('keyup', function(event) {
	var usuario = $(event.currentTarget).val();
	
	$.ajax({
	   url: BASE_URL + 'usuario/usuario_repetido?usuario=' + usuario, 
	   type: "POST", 
	   async: false, 
	   success: function(data) {
	   		var rpta = JSON.parse(data);

	   		if(rpta['mensaje'][0] == 1){
	   			$('#mensajeUsuario').html('Usuario ingresado ya se encuentra en uso');
	   		}else{
	   			$('#mensajeUsuario').html('');
	   		}
	   }
	});
});