import axios from "axios";

// Criando uma instância do axios com configurações padrão para Directus
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055",
    headers: {
        "Content-Type": "application/json",
    },
});

// Criando uma instância do axios para a API Python
export const pythonApiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PYTHON_API_URL || "http://localhost:5000/api/v1",
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

// Também adicionamos o token nas requisições para a API Python
pythonApiClient.interceptors.request.use((config) => {
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

// O mesmo tratamento para a API Python
pythonApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("authToken");

            if (typeof window !== "undefined" && window.location.pathname !== "/") {
                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;