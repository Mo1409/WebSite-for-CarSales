/* Página Principal */
var dados;
window.onload = async function loadCards() {
    var resultado = await fetch("php/dados_cards.php", {
        method: "GET"
    });

    dados = await resultado.json();

    for (var i = 0; i < dados.length; i++) {
        var conteudo = `<div class="card-product">
            <div>
                <img src="imagens/${dados[i].ID_carro}.jpg" alt="${dados[i].Marca}">
            </div>
            <div class="desc">
                <p>${dados[i].Marca} ${dados[i].Modelo} ${dados[i].Ano}</p>
                <p>R$ ${dados[i].Preco}</p>
            </div>
            <div class="cart" onclick="carrinho(this.getAttribute('carroID'))" carroID="${dados[i].ID_carro}">
            Adicionar ao Carrinho
            </div>
        </div>`;
        document.getElementById('carros').innerHTML += conteudo;
    }
}


function displayFilteredData(filteredData) {
    /* Exibir os carros pesquisados */
    document.getElementById('carros').innerHTML = "";
    for (var i = 0; i < filteredData.length; i++) {
        var conteudo = `<div class="card-product">
            <div>
                <img src="imagens/${filteredData[i].ID_carro}.jpg" alt="${filteredData[i].Marca}">
            </div>
            <div class="desc">
                <p>${filteredData[i].Marca} ${filteredData[i].Modelo} ${filteredData[i].Ano}</p>
                <p>R$ ${filteredData[i].Preco}</p>
            </div>
            <div class="cart" onclick="carrinho(this.getAttribute('carroID'))" carroID="${filteredData[i].ID_carro}">
            Adicionar ao Carrinho
            </div>
        </div>`;
        document.getElementById('carros').innerHTML += conteudo;
    }
}

document.getElementById('search-input').addEventListener('input', Searchbar);

/* Searchbar */
function Searchbar() {
    console.log("Evento de pesquisa acionado");
    var searchTerm = this.value.toLowerCase();
    var filteredData = dados.filter(function (carro) {
        return (
            carro.Marca.toLowerCase().includes(searchTerm) ||
            carro.Modelo.toLowerCase().includes(searchTerm) ||
            carro.Ano.toString().includes(searchTerm) ||
            carro.Preco.toString().includes(searchTerm)
        );
    });
    displayFilteredData(filteredData);
}

/*Adicionar Itens ao Carrinho*/
function carrinho(carroID) {
    /*Por teste o usuário vai ser 1*/
    var userID = 1;

    var formData = new FormData();
    formData.append('carroID', carroID);
    formData.append('userID', userID);

    fetch("php/inserir_carrinho.php", {
        method: "POST",
        body: formData
    })
    /* Ícone Animado */
    var animatedIcon = document.createElement('img');
    animatedIcon.setAttribute('src', './imagens/cart.gif');
    animatedIcon.setAttribute('alt', 'Ícone Animado');
    animatedIcon.style.width = '70px';
    animatedIcon.style.height = '70px';
    animatedIcon.style.borderRadius = '50%';

    /* Criar um elemento div para conter o ícone */
    var iconContainer = document.createElement('div');
    iconContainer.appendChild(animatedIcon);

    Swal.fire({
    title: 'Feito!',
    text: 'Item Adicionado ao Carrinho!',
    iconHtml: iconContainer.innerHTML, 
    });

}
