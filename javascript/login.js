const mockData = {
    email: 'admin@exemplo.com',
    password: 'senha123'
};

function validateLogin(event) {
    event.preventDefault(); 

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    if (emailInput === mockData.email && passwordInput === mockData.password) {
        window.location.href = './sistema/card.html';
    } else {
        document.getElementById('login-message').textContent = 'Email ou senha inválidos.';
        document.getElementById('login-message').style.color = 'red';
    }
}

document.getElementById('login-form').addEventListener('submit', validateLogin);

document.getElementById('email').addEventListener('blur', function() {
    const emailValue = document.getElementById('email').value;

    if (!emailValue.includes('@')) {
        document.getElementById('login-message').textContent = 'O email deve conter um "@"';
        document.getElementById('login-message').style.color = 'red';
    } else {
        document.getElementById('login-message').textContent = ''; 
    }
});
