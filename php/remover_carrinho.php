<?php
    /*Remover Itens do Carrinho*/
    $carroID = $_POST['carroID'];
    $userID = 1;
        
    $con = mysqli_connect("localhost:3306", "root", "14092004", "vendacarros");

    $deletar = mysqli_query($con, "DELETE FROM compra_cliente WHERE ID_user = $userID AND ID_carro = $carroID");

    echo "Item removido com sucesso!";

    mysqli_close($con);
?>