"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { buscarConsumosCondominios } from "@/lib/consumos-api";

// Componentes
import Header from "@/components/dashboard/Header";
import LoadingState from "@/components/dashboard/LoadingState";
import ErrorState from "@/components/dashboard/ErrorState";
import ResumoCards from "@/components/dashboard/ResumoCards";
import DetalhesFatura from "@/components/dashboard/DetalhesFatura";
import LeituraAnterior from "@/components/dashboard/LeituraAnterior";
import HistoricoLeituras from "@/components/dashboard/HistoricoLeituras";
import BalancoMensal from "@/components/dashboard/BalancoMensal";
import Footer from "@/components/dashboard/Footer";

// Utilitários
import { calcularDiferenca } from "@/utils/formatadores";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [consumos, setConsumos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userData = getCurrentUser();
        if (userData) {
            setUser(userData);
        }

        fetchDadosConsumo();
    }, []);

    const fetchDadosConsumo = async () => {
        try {
            setIsLoading(true);
            const dadosConsumo = await buscarConsumosCondominios();
            setConsumos(dadosConsumo);
        } catch (err) {
            console.error("Erro ao buscar dados de consumo:", err);
            setError("Falha ao carregar dados de consumo. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    // Obter leitura mais recente e anterior
    const leituraMaisRecente = consumos.length > 0 ? consumos[0] : null;
    const leituraAnterior = consumos.length > 1 ? consumos[1] : null;

    // Calcular diferenças para comparativos
    const diferencaConsumo = leituraMaisRecente && leituraAnterior
        ? calcularDiferenca(
            leituraMaisRecente.volume_medido,
            leituraAnterior.volume_medido
        ) : null;

    const diferencaValor = leituraMaisRecente && leituraAnterior
        ? calcularDiferenca(
            leituraMaisRecente.valor_da_conta,
            leituraAnterior.valor_da_conta
        ) : null;

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-blue-950 to-gray-950 relative overflow-hidden p-4 md:p-6">
                {/* Efeitos de fundo */}
                <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-40 left-20 w-72 h-72 bg-blue-500/15 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/15 rounded-full filter blur-3xl"></div>
                    <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-cyan-500/15 rounded-full filter blur-3xl"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <Header user={user} onLogout={logout} />

                    {isLoading ? (
                        <LoadingState />
                    ) : error ? (
                        <ErrorState message={error} onRetry={fetchDadosConsumo} />
                    ) : (
                        <main className="grid grid-cols-1 gap-6 animate-fade-in">
                            {leituraMaisRecente && (
                                <ResumoCards
                                    leituraMaisRecente={leituraMaisRecente}
                                    diferencaConsumo={diferencaConsumo}
                                    diferencaValor={diferencaValor}
                                />
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {leituraMaisRecente && (
                                    <DetalhesFatura
                                        leituraMaisRecente={leituraMaisRecente}
                                        leituraAnterior={leituraAnterior}
                                        diferencaConsumo={diferencaConsumo}
                                        diferencaValor={diferencaValor}
                                    />
                                )}

                                {leituraMaisRecente && (
                                    <BalancoMensal
                                        leituraMaisRecente={leituraMaisRecente}
                                    />
                                )}
                            </div>

                            {leituraAnterior && (
                                <LeituraAnterior
                                    leituraAnterior={leituraAnterior}
                                />
                            )}

                            <HistoricoLeituras
                                consumos={consumos}
                            />
                        </main>
                    )}

                    <Footer />
                </div>
            </div>
        </ProtectedRoute>
    );
}