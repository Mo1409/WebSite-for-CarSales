/* Página do PIX */
window.onload = function () {
    var opcao = document.getElementById("opcao");

    opcao.addEventListener("change", function () {
        var opcaoSelecionada = opcao.value;

        if (opcaoSelecionada !== 'pix') {
            /* Opção Cartão de Crédito ou Cartão de Débito é selecionada, o usuário é redirecionado de volta para a página de pagamento */
            window.location.href = '../paginas/pagamento.html';
        }
    });
};
