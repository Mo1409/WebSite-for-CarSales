<?php   
        /*Insere na tabela cliente o novo usuário*/
        $nome = $_POST['nome'];
        $birth_date = $_POST['birth_date'];
        $email = $_POST['email'];
        $senha = $_POST['senha'];
    
        $con = mysqli_connect('localhost:3306', 'root', '14092004', 'vendacarros');
        
        if (!$con) {
            echo "Erro na conexão com o banco de dados: " . mysqli_connect_error();
        } else {
            $query = "INSERT INTO cliente (Nome, Data_Nasc, Email, Senha) VALUES ('$nome', '$birth_date', '$email', '$senha')";
    
            if (mysqli_query($con, $query)) {
                echo "Conta criada com sucesso!"; 
            } else {
                echo "Erro ao inserir dados: " . mysqli_error($con);
            }
        }
        mysqli_close($con);
?>