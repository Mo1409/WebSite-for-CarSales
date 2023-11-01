<?php
    /*Diminuir Itens do Carrinho*/
    $carroID = $_POST['carroID'];
    $userID = 1;
        
    $con = mysqli_connect("localhost:3306", "root", "14092004", "vendacarros");

    $verificarCarroNoCarrinho = mysqli_query($con, "SELECT * FROM compra_cliente WHERE ID_user = $userID AND ID_carro = $carroID");

    if (mysqli_num_rows($verificarCarroNoCarrinho) >= 1) {
        // Se o quantidade de carros no carrinho do usuário é maior que 1, então diminui-se 1
        $atualizarQuantidade = mysqli_query($con, "UPDATE compra_cliente SET Quant = Quant - 1 WHERE ID_user = $userID AND ID_carro = $carroID");
    } 

    else {
        if (mysqli_num_rows($verificarCarroNoCarrinho) == 0) {
            // Se o quantidade de carros no carrinho do usuário é 0, então remove-se o item
            $deletar = mysqli_query($con, "DELETE FROM compra_cliente WHERE ID_user = $userID AND ID_carro = $carroID");
    }}
    mysqli_close($con);
?>