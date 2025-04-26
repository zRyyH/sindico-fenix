// src/components/dashboard/HistoricoLeituras.js
import { History, Info } from "lucide-react";
import { formatarData, formatarMoeda } from "@/utils/formatadores";
import { useState } from "react";

export default function HistoricoLeituras({ consumos }) {
    const [showAllColumns, setShowAllColumns] = useState(false);

    return (
        <section className="glass-card-light backdrop-blur-md p-6 relative overflow-hidden rounded-xl border border-blue-900/40 animate-fade-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-bl-full"></div>

            <div className="flex justify-between items-center mb-6 z-10 relative">
                <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-lg mr-3">
                        <History size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white">Histórico de Leituras</h2>
                </div>
                <button
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-900/30 hover:bg-blue-800/40 rounded-md text-blue-300 transition-colors"
                    onClick={() => setShowAllColumns(!showAllColumns)}
                >
                    <Info size={16} />
                    {showAllColumns ? "Menos detalhes" : "Mais detalhes"}
                </button>
            </div>

            {consumos.length === 0 ? (
                <div className="glass-card border border-blue-900/20 rounded-xl p-8 text-center">
                    <p className="text-gray-400">
                        Nenhum registro de consumo encontrado
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-blue-900/30">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 text-blue-100 text-left">
                                <th className="py-3 px-4 font-semibold">Data Leitura</th>
                                <th className="py-3 px-4 font-semibold">Referência</th>
                                <th className="py-3 px-4 font-semibold">Leitura</th>
                                <th className="py-3 px-4 font-semibold">Volume (m³)</th>
                                {showAllColumns && (
                                    <>
                                        <th className="py-3 px-4 font-semibold">Consumo (m³)</th>
                                        <th className="py-3 px-4 font-semibold">Residuo (m³)</th>
                                    </>
                                )}
                                <th className="py-3 px-4 font-semibold">Base (R$)</th>
                                {showAllColumns && (
                                    <>
                                        <th className="py-3 px-4 font-semibold">Residual</th>
                                        <th className="py-3 px-4 font-semibold">Taxa</th>
                                    </>
                                )}
                                <th className="py-3 px-4 font-semibold">Total (R$)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-900/20">
                            {consumos.map((consumo, index) => (
                                <HistoricoRow
                                    key={index}
                                    consumo={consumo}
                                    showAllColumns={showAllColumns}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

function HistoricoRow({ consumo, showAllColumns }) {
    // Determina se o resíduo é positivo ou negativo para aplicar cor adequada
    const residuoClass = consumo.residuo > 0 ? "text-green-400" : consumo.residuo < 0 ? "text-red-400" : "text-gray-300";
    const residualClass = consumo.valor_residual_total > 0 ? "text-green-400" : consumo.valor_residual_total < 0 ? "text-red-400" : "text-gray-300";

    return (
        <tr className="hover:bg-blue-900/20 transition-colors">
            <td className="py-3 px-4 text-gray-300">
                {formatarData(consumo.data_leitura_atual)}
            </td>
            <td className="py-3 px-4 text-gray-300">
                {formatarData(consumo.mes_de_referencia)}
            </td>
            <td className="py-3 px-4 text-gray-300">
                {consumo.leitura_atual || 0} m³
            </td>
            <td className="py-3 px-4 text-gray-300">
                {consumo.volume_medido || 0} m³
            </td>
            {showAllColumns && (
                <>
                    <td className="py-3 px-4 text-gray-300">
                        {consumo.consumo_total || 0} m³
                    </td>
                    <td className={`py-3 px-4 ${residuoClass}`}>
                        {consumo.residuo || 0} m³
                    </td>
                </>
            )}
            <td className="py-3 px-4 text-gray-300">
                {formatarMoeda(consumo.valor_da_conta)}
            </td>
            {showAllColumns && (
                <>
                    <td className={`py-3 px-4 ${residualClass}`}>
                        {formatarMoeda(consumo.valor_residual_total)}
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                        {formatarMoeda(consumo.taxa_garantidora)}
                    </td>
                </>
            )}
            <td className="py-3 px-4 font-medium text-white">
                {formatarMoeda(consumo.valor_total)}
            </td>
        </tr>
    );
}