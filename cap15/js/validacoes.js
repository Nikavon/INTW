const Validacoes = {
    validarNome(nome) {
        const erros = [];
        
        if (!nome || nome.trim().length === 0) {
            erros.push('Nome é obrigatório');
        } else if (nome.trim().length < 3) {
            erros.push('Nome deve ter no mínimo 3 caracteres');
        }
        
        return {
            valido: erros.length === 0,
            erros: erros
        };
    },

    validarEmail(email) {
        const erros = [];
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email || email.trim().length === 0) {
            erros.push('E-mail é obrigatório');
        } else if (!regex.test(email)) {
            erros.push('Formato de e-mail inválido');
        }
        
        return {
            valido: erros.length === 0,
            erros: erros
        };
    },

    validarTelefone(telefone) {
        const erros = [];
        const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
        
        if (!telefone || telefone.trim().length === 0) {
            erros.push('Telefone é obrigatório');
        } else if (!regex.test(telefone)) {
            erros.push('Formato inválido. Use (82) 99999-9999');
        }
        
        return {
            valido: erros.length === 0,
            erros: erros
        };
    },

    validarNascimento(data) {
        const erros = [];
        
        if (!data) {
            erros.push('Data de nascimento é obrigatória');
        } else {
            const partes = data.split('-');
            if (partes.length === 3) {
                const ano = parseInt(partes[0]);
                const mes = parseInt(partes[1]);
                const dia = parseInt(partes[2]);
                
                if (ano < 1900 || ano > 2010) {
                    erros.push('Ano inválido');
                } else if (mes < 1 || mes > 12) {
                    erros.push('Mês inválido');
                } else if (dia < 1 || dia > 31) {
                    erros.push('Dia inválido');
                } else {
                    const dataValida = new Date(ano, mes - 1, dia);
                    if (dataValida.getFullYear() !== ano || 
                        dataValida.getMonth() !== mes - 1 || 
                        dataValida.getDate() !== dia) {
                        erros.push('Data inválida');
                    } else {
                        const idade = calcularIdade(data);
                        if (idade < 16) {
                            erros.push('Você deve ter pelo menos 16 anos');
                        }
                    }
                }
            } else {
                erros.push('Formato de data inválido');
            }
        }
        
        return {
            valido: erros.length === 0,
            erros: erros
        };
    },

    validarCurso(curso) {
        const erros = [];
        
        if (!curso || curso === '') {
            erros.push('Selecione um curso');
        }
        
        return {
            valido: erros.length === 0,
            erros: erros
        };
    },

    validarTurno(turno) {
        const erros = [];
        
        if (!turno) {
            erros.push('Selecione um turno');
        }
        
        return {
            valido: erros.length === 0,
            erros: erros
        };
    },

    validarInteresses(interesses) {
        const erros = [];
        const selecionados = Array.from(interesses).filter(function(cb) {
            return cb.checked;
        });
        
        if (selecionados.length < 2) {
            erros.push('Selecione pelo menos 2 áreas de interesse');
        }
        
        return {
            valido: erros.length === 0,
            erros: erros
        };
    },

    validarSenha(senha) {
        const erros = [];
        
        if (!senha || senha.length === 0) {
            erros.push('Senha é obrigatória');
        } else {
            if (senha.length < 8) {
                erros.push('Senha deve ter no mínimo 8 caracteres');
            }
            if (!/[A-Z]/.test(senha)) {
                erros.push('Senha deve conter pelo menos uma letra maiúscula');
            }
            if (!/[0-9]/.test(senha)) {
                erros.push('Senha deve conter pelo menos um número');
            }
        }
        
        return {
            valido: erros.length === 0,
            erros: erros
        };
    },

    validarConfirmarSenha(senha, confirmar) {
        const erros = [];
        
        if (!confirmar || confirmar.length === 0) {
            erros.push('Confirmação de senha é obrigatória');
        } else if (senha !== confirmar) {
            erros.push('As senhas não coincidem');
        }
        
        return {
            valido: erros.length === 0,
            erros: erros
        };
    },

    validarFoto(file) {
        const erros = [];
        
        if (file && file.size > 0) {
            const tiposPermitidos = ['image/jpeg', 'image/png'];
            const tamanhoMaximo = 2 * 1024 * 1024;
            
            if (!tiposPermitidos.includes(file.type)) {
                erros.push('A foto deve ser JPG ou PNG');
            }
            
            if (file.size > tamanhoMaximo) {
                erros.push('A foto deve ter no máximo 2 MB');
            }
        }
        
        return {
            valido: erros.length === 0,
            erros: erros
        };
    },

    validarMensagem(mensagem) {
        const erros = [];
        
        if (!mensagem || mensagem.trim().length === 0) {
            erros.push('Mensagem é obrigatória');
        } else {
            if (mensagem.length < 50) {
                erros.push('Mensagem deve ter no mínimo 50 caracteres');
            }
            if (mensagem.length > 500) {
                erros.push('Mensagem deve ter no máximo 500 caracteres');
            }
        }
        
        return {
            valido: erros.length === 0,
            erros: erros
        };
    },

    validarTermos(aceito) {
        const erros = [];
        
        if (!aceito) {
            erros.push('Você deve aceitar os termos para continuar');
        }
        
        return {
            valido: erros.length === 0,
            erros: erros
        };
    },

    validarFormulario(dados) {
        const resultados = {
            valido: true,
            erros: {}
        };
        
        const validacoes = {
            nome: function() { return this.validarNome(dados.nome); },
            email: function() { return this.validarEmail(dados.email); },
            telefone: function() { return this.validarTelefone(dados.telefone); },
            nascimento: function() { return this.validarNascimento(dados.nascimento); },
            curso: function() { return this.validarCurso(dados.curso); },
            turno: function() { return this.validarTurno(dados.turno); },
            interesses: function() { return this.validarInteresses(dados.interesses); },
            senha: function() { return this.validarSenha(dados.senha); },
            confirmarSenha: function() { return this.validarConfirmarSenha(dados.senha, dados.confirmarSenha); },
            foto: function() { return this.validarFoto(dados.foto); },
            mensagem: function() { return this.validarMensagem(dados.mensagem); },
            termos: function() { return this.validarTermos(dados.termos); }
        };
        
        for (const campo in validacoes) {
            const resultado = validacoes[campo].call(this);
            if (!resultado.valido) {
                resultados.valido = false;
                resultados.erros[campo] = resultado.erros;
            }
        }
        
        return resultados;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validacoes;
}