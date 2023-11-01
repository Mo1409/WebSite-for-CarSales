<?php
    /*Limpa o Carrinho*/
    $con = mysqli_connect("localhost:3306", "root", "14092004", "vendacarros");

    if ($con === false) {
        die("Erro na conexão: " . mysqli_connect_error());
    }

    /* Exclui-se todas as linhas da tabela compra_cliente */
    $sql = "DELETE FROM compra_cliente";

    if (mysqli_query($con, $sql)) {
        echo "Todas as linhas da tabela compra_cliente foram excluídas com sucesso.";
    } else {
        echo "Erro ao excluir todas as linhas da tabela compra_cliente: " . mysqli_error($con);
    }

    mysqli_close($con);
?>