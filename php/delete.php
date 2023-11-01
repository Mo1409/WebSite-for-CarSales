<?php
/*Deleta o produto que o admin escolheu*/
$ID_carro = $_POST["ID_carro"];

$con = mysqli_connect("localhost:3306","root",'14092004',"vendacarros");

$delete_carro = "DELETE FROM  vendacarros.carro WHERE ID_carro = '$ID_carro'";
$delete_carrinho = "DELETE FROM  vendacarros.compra_cliente WHERE ID_carro = '$ID_carro'";

mysqli_query($con, $delete_carro);
mysqli_query($con, $delete_carrinho);

?>