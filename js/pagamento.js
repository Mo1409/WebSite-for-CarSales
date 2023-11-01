/* Página de Pagamento */
async function Pagamento() {
    var opcao = document.getElementById("opcao");

    opcao.addEventListener("change", function () {
        var opcaoSelecionada = opcao.value;

        if (opcaoSelecionada === 'pix') {
            window.location.href = './pix.html';
        }
    });

    var formulario = document.getElementById("pagamento");

    formulario.addEventListener("submit", async function (event) {
        event.preventDefault();

        var opcaoSelecionada = opcao.value;
        var cliente = document.getElementById("cliente").value;
        var numCartao = document.getElementById("num-cartao").value;
        var validade = document.getElementById("validade").value;
        var cvv = document.getElementById("cvv").value;

        if (opcaoSelecionada !== 'pix') {
            /* Se a opção não for PIX, continua-se com a lógica de processamento do pagamento */
            if (!cliente || !numCartao || !validade || !cvv) {
                Swal.fire({
                    title: 'Erro',
                    text: 'Por favor, preencha todos os campos do formulário.',
                    icon: 'error'
                });
                return;
            }

            var formData = new FormData();
            formData.append("opcao", opcaoSelecionada);
            formData.append("cliente", cliente);
            formData.append("num-cartao", numCartao);
            formData.append("validade", validade);
            formData.append("cvv", cvv);

            try {
                const resposta = await fetch("../php/pagamento.php", {
                    method: "POST",
                    body: formData
                });

                if (resposta.ok) {
                    /* Ícone Animado */
                    var animatedIcon = document.createElement('img');
                    animatedIcon.setAttribute('src', '../imagens/handshake.gif');
                    animatedIcon.setAttribute('alt', 'Ícone Animado');
                    animatedIcon.style.width = '70px';
                    animatedIcon.style.height = '70px';
                    animatedIcon.style.borderRadius = '35%';

                    var iconContainer = document.createElement('div');
                    iconContainer.appendChild(animatedIcon);

                    const result = await Swal.fire({
                        title: 'Obrigado!',
                        text: 'Pagamento realizado!',
                        iconHtml: iconContainer.innerHTML
                    });

                    if (result.isConfirmed) {
                        /* Redefine o carrinho para vazio após a mensagem de sucesso */
                        /* Direciona para o PHP que limpa a tabela compra_cliente */
                        const limparcarrinho = await fetch("../php/limpar_carrinho.php");

                        if (limparcarrinho.ok) {
                            window.location.href = "../index.html";
                        }
                    }
                } else {
                    Swal.fire({
                        title: 'Erro',
                        text: 'Erro ao processar o pagamento. Por favor, tente novamente.',
                        icon: 'error'
                    });
                }
            } catch (error) {
                console.error("Erro ao processar o pagamento:", error);
            }
        }
    });
}

window.onload = Pagamento;
