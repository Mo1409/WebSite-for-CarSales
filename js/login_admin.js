/* Página de Login para o Admin */
async function validarLogin() {
    var email = document.getElementById("nome").value;
    var senha = document.getElementById("senha").value;

    /* Verifique se o email e a senha são válidos */
    if (email === "admin@gmail.com" && senha === "1234") {
        /* Ícone Animado */
        var animatedIcon = document.createElement('img');
        animatedIcon.setAttribute('src', '../imagens/admin.gif');
        animatedIcon.setAttribute('alt', 'Ícone Animado');
        animatedIcon.style.width = '70px';
        animatedIcon.style.height = '70px';
        animatedIcon.style.borderRadius = '35%';

        var iconContainer = document.createElement('div');
        iconContainer.appendChild(animatedIcon);

        const result = await Swal.fire({
            title: 'Login Realizado!',
            text: 'Bem Vindo Admin!',
            iconHtml: iconContainer.innerHTML,
            showConfirmButton: true,
            showCancelButton: false,
        });

        if (result.isConfirmed) {
            window.location.href = "../paginas/admin.html";
        }
    } else {
        Swal.fire({
            title: 'Erro!',
            text: 'Conta não encontrada!',
            icon: 'error',
        });
    }
}

var loginButton = document.querySelector(".login-confirm button");
loginButton.addEventListener("click", validarLogin);