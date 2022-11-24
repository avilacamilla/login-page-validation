/* Página de Login */

function logar() {

    var email = document.getElementById('usuario').value;
    var password = document.getElementById('password').value;

    if (email == 'avilacamilla' && password == 'comunidadeCode') {
        alert('Autenticado com sucesso!');
        location.href = 'home.html';
    } else {
        alert('Usuário ou senha inválidos!');
    }
}

/* Página home */

