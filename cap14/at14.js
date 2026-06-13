document.addEventListener('DOMContentLoaded', function() {

    const nomePerfil = document.getElementById('nomePerfil');
    const cursoPerfil = document.getElementById('cursoPerfil');
    const fotoPerfil = document.getElementById('fotoPerfil');
    const cartaoPerfil = document.getElementById('cartaoPerfil');
    const biografia = document.getElementById('biografia');

    const btnAlterarNome = document.getElementById('btnAlterarNome');
    const btnAlterarCurso = document.getElementById('btnAlterarCurso');
    const btnAlterarFoto = document.getElementById('btnAlterarFoto');
    const btnDestacarPerfil = document.getElementById('btnDestacarPerfil');
    const btnRestaurarPerfil = document.getElementById('btnRestaurarPerfil');
    const btnAtualizarContato = document.getElementById('btnAtualizarContato');

    const seletorTema = document.getElementById('seletorTema');
    const controleFonte = document.getElementById('controleFonte');
    const valorFonte = document.getElementById('valorFonte');
    const checkboxBiografia = document.getElementById('checkboxBiografia');

    const inputEmail = document.getElementById('inputEmail');
    const inputTelefone = document.getElementById('inputTelefone');
    const resumoEmail = document.getElementById('resumoEmail');
    const resumoTelefone = document.getElementById('resumoTelefone');

    const contadorAcoes = document.getElementById('contadorAcoes');
    const ultimaAcao = document.getElementById('ultimaAcao');

    const estadoOriginal = {
        nome: nomePerfil.textContent,
        curso: cursoPerfil.textContent,
        foto: fotoPerfil.src
    };

    let totalAcoes = 0;

    function registrarAcao(descricao) {
        totalAcoes++;
        contadorAcoes.textContent = totalAcoes;
        ultimaAcao.textContent = descricao;
    }

    btnAlterarNome.addEventListener('click', function() {
        const novoNome = prompt('Digite o novo nome para o perfil:');
        if (novoNome && novoNome.trim() !== '') {
            nomePerfil.textContent = novoNome.trim();
            registrarAcao('Alteração de nome');
        }
    });

    btnAlterarCurso.addEventListener('click', function() {
        const novoCurso = prompt('Digite o novo curso:');
        if (novoCurso && novoCurso.trim() !== '') {
            cursoPerfil.textContent = novoCurso.trim();
            registrarAcao('Alteração de curso');
        }
    });

    btnAlterarFoto.addEventListener('click', function() {
        fotoPerfil.src = 'imagens/nova_foto.jpg';
        registrarAcao('Alteração de foto');
    });

    btnDestacarPerfil.addEventListener('click', function() {
        cartaoPerfil.classList.add('destaque');
        registrarAcao('Destaque do perfil');
    });

    btnRestaurarPerfil.addEventListener('click', function() {
        nomePerfil.textContent = estadoOriginal.nome;
        cursoPerfil.textContent = estadoOriginal.curso;
        fotoPerfil.src = estadoOriginal.foto;
        cartaoPerfil.classList.remove('destaque');
        registrarAcao('Restauração do perfil');
    });

    seletorTema.addEventListener('change', function() {
        document.body.classList.remove('tema-escuro', 'tema-azul');
        const temaSelecionado = seletorTema.value;
        if (temaSelecionado === 'escuro') {
            document.body.classList.add('tema-escuro');
        } else if (temaSelecionado === 'azul') {
            document.body.classList.add('tema-azul');
        }
        registrarAcao(`Alteração de tema: ${temaSelecionado}`);
    });

    controleFonte.addEventListener('input', function() {
        const tamanhoFonte = controleFonte.value + 'px';
        biografia.style.fontSize = tamanhoFonte;
        valorFonte.textContent = tamanhoFonte;
    });

    controleFonte.addEventListener('change', function() {
        registrarAcao(`Alteração de fonte: ${controleFonte.value}px`);
    });

    checkboxBiografia.addEventListener('change', function() {
        if (checkboxBiografia.checked) {
            biografia.style.display = 'block';
            registrarAcao('Exibição da biografia');
        } else {
            biografia.style.display = 'none';
            registrarAcao('Ocultação da biografia');
        }
    });

    btnAtualizarContato.addEventListener('click', function() {
        const email = inputEmail.value.trim();
        const telefone = inputTelefone.value.trim();

        resumoEmail.textContent = email || 'Não informado';
        resumoTelefone.textContent = telefone || 'Não informado';

        registrarAcao('Atualização de contato');
        inputEmail.value = '';
        inputTelefone.value = '';
    });

    contadorAcoes.textContent = '0';
    ultimaAcao.textContent = 'Nenhuma';

});
