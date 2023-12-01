function createContact() {
    var email = document.getElementById('email').value;
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;

    if (!email || !nombre || !telefono) {
        alert('Por favor completa los campos');
        return;
    }

    var request = new XMLHttpRequest();
    var url = 'https://contacts-backend-5491847c74b7.herokuapp.com';

    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');

    var requestBody = JSON.stringify({
        email: email,
        nombre: nombre,
        telefono: telefono
    });

    request.send(requestBody);

    request.onload = function () {
        if (request.status === 200) {
            document.getElementById('email').value = '';
            document.getElementById('nombre').value = '';
            document.getElementById('telefono').value = '';
            alert('Datos guardados exitosamente');
        } else {
            console.error('Error al enviar datos:', request.status, request.statusText);

            if (request.status === 400) {
                alert('El contacto ya existe. Ingresa un email diferente.');
            } else {
                alert('Ocurrió un problema al guardar los datos. Por favor, ingrese un correo diferente.');
            }
        }
    };
}
