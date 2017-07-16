<?php
/* NOTE: para efectos de testear comunicacion con el servidor.
// Se ejecuta una respuesta, que es luego vista por la consola del navegador.
print_r(json_encode($_POST));
*/

$nombre = $_POST['nombre'];
$telefono = $_POST['telefono'];
$email = $_POST['email'];
$mensaje = $_POST['mensaje'];

$mensaje = $nombre . $telefono . $email . $mensaje;

//$resultado = mail("nriquelme@santiagolab.cl", "Mensaje de prueba  ", $mensaje);

print_r(json_encode($_POST));
 ?>
