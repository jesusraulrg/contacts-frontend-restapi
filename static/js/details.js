const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
const token = sessionStorage.getItem('token');

function getContactDetails() {
    var requestToken = new XMLHttpRequest(); // Cambiado de 'request' a 'requestToken'
    requestToken.open('GET', 'https://contacts-backend-5491847c74b7.herokuapp.com/login');
    requestToken.setRequestHeader('Authorization', 'Bearer ' + token);
    requestToken.send();

    requestToken.onload = () => {
        if (requestToken.status === 200) {
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
        } else {
            console.error("Error al validar el token. Código de estado:", requestToken.status);
            // Manejo de errores al validar el token
        }
    };
}

window.onload = getContactDetails;

function goBack() {
    window.history.back();
}
