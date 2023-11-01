/* Página de Adicionar Produto do Admin */
function upload() {
    var form = document.getElementById('carro');
    var imagem = document.getElementById('file-upload');
    var dados = new FormData(form);

    for (var i = 0; i < imagem.files.length; i++) {
        dados.append('imagem[]', imagem.files[i]);
    }

    fetch("../php/admin_gravar.php", {
        method: "POST",
        body: dados
    })
    /* Ícone Animado */
    var animatedIcon = document.createElement('img');
    animatedIcon.setAttribute('src', '../imagens/carro.gif');
    animatedIcon.setAttribute('alt', 'Ícone Animado');
    animatedIcon.style.width = '70px';
    animatedIcon.style.height = '70px';
    animatedIcon.style.borderRadius = '50%';

    /* Criar um elemento div para conter o ícone */
    var iconContainer = document.createElement('div');
    iconContainer.appendChild(animatedIcon);

    Swal.fire({
    title: 'Tudo Certo!',
    text: 'O Cadastro do seu Produto foi Realizado com Sucesso!',
    iconHtml: iconContainer.innerHTML, 
    });
}