<?php
        /*Pega todos os carros que estão cadastrados no banco*/
        $con = mysqli_connect("localhost:3306", "root", "14092004", "vendacarros");
        $resultado = mysqli_query($con, "SELECT * FROM carro");
        $dados = array();

        while($registro = mysqli_fetch_assoc($resultado)){
            
            array_push($dados, $registro);
    
        }
        
        $json = json_encode($dados);
        echo $json;

        mysqli_close($con);
?>