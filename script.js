let gastos = [];

function adicionarGasto() {
    const descricao = prompt("Descrição do gasto:");
    const valor = parseFloat(prompt("Valor do gasto:"));
    const importante = confirm("Este gasto é importante?");
    
    if (descricao && !isNaN(valor)) {
        gastos.push({ descricao, valor, importante });
        atualizarTabela();
        calcularSaldo();
    } else {
        alert("Por favor, insira uma descrição e um valor válidos.");
    }
}

function atualizarTabela() {
    const tabela = document.getElementById("tabela-gastos").getElementsByTagName("tbody")[0];
    tabela.innerHTML = "";

    gastos.forEach((gasto, index) => {
        const row = tabela.insertRow();
        row.insertCell(0).innerText = gasto.descricao;
        row.insertCell(1).innerText = gasto.valor.toFixed(2);
        const importanteCell = row.insertCell(2);
        importanteCell.innerText = gasto.importante ? "Sim" : "Não";
        if (gasto.importante) {
            row.style.backgroundColor = "#f8d7da"; // Cor vermelha para gastos importantes
        } else {
            row.style.backgroundColor = "#d4edda"; // Cor verde para gastos não importantes
        }
        const acaoCell = row.insertCell(3);
        const toggleButton = document.createElement("button");
        toggleButton.innerText = "Mudar Importância";
        toggleButton.onclick = () => {
            gasto.importante = !gasto.importante;
            atualizarTabela();
        };
        acaoCell.appendChild(toggleButton);
    });
}

function calcularSaldo() {
    const salario = parseFloat(document.getElementById("salario").value) || 0;
    const totalGastos = gastos.reduce((sum, gasto) => sum + gasto.valor, 0);
    const saldo = salario - totalGastos;

    document.getElementById("saldo-atual").innerText = saldo.toFixed(2);
}