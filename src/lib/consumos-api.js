// src/lib/consumos-api.js
import { pythonApiClient } from "./axios";

/**
 * Busca os dados de consumo de água do condomínio
 * @returns {Promise} Promise com os dados de consumo
 */
export const buscarConsumosCondominios = async () => {
    try {
        const response = await pythonApiClient.get("/consumos-condominios");

        // Verifica se o objeto de resposta tem a estrutura esperada
        if (response.data && Array.isArray(response.data.agua)) {
            // Ordena os consumos por data de leitura (mais recentes primeiro)
            return response.data.agua.sort((a, b) => {
                const dataA = new Date(a.data_leitura_atual || 0);
                const dataB = new Date(b.data_leitura_atual || 0);
                return dataB - dataA;
            });
        }

        // Caso a estrutura não seja a esperada mas tenha dados, tenta adaptá-la
        if (response.data && typeof response.data === 'object') {
            console.warn('Formato de resposta da API não é o esperado. Tentando adaptar.');

            // Se os dados estiverem em outra propriedade ou diretamente no objeto
            if (Array.isArray(response.data)) {
                return response.data;
            }

            // Procura por qualquer array no objeto de resposta
            for (const key in response.data) {
                if (Array.isArray(response.data[key])) {
                    return response.data[key];
                }
            }
        }

        // Retorna array vazio se não encontrar dados válidos
        console.error('Formato de resposta da API inválido:', response.data);
        return [];
    } catch (error) {
        console.error("Erro ao buscar dados de consumo:", error);

        // Verifica se é um erro de conexão
        if (!error.response) {
            throw new Error(`Falha na conexão com o servidor. Verifique se a API está rodando em ${process.env.NEXT_PUBLIC_PYTHON_API_URL}`);
        }

        // Verifica se é um erro de autenticação
        if (error.response.status === 401 || error.response.status === 403) {
            throw new Error('Erro de autenticação. Faça login novamente.');
        }

        // Outros erros
        throw new Error(error.response?.data?.message || 'Erro ao buscar dados de consumo');
    }
};