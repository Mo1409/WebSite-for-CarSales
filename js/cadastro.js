/* Página de Cadastro do Cliente */
function cadastro(){
    var form = document.getElementById('cadastroform');
    var dados = new FormData(form);
    
    fetch("../php/cadastro.php", {
        method: "POST",
        body: dados
    })

    Swal.fire({
    title: 'Bem Vindo!',
    text: 'Cadastro Realizado com Sucesso!',
    icon: 'success'
})
}