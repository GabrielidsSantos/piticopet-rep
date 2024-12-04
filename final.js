
function finalizarCompra(event) {
    event.preventDefault(); 

    
    // pega os dados colocados pelo usuario
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const cartao = document.getElementById('cartao').value;
    const validade = document.getElementById('validade').value;
    const cvv = document.getElementById('cvv').value;

    // pega o total do localstorage (variavel) da outra pagina e o id do html
    const totalCarrinho = localStorage.getElementById('total') || 0;
    

   
    // valida se cada campo esta correto
    if (nome && endereco && cartao.length === 16 && validade && cvv.length === 3) {

        //alerta (que as vzs nn funciona)
        alert(`Pagamento realizado com sucesso!\nTotal: R$ ${totalCarrinho.toFixed(2)}`);

        // limpa a variavel e o carrinho
        localStorage.removeItem('carrinho');
        localStorage.removeItem('total');

        // volta p pag inicial
        window.location.href = 'index.html';
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

// inicializa a compra na pag q abriu
document.addEventListener('DOMContentLoaded', function () {
    // volta para o formulário de pagamento
    document.getElementById('pagamento-form').addEventListener('submit', finalizarCompra);
});


