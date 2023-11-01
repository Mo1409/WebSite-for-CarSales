<?php
    /*Adiciona os dados do Pagamento no Banco*/
    $opcao = $_POST["opcao"];
    $cliente = $_POST["cliente"];
    $numCartao = $_POST["num-cartao"];
    $validade = $_POST["validade"];
    $cvv = $_POST["cvv"];

    $con = mysqli_connect("localhost:3306", "root", "14092004", "vendacarros");

    if (!$con) {
        die("Erro na conexão: " . mysqli_connect_error());
    }

    $sql = "INSERT INTO pagamento (NomeProprietario, NumeroCartao, ValidadeCartao, CVV, TipoCartao)
            VALUES ('$cliente', '$numCartao', '$validade', '$cvv', '$opcao')";

    if (mysqli_query($con, $sql)) {
        mysqli_close($con);
        echo "Pagamento realizado com sucesso!";
    } else {
        mysqli_close($con);
        echo "Erro ao processar o pagamento. Por favor, tente novamente.";
    }
?>
