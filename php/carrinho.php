<?php
    /*Pega os carros que estão no carrinho*/
    $con = mysqli_connect("localhost:3306", "root", "14092004", "vendacarros");

    $carrinho = "SELECT c.ID_carro, c.Marca, c.Modelo, c.Ano, c.Preco, cc.Quant
                    FROM carro c
                    JOIN compra_cliente cc ON c.ID_carro = cc.ID_carro";

    $resultado = mysqli_query($con, $carrinho);

    $itensCarrinho = array();
    while ($conteudo = mysqli_fetch_assoc($resultado)) {
            
        array_push($itensCarrinho, $conteudo);
    }

    $json = json_encode($itensCarrinho);
    echo $json;

    mysqli_close($con);

?>

