function registerUser() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (!username || !password) {
    console.error("Usuario y contraseña son obligatorios");
    return;
  }

  var data = {
    username: username,
    password: password
  };

  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:8000/register/', true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  var encodedCredentials = btoa(username + ':' + password);
  request.setRequestHeader('Authorization', 'Basic ' + encodedCredentials);

  request.onload = function () {
    console.log('Status:', request.status);
    console.log('Response:', request.responseText);

    if (request.status >= 200 && request.status < 400) {
      var response = JSON.parse(request.responseText);
      if (response.error) {
        alert("Error: " + response.error);
      } else {
        alert("Datos insertados con éxito");
        console.log("Usuario registrado:", response);
        window.location.href = '/';
      }
    } else {
      console.error("Error al insertar datos");
    }
  };

  request.onerror = function () {
    console.error("Error de conexión");
  };

  request.send(JSON.stringify(data));
}

function goBackToLoginPage() {
  window.location.href = '/';
}

