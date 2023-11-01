<?php   
        /*Adiciona o novo produto que o admin cadastrou*/
        $imagem = $_FILES['file-upload'];
        $marca = $_POST['marca'];
        $modelo = $_POST['modelo'];
        $ano = $_POST['ano'];
        $valor = $_POST['valor'];
    
        $con = mysqli_connect('localhost:3306', 'root', '14092004', 'vendacarros');
    
        if (!$con) {
            echo "Erro na conexão com o banco de dados: " . mysqli_connect_error();
        } else {
            $extensao = pathinfo($imagem['name'], PATHINFO_EXTENSION);
            // Verifica o tipo do arquivo
            if ($extensao == 'jpg') {         
                $query = "INSERT INTO carro (Marca, Modelo, Ano, Preco) VALUES ('$marca', '$modelo', '$ano', '$valor')";              
                if (mysqli_query($con, $query)) {    
                    $ultimoID = mysqli_insert_id($con);
                    $novoNomeImagem = '' . $ultimoID . '.jpg';
                    $endereco = '../imagens/' . $novoNomeImagem;
            
                if (move_uploaded_file($imagem['tmp_name'], $endereco)) {
                    echo "Upload de imagem e inserção no banco de dados realizados com sucesso!";
                }
            }
            } else {          
                echo 'Somente arquivos jpg são permitidos!';
        }}
        
        mysqli_close($con);
?>