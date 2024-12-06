// Variáveis para o carrinho e o total
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let totalCarrinho = parseFloat(localStorage.getItem('total')) || 0;

// Função para adicionar itens ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    totalCarrinho += preco;
    atualizarCarrinho();
}

// Função para atualizar o carrinho na página
function atualizarCarrinho() {
    const carrinhoItens = document.getElementById('carrinho-itens');
    carrinhoItens.innerHTML = ''; // Limpar os itens do carrinho

    // Adicionar os itens no carrinho
    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} `;

        // Botão para remover um item do carrinho
        const removerBtn = document.createElement('button');
        removerBtn.textContent = 'Remover';
        removerBtn.onclick = () => removerDoCarrinho(index);
        li.appendChild(removerBtn);

        carrinhoItens.appendChild(li);
    });

    // Atualizar o valor total e o número de itens no botão do carrinho
    document.getElementById('total').textContent = `Total: R$ ${totalCarrinho.toFixed(2)}`;
    document.getElementById('carrinho-btn').textContent = `Ver Carrinho (${carrinho.length})`;

    // Atualizar no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('total', totalCarrinho.toFixed(2));
}

// Função para remover um item do carrinho
function removerDoCarrinho(index) {
    totalCarrinho -= carrinho[index].preco;
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Função para fechar o modal do carrinho
function fecharModal() {
    document.getElementById('carrinho-modal').style.display = 'none';
}

// Abrir o modal do carrinho
document.getElementById('carrinho-btn').onclick = function () {
    document.getElementById('carrinho-modal').style.display = 'block';
};

// Fechar o modal se clicar fora dele
window.onclick = function (event) {
    const modal = document.getElementById('carrinho-modal');
    if (event.target === modal) {
        fecharModal();
    }
};

// Abrir o formulário de finalização de compra
function abrirFormulario() {
    document.getElementById('carrinho-modal').style.display = 'none';
    document.getElementById('finalizar-modal').style.display = 'block';
}

// Fechar o formulário de finalização de compra
function fecharFormulario() {
    document.getElementById('finalizar-modal').style.display = 'none';
}

// Atualizar o carrinho ao recarregar a página
document.addEventListener('DOMContentLoaded', function () {
    atualizarCarrinho();
});

// Menu responsivo (abrir/fechar)
document.getElementById('menu-toggle').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    const isVisible = menu.style.display === 'flex';
    menu.style.display = isVisible ? 'none' : 'flex';
});

// Pesquisa de produtos
function filtrarProdutos() {
    const termo = document.getElementById('pesquisa-input').value.toLowerCase();
    const produtos = document.querySelectorAll('.produto');

    produtos.forEach((produto) => {
        const nome = produto.querySelector('h3').textContent.toLowerCase();
        if (nome.includes(termo)) {
            produto.style.display = 'block';
        } else {
            produto.style.display = 'none';
        }
    });
}
