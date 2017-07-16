/*
NOTE:
Este es un script que valida los datos ingresados por el usuario.
Notifica que los datos hayan sido enviados correctamente.
*/

$(document).ready(() => {
  console.log("Script cargado");

  // NOTE: Obtenemos los datos del formulario.
  $('#formulario').submit( (e) => {
    let formData;
    e.preventDefault();
    // NOTE: cargamos los datos del correo para ejecutar la validación previa.
    let correo = $('#correo').val();
    let validador = validacionCorreo(correo);
    if( validador === true){
       formData = $('#formulario').serialize();
      console.log("datos serializados");
    }
    //console.log(JSON.stringify(formData));
    // NOTE: Usamos ajax para enviar los datos al servidor.
    $.ajax({
      type: "POST",
      url: "form-process.php",
      data: formData,
      dataType: 'json',
      success: function(resp, status){
        if(status === 'success'){
          // NOTE: usamos la funcion para generar los contenidos que se renderizan a traves de las llamadas AJAX:
          notific8('Mensaje enviado correctamente', {
            theme: 'atomic',
            color: 'cerulean'
          });
          addDataToDOM(resp);
        }
        else{
          console.log(status);
        }
      }
    });
  });

  // NOTE: creamos una funcion que valida el correo. Tiene valores de retornos que son asignados a una nueva variable. Utilizamos el objeto RegExp para validar el correo.
  function validacionCorreo(correo){
    const regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    let email = correo;
    if (regex.test(email)){
      return true;
    }
    else {
      return false;
    }
  }

  // NOTE: la funcion recibe un argumento que en este caso corresponde la respuesta de la llamada AJAX.
  function addDataToDOM(par1){
    // NOTE: archivo a cargar con el esqueleto del DOM.
    let file = 'respAjax.html';
    let obj = par1;
    // NOTE: Generamos una funcion que recibe como parametro el archivo a cargar, ademas del objeto recibido en la respuesta.
    dataDOM(obj, file);
  }

  function dataDOM(data, fileToLoad){
    // NOTE: dentro del callback de la funcion colocamos los elementos del resultado del procesamiento de los datos. Esto nos da la ventaja de poder persistir los elementos del DOM creados.
    // NOTE: la funcion load() recibe tres parametro relevantes: el archivo a cargar, los datos a procesar y una funcion callback en donde procesamos el DOM en razon de las respuestas de status.
    $('#respuesta').load(fileToLoad, data, (resp, status) => {
      if (status === 'success'){
        console.log(status);
        let nombre = data.nombre;
        let telefono = data.telefono;
        let correo = data.email;
        let mensaje = data.mensaje;
        $('#contenido').append(`<h1>Datos personales</h1>`);
        $('#contenido').append(`<p class="lead">Nombre: ${nombre}</h1>`);
        $('#contenido').append(`<p>Telefono: ${telefono}</p>`);
        $('#contenido').append(`<p>Correo: ${correo}</p>`);
        $('#contenido').append(`<p>${mensaje}</p>`);
      } else {
        console.log(status);
        $('#contenido').append(`<h2>No se pudo cargar los datos!</h2>`);
      }

    });
  }
});
