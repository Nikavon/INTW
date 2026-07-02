function mascaraTelefone(input) {
    let valor = input.value.replace(/\D/g, '');
    
    if (valor.length > 11) {
        valor = valor.slice(0, 11);
    }
    
    if (valor.length > 0) {
        if (valor.length <= 2) {
            valor = '(' + valor;
        } else if (valor.length <= 7) {
            valor = '(' + valor.slice(0, 2) + ') ' + valor.slice(2);
        } else {
            valor = '(' + valor.slice(0, 2) + ') ' + valor.slice(2, 7) + '-' + valor.slice(7);
        }
    }
    
    input.value = valor;
}

function validarTelefone(telefone) {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(telefone);
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    
    return idade;
}

function validarDataNascimento(data) {
    const partes = data.split('-');
    if (partes.length !== 3) {
        return false;
    }
    
    const ano = parseInt(partes[0]);
    const mes = parseInt(partes[1]);
    const dia = parseInt(partes[2]);
    
    if (ano < 1900 || ano > 2010) {
        return false;
    }
    
    if (mes < 1 || mes > 12) {
        return false;
    }
    
    if (dia < 1 || dia > 31) {
        return false;
    }
    
    const dataValida = new Date(ano, mes - 1, dia);
    if (dataValida.getFullYear() !== ano || 
        dataValida.getMonth() !== mes - 1 || 
        dataValida.getDate() !== dia) {
        return false;
    }
    
    return true;
}

function calcularForcaSenha(senha) {
    let score = 0;
    
    if (senha.length >= 8) score++;
    if (senha.length >= 12) score++;
    if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) score++;
    if (/[0-9]/.test(senha)) score++;
    if (/[^a-zA-Z0-9]/.test(senha)) score++;
    
    const niveis = [
        { label: 'Muito Fraca', color: '#dc3545', width: '20%' },
        { label: 'Fraca', color: '#fd7e14', width: '40%' },
        { label: 'Média', color: '#ffc107', width: '60%' },
        { label: 'Forte', color: '#28a745', width: '80%' },
        { label: 'Muito Forte', color: '#20c997', width: '100%' }
    ];
    
    const index = Math.min(Math.floor(score / 2), 4);
    return niveis[index];
}

function salvarDadosLocalStorage(dados) {
    try {
        localStorage.setItem('dadosInscricao', JSON.stringify(dados));
    } catch (e) {
        console.error('Erro ao salvar no localStorage:', e);
    }
}

function carregarDadosLocalStorage() {
    try {
        const dados = localStorage.getItem('dadosInscricao');
        return dados ? JSON.parse(dados) : null;
    } catch (e) {
        console.error('Erro ao carregar do localStorage:', e);
        return null;
    }
}

function limparDadosLocalStorage() {
    try {
        localStorage.removeItem('dadosInscricao');
    } catch (e) {
        console.error('Erro ao limpar localStorage:', e);
    }
}

function isEmpty(value) {
    return value === null || value === undefined || value.trim() === '';
}

function atualizarContador(input, displayAtual, displayMax) {
    const atual = input.value.length;
    const max = parseInt(input.getAttribute('maxlength')) || 500;
    
    displayAtual.textContent = atual;
    displayMax.textContent = max;
    
    if (atual > max * 0.9) {
        displayAtual.classList.add('danger');
    } else {
        displayAtual.classList.remove('danger');
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mascaraTelefone,
        validarTelefone,
        validarEmail,
        calcularIdade,
        validarDataNascimento,
        calcularForcaSenha,
        salvarDadosLocalStorage,
        carregarDadosLocalStorage,
        limparDadosLocalStorage,
        isEmpty,
        atualizarContador
    };
}