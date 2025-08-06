<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Ficha de Personagem</title>
    <style>
        body { font-family: sans-serif; background-color: #f0f0f0; }
        .card { background-color: white; border: 2px solid #333; padding: 20px; width: 300px; margin: 50px auto; box-shadow: 5px 5px 10px #ccc; }
        .hero { color: green; }
        .villain { color: red; }
    </style>
</head>
<body>

    <?php
        $nomePersonagem = "Capitã Marvel";
        $idade = 35;
        $poderPrincipal = "Absorção e Manipulação de Energia";
        $cidadeNatal = "Boston, MA";
        $ehHeroi = true;
    ?>

    <div class="card">
        <h1>Ficha de Personagem</h1>
        <p><strong>Nome:</strong> <?php echo $nomePersonagem; ?></p>
        <p><strong>Idade:</strong> <?php echo $idade . " anos"; ?></p>
        <p><strong>Poder:</strong> <?php echo $poderPrincipal; ?></p>
        <p><strong>Cidade Natal:</strong> <?php echo $cidadeNatal; ?></p>

        <?php
            if ($ehHeroi) {
                echo '<p class="hero"><strong>Missão:</strong> Proteger a galáxia de ameaças cósmicas!</p>';
            } else {
                echo '<p class="villain"><strong>Objetivo:</strong> Conquistar a Terra em nome do Império Kree.</p>';
            }
        ?>
    </div>

</body>
</html>