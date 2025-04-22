// src/utils/formatadores.js

// Formatar data para exibição
export function formatarData(dataString) {
    if (!dataString) return "N/A";

    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
}

// Formatar valores monetários
export function formatarMoeda(valor) {
    if (!valor) return "R$ 0,00";

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(parseFloat(valor));
}

// Calcular diferença percentual entre valores
export function calcularDiferenca(atual, anterior) {
    if (!atual || !anterior) return null;

    const valorAtual = parseFloat(atual);
    const valorAnterior = parseFloat(anterior);

    if (valorAnterior === 0) return null;

    const diferenca = ((valorAtual - valorAnterior) / valorAnterior) * 100;
    return diferenca.toFixed(1);
}