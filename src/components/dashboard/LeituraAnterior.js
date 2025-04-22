// src/components/dashboard/LeituraAnterior.js
import { History, Download } from "lucide-react";
import { formatarData, formatarMoeda } from "@/utils/formatadores";
import { downloadComprovantes } from "@/utils/download";

export default function LeituraAnterior({ leituraAnterior }) {
    const temComprovantes = leituraAnterior.leitura_concessionaria_id?.comprovantes_id &&
        leituraAnterior.leitura_concessionaria_id?.comprovantes_id.length > 0;

    return (
        <section className="glass-card-light backdrop-blur-md p-6 relative overflow-hidden rounded-xl border border-blue-900/40 animate-fade-in">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gray-400/10 to-transparent rounded-bl-full"></div>

            <div className="flex justify-between items-center mb-6 z-10 relative">
                <div className="flex items-center">
                    <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-2 rounded-lg mr-3">
                        <History size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white">Leitura Anterior</h2>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoCard
                    label="Data da leitura"
                    valor={formatarData(leituraAnterior.leitura_concessionaria_id?.data_da_leitura)}
                />

                <InfoCard
                    label="Volume medido"
                    valor={`${leituraAnterior.leitura_concessionaria_id?.volume_medido || 0} m³`}
                />

                <InfoCard
                    label="Volume consumido"
                    valor={`${leituraAnterior.leitura_concessionaria_id?.volume_consumido || 0} m³`}
                />

                <InfoCard
                    label="Valor da conta"
                    valor={formatarMoeda(leituraAnterior.leitura_concessionaria_id?.valor_da_conta)}
                />
            </div>

            {temComprovantes && (
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => downloadComprovantes(leituraAnterior.leitura_concessionaria_id.comprovantes_id)}
                        className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-all shadow-md"
                    >
                        <Download size={16} />
                        <span>Baixar Comprovantes</span>
                    </button>
                </div>
            )}
        </section>
    );
}

function InfoCard({ label, valor }) {
    return (
        <div className="glass-card-glow relative overflow-hidden p-4 backdrop-blur-md border border-gray-700/40 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-700/30 -z-10"></div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-lg font-semibold mt-1 text-white">{valor}</p>
        </div>
    );
}