# Accesos SQLite - PP

### Tecnologías

+ PHP (5.3+)
+ SQLite3
+ Composer

### Instalación - Despliegue

 	$ composer update

### Para recargar el autoload de clases:

 	$ composer dump-autoload -o

 Thanks/Credits

    Pepe Valdivia: developer Software Web Perú [http://softweb.pe]

### Descipción

Servicio web desarrollado en PHP usando el framework FlightPHP, con patrones de diseño front-controller y distpacher y la interfaz de Idiorm para interactuar con la base de datos.

### SERVICIOS

+ (1) POST : usuario/correo_repetido
+ (2) POST : usuario/usuario_repetido
+ (3) POST : cipher/encode
+ (4) POST : usuario/guardar
+ (5) POST : usuario/validar

### PREGUNTAS

1) Si "Acepto los Términos y Condiciones" está checkado, los campos y el botón del Formulario de Registro deberá estar habilitado, caso contrario estarán desabilitados.
2) Cada vez que precione una tecla al escribir el Correo, se deberá llamar al servicio (1), el cuál validará que el correo no se encuentre en uso. En caso que el servicio web diga que el correo ya se encuentra en uso, se deberá mostrar un mensaje en el formulario diciendo que el correo ingresado ya se encuentra en uso. Una vez corregido el error, el mensaje deberá borrarse. 
3) Cuando se escriba el Correo Repetir y se salga de ese input[text], se deberá validar que el correo repetido coincida con el Correo. En caso que no coincidan deberá ser mostrado un mensaje en el formulario diciendo que el segundo correo no coincide con el primero. Una vez corregido el error, el mensaje deberá borrarse.
4) Cuando se salga del input[text] de Correo y Correo Repetir, se deberá validar que el texto ingresado sea un correo electrónico válido. En caso que no sean un correo electrónico válido deberá ser mostrado un mensaje en el formulario diciendo que el error ocurrido. Una vez corregido el error, el mensaje deberá borrarse.
5) Cada vez que precione una tecla al escribir el Usuario, se deberá llamar al servicio (2), el cuál validará que el usuario no se encuentre en uso. En caso que el servicio web diga que el usuario ya se encuentra en uso, se deberá mostrar un mensaje en el formulario diciendo que el usuario ingresado ya se encuentra en uso.
6) Cuando se salga del input[text] de Repetir Contraseña, se deberá validar que el texto ingresado coincida con Contraseña. En caso que no coincidan, deberá ser mostrado un mensaje en el formulario diciendo que el error ocurrido. Una vez corregido el error, el mensaje deberá borrarse.
7) Si al apretar el botón Guardar Cambios no se han solucionado los errores de validación de los campos del formulario, no se deberá mandar los datos del formulario al servidor.
8) En caso que los campos del formulario pasen sus respectivas validaciones, antes de ser enviado dichos campos al servidor, la contraseña deberá ser encriptada usando el servicio (3). Una vez que se encripte la contraseña usando dicho servicio, se deberá mandar los campos del formulario al servicio(4), el cuál se encargará de guardar los datos de usuario y devolver un mensaje. Dicho mensaje deberá ser mostrado en el formulario.
9) Una vez registrado el usuario, se deberá ingresar al formulario de login, y al usuario el usuario y contraseña recién creados, se deberá validar dicho usuario y contraseña contra el servicio (5). Si la validación es satisfactoria, se deberá redireccionar a una vista del requerimiento (10), en caso contrario, se deberá mostrar un mensaje indicando que el "Usuario y/o contraseña no coinciden".


--- 

#### Fuentes

Sequel - ORM a la base de datos

+ http://idiorm.readthedocs.io/
	
Framework FlightPHP :

+ http://flightphp.com/

Composer :
+ http://phpenthusiast.com/blog/how-to-autoload-with-composer

Otros:
+ http://www.smarty.net/