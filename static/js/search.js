function getForEmail() {
    var email = document.getElementById("email").value;

    if (!email) {
        alert('Por favor, ingrese un valor.');
        return;
    }

    var request = new XMLHttpRequest();
    var url = "https://contacts-backend-5491847c74b7.herokuapp.com/contactos/" + encodeURIComponent(email);
    request.open('GET', url);
    request.send();

    request.onload = (e) => {
        const response = request.responseText;

        try {
            const json = JSON.parse(response);

            const tbody_contactos = document.getElementById("tbody_contactos");
            tbody_contactos.innerHTML = '';

            if (response !== "null") {
                var tr = document.createElement("tr");
                var td_email = document.createElement("td");
                var td_nombre = document.createElement("td");
                var td_telefono = document.createElement("td");
                var td_opciones = document.createElement("td");

                td_email.innerHTML = json["email"];
                td_nombre.innerHTML = json["nombre"];
                td_telefono.innerHTML = json["telefono"];

                td_opciones.innerHTML = '';

                var btnVer = createButton('Ver', 'info', 'details', json["email"]);
                var btnEditar = createButton('Editar', 'success', 'update', json["email"]);
                var btnEliminar = createButton('Eliminar', 'danger', 'delete', json["email"]);

                btnVer.style.marginRight = '8px';
                btnEditar.style.marginRight = '8px';

                td_opciones.appendChild(btnVer);
                td_opciones.appendChild(btnEditar);
                td_opciones.appendChild(btnEliminar);

                tr.appendChild(td_email);
                tr.appendChild(td_nombre);
                tr.appendChild(td_telefono);
                tr.appendChild(td_opciones);

                tbody_contactos.appendChild(tr);
            } else {
                var tr = document.createElement("tr");
                var td_error = document.createElement("td");

                td_error.setAttribute("colspan", "4");
                td_error.textContent = 'No se encontró ningún contacto con ese email.';

                tr.appendChild(td_error);

                tbody_contactos.appendChild(tr);
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    };
}

function createButton(text, color, path, email) {
    var btn = document.createElement('button');
    btn.classList = 'btn btn-outline-' + color;
    btn.textContent = text;
    btn.addEventListener('click', function () {
        window.location.href = `${path}?email=${email}`;
    });

    return btn;
}
