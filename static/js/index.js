function getContacts() {
    var request = new XMLHttpRequest();
    request.open('GET', "http://127.0.0.1:8000/contactos");
    request.send();    

    request.onload = (e) => {
        const response = request.responseText;
        const json = JSON.parse(response);

        const tbody_contactos = document.getElementById("tbody_contactos");
        tbody_contactos.innerHTML = '';

        for (let i = 0; i < json.length; i++) {
            var tr = document.createElement("tr");
            var td_email = document.createElement("td");
            var td_nombre = document.createElement("td");
            var td_telefono = document.createElement("td");
            var td_opciones = document.createElement("td");
        
            td_email.innerHTML = json[i]["email"];
            td_nombre.innerHTML = json[i]["nombre"];
            td_telefono.innerHTML = json[i]["telefono"];
        
            var btnVer = document.createElement('button');
            btnVer.classList = 'btn btn-outline-info';
            btnVer.textContent = 'Ver';
            btnVer.addEventListener('click', function () {
                window.location.href = 'details?email=' + json[i]["email"];
            });
        
            var btnEditar = document.createElement('button');
            btnEditar.classList = 'btn btn-outline-success';
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', function () {
                window.location.href = 'update?email=' + json[i]["email"];
            });
        
            var btnEliminar = document.createElement('button');
            btnEliminar.classList = 'btn btn-outline-danger';
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', function () {
                window.location.href = 'delete?email=' + json[i]["email"];
            });

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
        }
    };
}
