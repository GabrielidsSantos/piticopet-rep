// variaveis p o carrinho e o total
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let totalCarrinho = parseFloat(localStorage.getItem('total')) || 0;

// p add os itens no carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    totalCarrinho += preco;
    atualizarCarrinho();
}

// atualiza o carrinho na pag
function atualizarCarrinho() {
    const carrinhoItens = document.getElementById('carrinho-itens');
    carrinhoItens.innerHTML = '';  // p limpar os itens do carrrinho

    // adiciona os itens no carrinho
    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} `;

        // botao p remover um item do carrinho
        const removerBtn = document.createElement('button');
        removerBtn.textContent = 'Remover';
        removerBtn.onclick = () => removerDoCarrinho(index);
        li.appendChild(removerBtn);


        carrinhoItens.appendChild(li);
    });

    // atualiza o valor total e o número de itens no botão do carrinho
    document.getElementById('total').textContent = `Total: R$ ${totalCarrinho.toFixed(2)}`;
    document.getElementById('carrinho-btn').textContent = `Ver Carrinho (${carrinho.length})`;

    // atualiza a variavel
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('total', totalCarrinho.toFixed(2));
}



        
// p remover um item do carrinho
function removerDoCarrinho(index) {
    totalCarrinho -= carrinho[index].preco;
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// p fechar a abinha do carrinho
function fecharModal() {
    document.getElementById('carrinho-modal').style.display = 'none';
}

// abrir a abinha do carrinho
document.getElementById('carrinho-btn').onclick = function () {
    document.getElementById('carrinho-modal').style.display = 'block';
};

// p fechar a abinha se clicar fora dela
window.onclick = function (event) {
    const modal = document.getElementById('carrinho-modal');
    if (event.target === modal) {
        fecharModal();
    }
};

// abrir o formulario de finalização de compra
function abrirFormulario() {
    document.getElementById('carrinho-modal').style.display = 'none';
    document.getElementById('finalizar-modal').style.display = 'block';
}

// p fechar o formulario
function fecharFormulario() {
    document.getElementById('finalizar-modal').style.display = 'none';
}


// atualiza o carrinho qnd recarregar página
document.addEventListener('DOMContentLoaded', function () {
    atualizarCarrinho(); 
});

// Menu responsivo (abrir/fechar)
document.getElementById('menu-btn').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
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

// Seleciona o botão e o menu
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

// Adiciona evento de clique para alternar a visibilidade do menu
menuToggle.addEventListener('click', () => {
    const isVisible = menu.style.display === 'flex';
    menu.style.display = isVisible ? 'none' : 'flex';
});

