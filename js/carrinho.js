/* Página do Carrinho*/
var valorTotalDaCompra = 0;
window.onload =  async function Cart() {
      var resultado = await fetch("../php/carrinho.php", {
          method: "GET"
      });
    
      var itens = await resultado.json();
      if (itens.length == 0) {
        /* Verifica se o carrinho está vazio*/
        document.getElementById('confirmar').innerHTML = '<h2 class="carrinho-vazio">Está Vazio</h2>';
    } else {
    for (var i = 0; i < itens.length; i++) {
        var conteudo = `<div class="linha" data-id="${itens[i].ID_carro}">
          <div class="imagem"> <img src="../imagens/${itens[i].ID_carro}.jpg" alt="${itens[i].Marca}"></div>
          <div class="info"> <div class="marca">${itens[i].Marca}</div> <div class="modelo">${itens[i].Modelo}</div> <div class="ano">${itens[i].Ano}</div></div>
          <div class="qtd">
            <div class="aumentar" onclick="aumentar(${itens[i].ID_carro})"><i class="fa-solid fa-plus"></i></div>
            <input type="number" id="quantidade" name="quantidade" value="${itens[i].Quant}" readonly min="1" max="10">
            <div class="diminuir" onclick="diminuir(${itens[i].ID_carro})"><i class="fa-solid fa-minus"></i></div>
          </div>
          <div class="valor"><i class="fa-solid fa-usd"></i><p>${itens[i].Preco}</p></div>
          <div class="valor-total"><i class="fa-solid fa-money-bills"></i>${itens[i].Preco * itens[i].Quant}</div>
          <div class="remove" onclick="removerItem(${itens[i].ID_carro})"><i class="fa-solid fa-trash-alt"></i></div>
        </div>`;
        document.getElementById('itens-carrinho').innerHTML += conteudo;
        /* Calcula-se o valor total com os itens que já estão no carrinho */
        valorTotalDaCompra += parseFloat(itens[i].Preco) * itens[i].Quant; 
    }
    ValorTotalDaCompra();
}}

/* Atualizar o valor total da compra do cliente */
function ValorTotalDaCompra() {
  var valorAtualizado = document.getElementById('valor-total');
  valorAtualizado.textContent = `$${valorTotalDaCompra.toFixed(2)}`;
}

/*Remover Items do carrinho*/
async function removerItem(ID_carro) {
  var formData = new FormData();
  formData.append("carroID", ID_carro);

  try {
      const response = await fetch("../php/remover_carrinho.php", {
          method: "POST",
          body: formData,
      });

      if (response.ok) {
          /* Obtem a quantidade do item a ser removido */
          var quantidadeRemovida = parseInt(document.querySelector(`.linha[data-id="${ID_carro}"] input[name="quantidade"]`).value);
          var precoItem = parseFloat(document.querySelector(`.linha[data-id="${ID_carro}"] .valor`).innerText.replace('$', ''));

          /* Subtrair o valor multiplicado pela quantidade */
          valorTotalDaCompra -= quantidadeRemovida * precoItem;
          ValorTotalDaCompra();

          document.querySelector(`.linha[data-id="${ID_carro}"]`).remove();

          /* Verificar se o carrinho está vazio */
          var carrinhoVazio = document.getElementById('itens-carrinho').querySelectorAll('.linha').length === 0;
          if (carrinhoVazio) {
              document.getElementById('confirmar').innerHTML = '<h2 class="carrinho-vazio">Está Vazio</h2>';
          }
      }
  } catch (error) {
      console.error("Erro ao remover o item do carrinho", error);
  }
}


/*Adicionar Itens no Carrinho*/
async function aumentar(ID_carro) {
  var formData = new FormData();
  formData.append('carroID', ID_carro);

  try {
      const response = await fetch("../php/inserir_carrinho.php", {
          method: "POST",
          body: formData
      });

      if (response.ok) {
          /* Atualizar o numero do input number */
          var inputNumber = document.querySelector(`.linha[data-id="${ID_carro}"] input[name="quantidade"]`);
          var preco = document.querySelector(`.linha[data-id="${ID_carro}"] .valor`);
          var novoprecototal = document.querySelector(`.linha[data-id="${ID_carro}"] .valor-total`);
          var novoValor = parseInt(inputNumber.value) + 1;
          if (novoValor <= parseInt(inputNumber.max)) {
              inputNumber.value = novoValor;
              var precoNumerico = parseFloat(preco.innerText.replace('$', ''));
              novoprecototal.innerHTML = `<i class="fa-solid fa-money-bills"></i>` + (precoNumerico * novoValor);
              valorTotalDaCompra += precoNumerico;
              ValorTotalDaCompra();
          }
      }
  } catch (error) {
      console.error("Erro ao adicionar mais um item no carrinho", error);
  }
}

/*Diminuir Itens no Carrinho*/
async function diminuir(ID_carro) {
  var formData = new FormData();
  formData.append('carroID', ID_carro);

  try {
      const response = await fetch("../php/diminuir_carrinho.php", {
          method: "POST",
          body: formData
      });

      if (response.ok) {
          /* Atualizar o numero do input number */
          var inputNumber = document.querySelector(`.linha[data-id="${ID_carro}"] input[name="quantidade"]`);
          var preco = document.querySelector(`.linha[data-id="${ID_carro}"] .valor`);
          var novoprecototal = document.querySelector(`.linha[data-id="${ID_carro}"] .valor-total`);
          var novoValor = parseInt(inputNumber.value) - 1;
          if (novoValor >= parseInt(inputNumber.min)) {
              inputNumber.value = novoValor;
              var precoNumerico = parseFloat(preco.innerText.replace('$', ''));
              novoprecototal.innerHTML = `<i class="fa-solid fa-money-bills"></i>` + (precoNumerico * novoValor);
              valorTotalDaCompra -= precoNumerico;
              ValorTotalDaCompra();
          }
      }
  } catch (error) {
      console.error("Erro ao diminuir um item no carrinho", error);
  }
}
