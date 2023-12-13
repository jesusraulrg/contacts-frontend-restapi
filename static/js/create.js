function createContact() {
    const token = sessionStorage.getItem('token');
    console.log(sessionStorage.getItem('token'));

    const email = document.getElementById('email').value;
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;

    if (!email || !nombre || !telefono) {
        alert('Por favor completa los campos');
        return;
    }

    const request = new XMLHttpRequest();
    const url = 'http://127.0.0.1:8000/contactos';

    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', `Bearer ${token}`);

    const requestBody = JSON.stringify({
        email,
        nombre,
        telefono
    });

    try {
        request.send(requestBody);

        request.onload = () => {
            if (request.status === 200) {
                document.getElementById('email').value = '';
                document.getElementById('nombre').value = '';
                document.getElementById('telefono').value = '';
                alert('Datos guardados exitosamente');
                window.location.href = '/contactos';
            } else {
                console.error('Error al enviar datos:', request.status, request.statusText);

                if (request.status === 400) {
                    alert('El contacto ya existe. Ingresa un email diferente.');
                } else {
                    alert('Ocurrió un problema al guardar los datos. Por favor, ingrese un correo diferente.');
                }
            }
        };
    } catch (error) {
        console.error('Error durante la solicitud:', error);
        alert('Ocurrió un error durante la solicitud. Por favor, inténtelo de nuevo.');
    }
}
