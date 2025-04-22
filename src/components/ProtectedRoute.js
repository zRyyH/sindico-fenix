"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getCurrentUser } from "@/lib/auth";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verifica se o usuário está autenticado
        if (!isAuthenticated()) {
            router.push("/");
            return;
        }

        // Verifica se o usuário é um Síndico
        const user = getCurrentUser();
        if (!user || !user.role || user.role.name !== "Sindico") {
            // Se não for um Síndico, redireciona para a página inicial
            router.push("/");
            return;
        }

        setLoading(false);
    }, [router]);

    // Enquanto estiver carregando, não renderiza o conteúdo
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}