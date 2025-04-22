// src/components/dashboard/HistoricoLeituras.js
import { History, Download, FileText } from "lucide-react";
import { formatarData, formatarMoeda } from "@/utils/formatadores";
import { downloadComprovantes } from "@/utils/download";

export default function HistoricoLeituras({ consumos }) {
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
                                <th className="py-3 px-4 font-semibold">Data</th>
                                <th className="py-3 px-4 font-semibold">Referência</th>
                                <th className="py-3 px-4 font-semibold">Volume (m³)</th>
                                <th className="py-3 px-4 font-semibold">Valor</th>
                                <th className="py-3 px-4 font-semibold">Status</th>
                                <th className="py-3 px-4 font-semibold">Comprovantes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-900/20">
                            {consumos.map((consumo) => (
                                <HistoricoRow key={consumo.id} consumo={consumo} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

function HistoricoRow({ consumo }) {
    const comprovantes = consumo.leitura_concessionaria_id?.comprovantes_id || [];
    const temComprovantes = comprovantes.length > 0;
    const status = consumo.leitura_concessionaria_id?.status || 'N/A';
    const isPendente = status === 'Pendente';

    return (
        <tr className="hover:bg-blue-900/20 transition-colors">
            <td className="py-3 px-4 text-gray-300">
                {formatarData(consumo.leitura_concessionaria_id?.data_da_leitura)}
            </td>
            <td className="py-3 px-4 text-gray-300">
                {formatarData(consumo.leitura_concessionaria_id?.mes_de_referencia)}
            </td>
            <td className="py-3 px-4 text-gray-300">
                {consumo.leitura_concessionaria_id?.volume_consumido || 0} m³
            </td>
            <td className="py-3 px-4 text-gray-300">
                {formatarMoeda(consumo.leitura_concessionaria_id?.valor_da_conta)}
            </td>
            <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${isPendente
                    ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-800/60'
                    : 'bg-green-900/30 text-green-300 border border-green-800/60'
                    }`}>
                    {status}
                </span>
            </td>
            <td className="py-3 px-4">
                {temComprovantes ? (
                    <button
                        onClick={() => downloadComprovantes(comprovantes)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-900/30 hover:bg-blue-800/40 rounded-md text-blue-300 text-xs transition-colors"
                    >
                        <FileText size={12} />
                        <span>Baixar</span>
                    </button>
                ) : (
                    <span className="text-gray-500 text-xs italic">Indisponível</span>
                )}
            </td>
        </tr>
    );
}