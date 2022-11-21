function logar() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email == 'camilla@comunidadecode.com.br' && password == '21112022') {
        alert('Autenticado com sucesso!');
    } else {
        alert('Usuário ou senha inválidos!')
    }
}