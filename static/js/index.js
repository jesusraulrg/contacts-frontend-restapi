function getContacts() {
    var token = sessionStorage.getItem('token');
    console.log(sessionStorage.getItem('token'));

    var requestToken = new XMLHttpRequest();
    requestToken.open('GET', 'https://contacts-backend-5491847c74b7.herokuapp.com/login', true);
    requestToken.setRequestHeader('Authorization', 'Bearer ' + token);

    requestToken.onload = () => {
        if (requestToken.status === 200) {
            const URL = "https://contacts-backend-5491847c74b7.herokuapp.com/contactos";

            var requestContacts = new XMLHttpRequest();
            requestContacts.open('GET', URL);
            requestContacts.setRequestHeader('Authorization', 'Bearer ' + token);

            requestContacts.onload = () => {
                if (requestContacts.status === 200) {
                    const responseContacts = JSON.parse(requestContacts.responseText);
                    console.log("response: ", responseContacts);

                    displayContacts(responseContacts);
                } else {
                    console.error("Error al obtener contactos. Código de estado:", requestContacts.status);
                }
            };

            requestContacts.send();
        } else {
            console.error("Error al obtener el token. Código de estado:", requestToken.status);
        }
    };

    requestToken.send();
}

function displayContacts(contacts) {
    const tbody_contactos = document.getElementById("tbody_contactos");
    tbody_contactos.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        var tr = document.createElement("tr");
        var td_email = document.createElement("td");
        var td_nombre = document.createElement("td");
        var td_telefono = document.createElement("td");
        var td_opciones = document.createElement("td");

        td_email.innerHTML = contacts[i]["email"];
        td_nombre.innerHTML = contacts[i]["nombre"];
        td_telefono.innerHTML = contacts[i]["telefono"];

        var btnVer = createButton('Ver', 'btn-outline-info', function () {
            window.location.href = 'details?email=' + contacts[i]["email"];
        });

        var btnEditar = createButton('Editar', 'btn-outline-success', function () {
            window.location.href = 'update?email=' + contacts[i]["email"];
        });

        var btnEliminar = createButton('Eliminar', 'btn-outline-danger', function () {
            window.location.href = 'delete?email=' + contacts[i]["email"];
        });

        td_opciones.appendChild(btnVer);
        td_opciones.appendChild(btnEditar);
        td_opciones.appendChild(btnEliminar);

        tr.appendChild(td_email);
        tr.appendChild(td_nombre);
        tr.appendChild(td_telefono);
        tr.appendChild(td_opciones);

        tbody_contactos.appendChild(tr);
    }
}

function createButton(text, className, clickHandler) {
    var button = document.createElement('button');
    button.classList = 'btn ' + className;
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    button.style.marginRight = '8px';
    return button;
}
