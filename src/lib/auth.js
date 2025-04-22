import apiClient from "./axios";

/**
 * Realiza o login do usuário na API Directus
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise} Promise com os dados do usuário
 */
export const login = async (email, password) => {
    try {
        const response = await apiClient.post("/auth/login", {
            email,
            password,
        });

        // Salva o token no localStorage
        if (response.data && response.data.data && response.data.data.access_token) {
            localStorage.setItem("authToken", response.data.data.access_token);
            localStorage.setItem("refreshToken", response.data.data.refresh_token);
            localStorage.setItem("userData", JSON.stringify(response.data.data.user));
        }

        return response.data;
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        throw error;
    }
};

/**
 * Verifica se o usuário tem perfil de Síndico
 * @returns {Promise<boolean>} Promise com resultado da verificação
 */
export const checkSyndicProfile = async () => {
    try {
        const response = await apiClient.get("https://hidro.awpsoft.com.br/users/me?fields=*.*");
        
        if (response.data && response.data.data && response.data.data.role && response.data.data.role.name) {
            // Atualiza os dados do usuário com informações mais completas
            localStorage.setItem("userData", JSON.stringify(response.data.data));

            // Verifica se o usuário é Síndico
            return response.data.data.role.name === "Sindico";
        }

        return false;
    } catch (error) {
        console.error("Erro ao verificar perfil de síndico:", error);
        throw error;
    }
};

/**
 * Realiza o logout do usuário
 */
export const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");

    // Redireciona para a página raiz
    if (typeof window !== "undefined") {
        window.location.href = "/";
    }
};

/**
 * Verifica se o usuário está autenticado
 * @returns {boolean} Verdadeiro se autenticado
 */
export const isAuthenticated = () => {
    if (typeof window === "undefined") return false;

    return localStorage.getItem("authToken") !== null;
};

/**
 * Obtém os dados do usuário atual
 * @returns {Object|null} Dados do usuário ou null
 */
export const getCurrentUser = () => {
    if (typeof window === "undefined") return null;

    const userData = localStorage.getItem("userData");

    // Verifica se userData é uma string válida e não a string "undefined"
    if (userData && userData !== "undefined") {
        try {
            return JSON.parse(userData);
        } catch (error) {
            console.error("Erro ao processar dados do usuário:", error);
            return null;
        }
    }

    return null;
};

/**
 * Atualiza o token quando expirado usando o refresh token
 * @returns {Promise} Promise com novo token
 */
export const refreshAuthToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("Refresh token não encontrado");
    }

    try {
        const response = await apiClient.post("/auth/refresh", {
            refresh_token: refreshToken,
        });

        if (response.data && response.data.data) {
            localStorage.setItem("authToken", response.data.data.access_token);
            localStorage.setItem("refreshToken", response.data.data.refresh_token);
        }

        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar token:", error);
        logout();
        throw error;
    }
};