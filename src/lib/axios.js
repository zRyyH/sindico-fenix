import axios from "axios";

// Substitua pela URL da sua API Directus
const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

// Criando uma instância do axios com configurações padrão
const apiClient = axios.create({
    baseURL: DIRECTUS_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para adicionar o token de autenticação em todas as requisições
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Interceptor para tratar erros de autenticação
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Se o token expirou (status 401), redireciona para página raiz
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("authToken");

            // Redireciona para a página raiz (não para login)
            if (typeof window !== "undefined" && window.location.pathname !== "/") {
                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;