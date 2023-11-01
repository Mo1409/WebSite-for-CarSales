<?php
    /*Adicionar Itens ao Carrinho*/
    $carroID = $_POST['carroID'];
    $userID = 1;

    $con = mysqli_connect("localhost:3306", "root", "14092004", "vendacarros");

    /* Verifica se o usuário já possui o carro selecionado no carrinho */
    $verificarCarroNoCarrinho = mysqli_query($con, "SELECT * FROM compra_cliente WHERE ID_user = $userID AND ID_carro = $carroID");

    if (mysqli_num_rows($verificarCarroNoCarrinho) > 0) {
        /* Se o carro selecionado já está no carrinho do usuário, então aumenta-se a quantidade em 1 */
        $atualizarQuantidade = mysqli_query($con, "UPDATE compra_cliente SET Quant = Quant + 1 WHERE ID_user = $userID AND ID_carro = $carroID");
    } else {
        /* Insire um novo item no carrinho */
        $inserirCarroNoCarrinho = mysqli_query($con, "INSERT INTO compra_cliente (ID_user, ID_carro, Quant) VALUES ($userID, $carroID, 1)");
    }

    mysqli_close($con);
?>