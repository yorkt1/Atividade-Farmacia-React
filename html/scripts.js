document.addEventListener('DOMContentLoaded', () => {
    const gerarNormalBtn = document.getElementById('gerar-normal');
    const gerarPreferencialBtn = document.getElementById('gerar-preferencial');
    const chamarSenhaBtn = document.getElementById('chamar-senha');
    const displaySenha = document.getElementById('display-senha');
    const listaNormal = document.getElementById('lista-normal');
    const listaPreferencial = document.getElementById('lista-preferencial');

    // Fila de senhas
    const filaSenhas = {
        normal: [],
        preferencial: []
    };

    // Função para gerar uma senha
    function gerarSenha(tipo) {
        const numero = Math.floor(Math.random() * 1000); // Gerar número aleatório
        const senha = tipo === 'preferencial' ? `P${numero}` : `N${numero}`;
        filaSenhas[tipo].push(senha);

        // Atualiza a lista de senhas
        atualizarListaSenhas(tipo);

        console.log(`Senha ${senha} gerada e adicionada à fila ${tipo}`);
    }

    // Função para atualizar a lista de senhas
    function atualizarListaSenhas(tipo) {
        const lista = tipo === 'preferencial' ? listaPreferencial : listaNormal;
        lista.innerHTML = ''; // Limpa a lista
        filaSenhas[tipo].forEach(s => {
            const li = document.createElement('li');
            li.textContent = s;
            lista.appendChild(li);
        });
    }

    // Função para chamar uma senha
    function chamarSenha() {
        if (filaSenhas.preferencial.length > 0) {
            const senha = filaSenhas.preferencial.shift();
            displaySenha.textContent = `Senha chamada: ${senha}`;
            atualizarListaSenhas('preferencial');
        } else if (filaSenhas.normal.length > 0) {
            const senha = filaSenhas.normal.shift();
            displaySenha.textContent = `Senha chamada: ${senha}`;
            atualizarListaSenhas('normal');
        } else {
            displaySenha.textContent = 'Fila vazia!';
        }
    }

    // Adicionar ouvintes de eventos aos botões
    gerarNormalBtn.addEventListener('click', () => gerarSenha('normal'));
    gerarPreferencialBtn.addEventListener('click', () => gerarSenha('preferencial'));
    chamarSenhaBtn.addEventListener('click', chamarSenha);
});
