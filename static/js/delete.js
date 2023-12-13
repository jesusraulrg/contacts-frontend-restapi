const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
const token = sessionStorage.getItem('token');

function getContactDetails() {
    var request = new XMLHttpRequest();
    request.open('GET', "https://contacts-backend-5491847c74b7.herokuapp.com/contactos/" + email);
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.send();

    request.onload = (e) => {
        const response = request.responseText;
        const json = JSON.parse(response);

        document.getElementById('email').textContent = json.email;
        document.getElementById('nombre').textContent = json.nombre;
        document.getElementById('telefono').textContent = json.telefono;
        console.log(json.email);
    };
}

window.onload = getContactDetails;

function goBack() {
    window.history.back();
}

function deleteContact() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://contacts-backend-5491847c74b7.herokuapp.com/login');
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.send();

    request.onload = () => {
        if (request.status === 200) {
            if (confirm("¿Deseas eliminar este contacto?")) {
                var deleteRequest = new XMLHttpRequest();
                deleteRequest.open('DELETE', "https://contacts-backend-5491847c74b7.herokuapp.com/contactos/" + email);
                deleteRequest.setRequestHeader('Authorization', 'Bearer ' + token);
                deleteRequest.send();

                deleteRequest.onload = (e) => {
                    const deleteResponse = deleteRequest.responseText;
                    const deleteJson = JSON.parse(deleteResponse);

                    alert("Contacto eliminado exitosamente");
                    window.history.back();
                    window.location.href = "/contactos";
                };
            }
        }
    };
}
