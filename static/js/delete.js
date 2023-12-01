const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');

function getContactDetails() {
    var request = new XMLHttpRequest();
    request.open('GET', "http://127.0.0.1:8000/contactos/" + email);
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
    if (confirm("¿Deseas eliminar este contacto?")) {
        var request = new XMLHttpRequest();
        request.open('DELETE', "http://127.0.0.1:8000/contactos/" + email);
        request.send();

        request.onload = (e) => {
            const response = request.responseText;
            const json = JSON.parse(response);
            
            alert("Contacto eliminado exitosamente");
            window.history.back();
            window.location.href = "/";
            
        };
    }
}
