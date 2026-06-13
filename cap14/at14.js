document.addEventListener('DOMContentLoaded', function() {
    const nomePerfil = document.getElementById('nomePerfil');
    const cursoPerfil = document.getElementById('cursoPerfil');
    const fotoPerfil = document.getElementById('fotoPerfil');
    const perfilSection = document.getElementById('perfil');
    const biografiaPerfil = document.getElementById('biografiaPerfil');

    const btnAlterarNome = document.getElementById('btnAlterarNome');
    const btnAlterarCurso = document.getElementById('btnAlterarCurso');
    const btnAlterarFoto = document.getElementById('btnAlterarFoto');
    const btnDestacarPerfil = document.getElementById('btnDestacarPerfil');
    const btnRestaurar = document.getElementById('btnRestaurar');
    const btnAtualizarContato = document.getElementById('btnAtualizarContato');

    const temaSelect = document.getElementById('temaSelect');
    const fonteRange = document.getElementById('fonteRange');
    const valorFonte = document.getElementById('valorFonte');
    const mostrarBio = document.getElementById('mostrarBio');

    const emailInput = document.getElementById('emailInput');
    const telefoneInput = document.getElementById('telefoneInput');
    const emailExibido = document.getElementById('emailExibido');
    const telefoneExibido = document.getElementById('telefoneExibido');

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
        const novoNome = prompt('Digite o novo nome para o perfil:', nomePerfil.textContent);
        if (novoNome && novoNome.trim() !== '') {
            nomePerfil.textContent = novoNome.trim();
            registrarAcao('Alteração de nome');
        }
    });

    btnAlterarCurso.addEventListener('click', function() {
        const novoCurso = prompt('Digite o novo curso:', cursoPerfil.textContent);
        if (novoCurso && novoCurso.trim() !== '') {
            cursoPerfil.textContent = novoCurso.trim();
            registrarAcao('Alteração de curso');
        }
    });

    btnAlterarFoto.addEventListener('click', function() {
        const novaFoto = prompt('Insira o caminho da nova foto (ex: imagens/perfil2.jpg):', 'imagens/nova_foto.jpg');
        if (novaFoto && novaFoto.trim() !== '') {
            fotoPerfil.src = novaFoto.trim();
            registrarAcao('Alteração de foto');
        } else if (novaFoto === '') {
            fotoPerfil.src = 'imagens/nova_foto.jpg';
            registrarAcao('Alteração de foto (padrão)');
        }
    });

    btnDestacarPerfil.addEventListener('click', function() {
        perfilSection.classList.add('destaque');
        registrarAcao('Destaque do perfil');
    });

    btnRestaurar.addEventListener('click', function() {
        nomePerfil.textContent = estadoOriginal.nome;
        cursoPerfil.textContent = estadoOriginal.curso;
        fotoPerfil.src = estadoOriginal.foto;
        perfilSection.classList.remove('destaque');
        registrarAcao('Restauração do perfil');
    });

    temaSelect.addEventListener('change', function() {
        const tema = temaSelect.value;
        document.body.classList.remove('tema-escuro', 'tema-azul');
        if (tema === 'escuro') {
            document.body.classList.add('tema-escuro');
        } else if (tema === 'azul') {
            document.body.classList.add('tema-azul');
        }
        registrarAcao(`Alteração de tema: ${tema}`);
    });

    function atualizarFonteBiografia() {
        const tamanho = fonteRange.value + 'px';
        biografiaPerfil.style.fontSize = tamanho;
        valorFonte.textContent = tamanho;
    }

    fonteRange.addEventListener('input', atualizarFonteBiografia);
    fonteRange.addEventListener('change', function() {
        registrarAcao(`Alteração de fonte: ${fonteRange.value}px`);
    });
    atualizarFonteBiografia();

    mostrarBio.addEventListener('change', function() {
        if (mostrarBio.checked) {
            biografiaPerfil.style.display = 'block';
            registrarAcao('Exibição da biografia');
        } else {
            biografiaPerfil.style.display = 'none';
            registrarAcao('Ocultação da biografia');
        }
    });

    btnAtualizarContato.addEventListener('click', function() {
        const email = emailInput.value.trim();
        const telefone = telefoneInput.value.trim();
        emailExibido.textContent = email ? `E-mail: ${email}` : 'E-mail: não informado';
        telefoneExibido.textContent = telefone ? `Telefone: ${telefone}` : 'Telefone: não informado';
        registrarAcao('Atualização de contato');
        emailInput.value = '';
        telefoneInput.value = '';
    });

    emailExibido.textContent = 'E-mail: não informado';
    telefoneExibido.textContent = 'Telefone: não informado';
    contadorAcoes.textContent = '0';
    ultimaAcao.textContent = 'Nenhuma';
});