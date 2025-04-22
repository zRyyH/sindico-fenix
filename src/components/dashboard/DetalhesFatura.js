// src/components/dashboard/DetalhesFatura.js
import { BarChart4, Calendar, Droplets, TrendingUp, DollarSign, FileText, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatarData, formatarMoeda } from "@/utils/formatadores";
import { downloadComprovantes } from "@/utils/download";

export default function DetalhesFatura({ leituraMaisRecente, leituraAnterior, diferencaConsumo, diferencaValor }) {
    return (
        <section className="glass-card-light backdrop-blur-md p-6 relative overflow-hidden rounded-xl border border-blue-900/40 animate-fade-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-bl-full"></div>

            <div className="flex justify-between items-center mb-6 z-10 relative">
                <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-lg mr-3">
                        <BarChart4 size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white">Concessionária</h2>
                </div>
                <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${leituraMaisRecente.leitura_concessionaria_id?.status === 'Pendente'
                        ? 'bg-yellow-900/20 text-yellow-300 border border-yellow-800/60'
                        : 'bg-green-900/20 text-green-300 border border-green-800/60'
                        }`}>
                        {leituraMaisRecente.leitura_concessionaria_id?.status || 'N/A'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <InformacoesLeitura leituraMaisRecente={leituraMaisRecente} />
                    <DetalhesConsumo leituraMaisRecente={leituraMaisRecente} />
                    <ComparativoMesAnterior
                        diferencaConsumo={diferencaConsumo}
                        diferencaValor={diferencaValor}
                    />
                </div>

                <div className="space-y-6">
                    <ResumoFinanceiro leituraMaisRecente={leituraMaisRecente} />
                    <SecaoComprovantes leituraMaisRecente={leituraMaisRecente} />
                </div>
            </div>
        </section>
    );
}

function InformacoesLeitura({ leituraMaisRecente }) {
    return (
        <div className="glass-card-glow relative overflow-hidden p-5 backdrop-blur-md border border-blue-900/40 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-blue-800/10 -z-10"></div>
            <div className="flex items-center gap-3 mb-3">
                <Calendar className="text-blue-400" size={18} />
                <h3 className="font-semibold text-blue-300">Informações da Leitura</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-400">Mês de referência</p>
                    <p className="text-lg font-semibold text-white">
                        {formatarData(leituraMaisRecente.leitura_concessionaria_id?.mes_de_referencia)}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Data da leitura</p>
                    <p className="text-lg font-semibold text-white">
                        {formatarData(leituraMaisRecente.leitura_concessionaria_id?.data_da_leitura)}
                    </p>
                </div>
            </div>
        </div>
    );
}

function DetalhesConsumo({ leituraMaisRecente }) {
    return (
        <div className="glass-card-glow relative overflow-hidden p-5 backdrop-blur-md border border-cyan-900/40 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 -z-10"></div>
            <div className="flex items-center gap-3 mb-3">
                <Droplets className="text-cyan-400" size={18} />
                <h3 className="font-semibold text-cyan-300">Detalhes do Consumo</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-400">Volume medido</p>
                    <p className="text-lg font-semibold text-white">
                        {leituraMaisRecente.leitura_concessionaria_id?.volume_medido || 0} m³
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Volume consumido</p>
                    <p className="text-lg font-semibold text-white">
                        {leituraMaisRecente.leitura_concessionaria_id?.volume_consumido || 0} m³
                    </p>
                </div>
            </div>
        </div>
    );
}

function ComparativoMesAnterior({ diferencaConsumo, diferencaValor }) {
    return (
        <div className="glass-card-glow relative overflow-hidden p-5 backdrop-blur-md border border-amber-900/40 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-amber-800/10 -z-10"></div>
            <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="text-amber-400" size={18} />
                <h3 className="font-semibold text-amber-300">Comparativo com Mês Anterior</h3>
            </div>
            <div className="space-y-3">
                <ComparativoItem
                    label="Variação no consumo"
                    diferenca={diferencaConsumo}
                />
                <ComparativoItem
                    label="Variação no valor"
                    diferenca={diferencaValor}
                />
            </div>
        </div>
    );
}

function ComparativoItem({ label, diferenca }) {
    const getColorClass = () => {
        if (!diferenca) return "text-gray-400";
        return parseFloat(diferenca) < 0
            ? "text-green-400"
            : "text-red-400";
    };

    return (
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className={`text-lg font-semibold flex items-center ${getColorClass()}`}>
                {diferenca
                    ? (parseFloat(diferenca) < 0
                        ? <ArrowDownRight size={20} className="mr-1" />
                        : <ArrowUpRight size={20} className="mr-1" />)
                    : null}
                {diferenca
                    ? `${Math.abs(parseFloat(diferenca))}%`
                    : "Não disponível"}
            </p>
        </div>
    );
}

function ResumoFinanceiro({ leituraMaisRecente }) {
    return (
        <div className="glass-card-glow relative overflow-hidden p-5 backdrop-blur-md border border-emerald-900/40 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 -z-10"></div>
            <div className="flex items-center gap-3 mb-3">
                <DollarSign className="text-emerald-400" size={18} />
                <h3 className="font-semibold text-emerald-300">Resumo Financeiro</h3>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-700/40 pb-3">
                    <span className="text-gray-400">Valor da conta:</span>
                    <span className="font-semibold text-lg text-white">
                        {formatarMoeda(leituraMaisRecente.leitura_concessionaria_id?.valor_da_conta)}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Arrecadação:</span>
                    <span className="font-semibold text-white">
                        {formatarMoeda(leituraMaisRecente.arrecadacao)}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Resíduo:</span>
                    <span className="font-semibold text-white">
                        {leituraMaisRecente.residuo} m³
                    </span>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700/40">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-300">Total a pagar:</span>
                    <span className="text-xl font-bold text-emerald-400">
                        {formatarMoeda(leituraMaisRecente.leitura_concessionaria_id?.valor_da_conta)}
                    </span>
                </div>
            </div>
        </div>
    );
}

function SecaoComprovantes({ leituraMaisRecente }) {
    const comprovantes = leituraMaisRecente.leitura_concessionaria_id?.comprovantes_id || [];
    const temComprovantes = comprovantes.length > 0;

    return (
        <div className="glass-card-glow relative overflow-hidden p-5 backdrop-blur-md border border-indigo-900/40 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-indigo-800/10 -z-10"></div>
            <div className="flex items-center gap-3 mb-3">
                <FileText className="text-indigo-400" size={18} />
                <h3 className="font-semibold text-indigo-300">Comprovantes</h3>
            </div>

            {temComprovantes ? (
                <div className="space-y-4">
                    <p className="text-sm text-gray-400">
                        {comprovantes.length}
                        {comprovantes.length === 1
                            ? ' comprovante disponível'
                            : ' comprovantes disponíveis'}
                    </p>

                    <button
                        onClick={() => downloadComprovantes(comprovantes)}
                        className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                    >
                        <FileText size={18} />
                        <span>Baixar Todos os Comprovantes</span>
                    </button>
                </div>
            ) : (
                <div className="bg-gray-800/30 rounded-lg p-4 text-center">
                    <p className="text-gray-400">
                        Nenhum comprovante disponível
                    </p>
                </div>
            )}
        </div>
    );
}