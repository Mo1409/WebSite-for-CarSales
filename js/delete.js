/* Página Deletar Produto do Admin */
window.onload = async function(){
    var resultado = await fetch('../php/dados_cards.php', {
        method: 'GET'
    });

    var dados = await resultado.json();

    

    for (var i = 0; i<dados.length; i++){
        
        var conteudo = `<option value= "${dados[i].ID_carro}" name = "${dados[i].Modelo}" id="${dados[i].ID_carro}"> 
        ${dados[i].Modelo}</option>`;


        document.getElementById("opcao").innerHTML += conteudo;
    } 

    var opcao = document.getElementById("opcao");
    opcao.addEventListener('change', function() {
        
       
var valorSelecionado = opcao.options[opcao.selectedIndex].value;
    

    var imagem = `<img src="../imagens/${valorSelecionado}.jpg" alt="">`

    document.getElementById("carro-escolhido").innerHTML = imagem;});
}


function excluir(){

    var opcao = document.getElementById("opcao");
    var ID_carro = opcao.options[opcao.selectedIndex].id;
    var dados = new FormData();

    dados.append("ID_carro", ID_carro);

    fetch("../php/delete.php",{
        method: 'POST',
        body: dados
    });

    opcao.remove(opcao.selectedIndex);

    /* Ícone Animado */
    var animatedIcon = document.createElement('img');
    animatedIcon.setAttribute('src', '../imagens/lixo.gif');
    animatedIcon.setAttribute('alt', 'Ícone Animado');
    animatedIcon.style.width = '70px';
    animatedIcon.style.height = '70px';
    animatedIcon.style.borderRadius = '40%';

    /* Criar um elemento div para conter o ícone */
    var iconContainer = document.createElement('div');
    iconContainer.appendChild(animatedIcon);

    Swal.fire({
    title: 'Feito!',
    text: 'Produto Deletado com Sucesso!',
    iconHtml: iconContainer.innerHTML, 
    });
}
