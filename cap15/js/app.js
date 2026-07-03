document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formInscricao');
    const campos = {
        nome: document.getElementById('nome'),
        email: document.getElementById('email'),
        telefone: document.getElementById('telefone'),
        nascimento: document.getElementById('nascimento'),
        curso: document.getElementById('curso'),
        turnos: document.querySelectorAll('input[name="turno"]'),
        interesses: document.querySelectorAll('input[name="interesses"]'),
        senha: document.getElementById('senha'),
        confirmarSenha: document.getElementById('confirmar-senha'),
        foto: document.getElementById('foto'),
        mensagem: document.getElementById('mensagem'),
        termos: document.getElementById('termos')
    };
    
    const elementosErro = {
        nome: document.getElementById('nome-error'),
        email: document.getElementById('email-error'),
        telefone: document.getElementById('telefone-error'),
        nascimento: document.getElementById('nascimento-error'),
        curso: document.getElementById('curso-error'),
        turno: document.getElementById('turno-error'),
        interesses: document.getElementById('interesses-error'),
        senha: document.getElementById('senha-error'),
        confirmarSenha: document.getElementById('confirmar-senha-error'),
        foto: document.getElementById('foto-error'),
        mensagem: document.getElementById('mensagem-error'),
        termos: document.getElementById('termos-error')
    };
    
    const contadorAtual = document.getElementById('caracteres-atual');
    const contadorMaximo = document.getElementById('caracteres-maximo');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    function mostrarErro(campo, mensagem) {
        const elemento = elementosErro[campo];
        if (elemento) {
            elemento.textContent = mensagem || '';
        }
    }

    function aplicarEstilo(elemento, valido) {
        if (elemento) {
            if (elemento.value && elemento.value.length > 0) {
                if (valido) {
                    elemento.classList.remove('invalid');
                    elemento.classList.add('valid');
                } else {
                    elemento.classList.remove('valid');
                    elemento.classList.add('invalid');
                }
            } else {
                elemento.classList.remove('valid', 'invalid');
            }
        }
    }

    function obterTurnoSelecionado() {
        let selecionado = null;
        campos.turnos.forEach(function(radio) {
            if (radio.checked) {
                selecionado = radio.value;
            }
        });
        return selecionado;
    }

    function obterInteressesSelecionados() {
        return Array.from(campos.interesses).filter(function(cb) {
            return cb.checked;
        });
    }

    function validarNome() {
        const resultado = Validacoes.validarNome(campos.nome.value);
        mostrarErro('nome', resultado.erros.join(' '));
        aplicarEstilo(campos.nome, resultado.valido);
        return resultado.valido;
    }

    function validarEmail() {
        const resultado = Validacoes.validarEmail(campos.email.value);
        mostrarErro('email', resultado.erros.join(' '));
        aplicarEstilo(campos.email, resultado.valido);
        return resultado.valido;
    }

    function validarTelefone() {
        const resultado = Validacoes.validarTelefone(campos.telefone.value);
        mostrarErro('telefone', resultado.erros.join(' '));
        aplicarEstilo(campos.telefone, resultado.valido);
        return resultado.valido;
    }

    function validarNascimento() {
        const resultado = Validacoes.validarNascimento(campos.nascimento.value);
        mostrarErro('nascimento', resultado.erros.join(' '));
        aplicarEstilo(campos.nascimento, resultado.valido);
        return resultado.valido;
    }

    function validarCurso() {
        const resultado = Validacoes.validarCurso(campos.curso.value);
        mostrarErro('curso', resultado.erros.join(' '));
        aplicarEstilo(campos.curso, resultado.valido);
        return resultado.valido;
    }

    function validarTurno() {
        const turno = obterTurnoSelecionado();
        const resultado = Validacoes.validarTurno(turno);
        mostrarErro('turno', resultado.erros.join(' '));
        return resultado.valido;
    }

    function validarInteresses() {
        const interesses = obterInteressesSelecionados();
        const resultado = Validacoes.validarInteresses(interesses);
        mostrarErro('interesses', resultado.erros.join(' '));
        return resultado.valido;
    }

    function validarSenha() {
        const resultado = Validacoes.validarSenha(campos.senha.value);
        mostrarErro('senha', resultado.erros.join(' '));
        aplicarEstilo(campos.senha, resultado.valido);
        atualizarForcaSenha();
        return resultado.valido;
    }

    function validarConfirmarSenha() {
        const resultado = Validacoes.validarConfirmarSenha(
            campos.senha.value,
            campos.confirmarSenha.value
        );
        mostrarErro('confirmarSenha', resultado.erros.join(' '));
        aplicarEstilo(campos.confirmarSenha, resultado.valido);
        return resultado.valido;
    }

    function validarMensagem() {
        const resultado = Validacoes.validarMensagem(campos.mensagem.value);
        mostrarErro('mensagem', resultado.erros.join(' '));
        aplicarEstilo(campos.mensagem, resultado.valido);
        return resultado.valido;
    }

    function validarFoto() {
        const file = campos.foto.files[0];
        const resultado = Validacoes.validarFoto(file);
        mostrarErro('foto', resultado.erros.join(' '));
        return resultado.valido;
    }

    function validarTermos() {
        const resultado = Validacoes.validarTermos(campos.termos.checked);
        mostrarErro('termos', resultado.erros.join(' '));
        return resultado.valido;
    }

    function validarTodosCampos() {
        const validacoes = [
            validarNome(),
            validarEmail(),
            validarTelefone(),
            validarNascimento(),
            validarCurso(),
            validarTurno(),
            validarInteresses(),
            validarSenha(),
            validarConfirmarSenha(),
            validarMensagem(),
            validarFoto(),
            validarTermos()
        ];
        
        return validacoes.every(function(valido) {
            return valido === true;
        });
    }

    function atualizarForcaSenha() {
        const senha = campos.senha.value;
        if (senha.length === 0) {
            strengthBar.innerHTML = '';
            strengthText.textContent = '';
            return;
        }
        
        const forca = calcularForcaSenha(senha);
        strengthBar.innerHTML = '<div class="fill" style="width: ' + forca.width + '; background-color: ' + forca.color + ';"></div>';
        strengthText.textContent = forca.label;
        strengthText.style.color = forca.color;
    }

    function atualizarPreviewFoto() {
        const file = campos.foto.files[0];
        const preview = document.getElementById('foto-preview');
        preview.innerHTML = '';
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    }

    function salvarDados() {
        const dados = {
            nome: campos.nome.value,
            email: campos.email.value,
            telefone: campos.telefone.value,
            nascimento: campos.nascimento.value,
            curso: campos.curso.value,
            turno: obterTurnoSelecionado(),
            interesses: obterInteressesSelecionados().map(function(cb) {
                return cb.value;
            }),
            mensagem: campos.mensagem.value
        };
        salvarDadosLocalStorage(dados);
    }

    function carregarDados() {
        const dados = carregarDadosLocalStorage();
        if (dados) {
            if (dados.nome) campos.nome.value = dados.nome;
            if (dados.email) campos.email.value = dados.email;
            if (dados.telefone) campos.telefone.value = dados.telefone;
            if (dados.nascimento) campos.nascimento.value = dados.nascimento;
            if (dados.curso) campos.curso.value = dados.curso;
            if (dados.mensagem) campos.mensagem.value = dados.mensagem;
            
            if (dados.turno) {
                campos.turnos.forEach(function(radio) {
                    if (radio.value === dados.turno) {
                        radio.checked = true;
                    }
                });
            }
            
            if (dados.interesses && dados.interesses.length > 0) {
                campos.interesses.forEach(function(cb) {
                    if (dados.interesses.includes(cb.value)) {
                        cb.checked = true;
                    }
                });
            }
        }
    }

    function limparFormulario() {
        form.reset();
        document.getElementById('foto-preview').innerHTML = '';
        strengthBar.innerHTML = '';
        strengthText.textContent = '';
        contadorAtual.textContent = '0';
        
        document.querySelectorAll('.valid, .invalid').forEach(function(el) {
            el.classList.remove('valid', 'invalid');
        });
        
        document.querySelectorAll('.error-message').forEach(function(el) {
            el.textContent = '';
        });
        
        limparDadosLocalStorage();
    }

    function abrirModalTermos() {
        document.getElementById('modal-termos').classList.add('show');
    }

    function fecharModalTermos() {
        document.getElementById('modal-termos').classList.remove('show');
    }

    function abrirModalSucesso() {
        document.getElementById('modal-sucesso').classList.add('show');
    }

    function fecharModalSucesso() {
        document.getElementById('modal-sucesso').classList.remove('show');
    }

    campos.telefone.addEventListener('input', function() {
        mascaraTelefone(this);
        validarTelefone();
    });

    campos.nome.addEventListener('input', function() {
        validarNome();
    });
    
    campos.email.addEventListener('input', function() {
        validarEmail();
    });
    
    campos.senha.addEventListener('input', function() {
        validarSenha();
        if (campos.confirmarSenha.value.length > 0) {
            validarConfirmarSenha();
        }
    });

    campos.confirmarSenha.addEventListener('input', function() {
        validarConfirmarSenha();
    });

    campos.nascimento.addEventListener('change', function() {
        validarNascimento();
    });

    campos.nascimento.addEventListener('input', function() {
        validarNascimento();
    });

    campos.curso.addEventListener('change', function() {
        validarCurso();
    });

    campos.turnos.forEach(function(radio) {
        radio.addEventListener('change', function() {
            validarTurno();
        });
    });

    campos.interesses.forEach(function(cb) {
        cb.addEventListener('change', function() {
            validarInteresses();
        });
    });

    campos.mensagem.addEventListener('input', function() {
        validarMensagem();
        atualizarContador(this, contadorAtual, contadorMaximo);
    });

    campos.foto.addEventListener('change', function() {
        validarFoto();
        atualizarPreviewFoto();
    });

    campos.termos.addEventListener('change', function() {
        validarTermos();
    });

    document.querySelectorAll('.toggle-password').forEach(function(button) {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            }
        });
    });

    document.getElementById('abrir-termos').addEventListener('click', function(e) {
        e.preventDefault();
        abrirModalTermos();
    });

    document.querySelector('.modal-close').addEventListener('click', function() {
        fecharModalTermos();
    });

    document.querySelector('.btn-modal-confirm').addEventListener('click', function() {
        campos.termos.checked = true;
        validarTermos();
        fecharModalTermos();
    });

    document.querySelector('.btn-modal-close').addEventListener('click', function() {
        fecharModalSucesso();
    });

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            if (e.target.id === 'modal-termos') {
                fecharModalTermos();
            } else if (e.target.id === 'modal-sucesso') {
                fecharModalSucesso();
            }
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const valido = validarTodosCampos();
        
        if (valido) {
            salvarDados();
            abrirModalSucesso();
        } else {
            const primeiroErro = document.querySelector('.error-message:not(:empty)');
            if (primeiroErro) {
                const campoPai = primeiroErro.closest('.form-group');
                if (campoPai) {
                    const input = campoPai.querySelector('input, select, textarea');
                    if (input) {
                        input.focus();
                    }
                }
            }
        }
    });

    form.addEventListener('reset', function(e) {
        e.preventDefault();
        if (confirm('Tem certeza que deseja limpar todos os campos?')) {
            limparFormulario();
        }
    });

    carregarDados();
    
    if (campos.mensagem.value) {
        atualizarContador(campos.mensagem, contadorAtual, contadorMaximo);
    }
});
