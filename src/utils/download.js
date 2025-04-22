// src/utils/download.js

/**
 * Função para baixar todos os comprovantes de uma leitura
 * @param {Array} comprovantes - Lista de comprovantes para download
 */
export function downloadComprovantes(comprovantes) {
    if (!comprovantes || comprovantes.length === 0) {
        alert("Não há comprovantes disponíveis para download.");
        return;
    }

    // Baixa cada comprovante em sequência
    comprovantes.forEach((comprovante, index) => {
        const downloadUrl = `https://hidro.awpsoft.com.br/assets/${comprovante.directus_files_id}?download`;

        // Cria um pequeno atraso entre os downloads para evitar bloqueio do navegador
        setTimeout(() => {
            window.open(downloadUrl, "_blank");
        }, index * 300);
    });
}