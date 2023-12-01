const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');

function obtenerDetallesDeContacto() {
    var solicitud = new XMLHttpRequest();
    solicitud.open('GET', "https://contacts-backend-5491847c74b7.herokuapp.com/contactos/" + email);
    solicitud.send();

    solicitud.onload = function() {
        if (solicitud.status === 200) {
            const respuesta = solicitud.responseText;
            const json = JSON.parse(respuesta);

            document.getElementById('email').value = json.email;
            document.getElementById('nombre').value = json.nombre;
            document.getElementById('telefono').value = json.telefono;
        } else {
            console.error('Error al obtener detalles de contacto:', solicitud.status, solicitud.statusText);
            alert('Error al obtener detalles de contacto. Por favor, inténtalo de nuevo más tarde.');
        }
    };
}

window.onload = obtenerDetallesDeContacto;

function regresar() {
    window.history.back();
}

function update() {
    var nuevoEmail = document.getElementById('email').value;
    var nuevoNombre = document.getElementById('nombre').value;
    var nuevoTelefono = document.getElementById('telefono').value;

    if (!nuevoEmail || !nuevoNombre || !nuevoTelefono) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (confirm("¿Desea actualizar el contacto?")) {
        var solicitud = new XMLHttpRequest();
        solicitud.open('PUT', "https://contacts-backend-5491847c74b7.herokuapp.com/contactos/" + email);
        solicitud.setRequestHeader("Content-Type", "application/json");

        var datosActualizados = {
            email: nuevoEmail,
            nombre: nuevoNombre,
            telefono: nuevoTelefono
        };

        solicitud.send(JSON.stringify(datosActualizados));

        solicitud.onload = function() {
            if (solicitud.status === 200) {
                alert("Contacto actualizado exitosamente");
                window.history.back();
                window.location.href = "/";
            } else {
                console.error('Error al actualizar detalles de contacto:', solicitud.status, solicitud.statusText);
                alert('Error al actualizar detalles de contacto. Por favor, inténtalo de nuevo más tarde.');
            }
        };
    }
}
