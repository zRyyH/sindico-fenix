// src/components/dashboard/DetalhesFatura.js
import { BarChart4, Calendar, Droplets, TrendingUp, DollarSign, Calculator, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatarData, formatarMoeda } from "@/utils/formatadores";

export default function DetalhesFatura({ leituraMaisRecente, leituraAnterior, diferencaConsumo, diferencaValor }) {
    return (
        <section className="glass-card-light backdrop-blur-md p-6 relative overflow-hidden rounded-xl border border-blue-900/40 animate-fade-in">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-bl-full"></div>

            <div className="flex justify-between items-center mb-6 z-10 relative">
                <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-lg mr-3">
                        <BarChart4 size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white">Detalhes da Conta</h2>
                </div>
                <div>
                    <span className="text-blue-300 text-sm">
                        {leituraMaisRecente.nome_condominio}
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
                    <DetalhesResiduais leituraMaisRecente={leituraMaisRecente} />
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
                        {formatarData(leituraMaisRecente.mes_de_referencia)}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Data da leitura</p>
                    <p className="text-lg font-semibold text-white">
                        {formatarData(leituraMaisRecente.data_leitura_atual)}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Leitura anterior</p>
                    <p className="text-lg font-semibold text-white">
                        {formatarData(leituraMaisRecente.data_leitura_anterior) || "N/A"}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Próxima leitura</p>
                    <p className="text-lg font-semibold text-white">
                        {formatarData(leituraMaisRecente.data_da_proxima_leitura)}
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
                    <p className="text-sm text-gray-400">Leitura anterior</p>
                    <p className="text-lg font-semibold text-white">
                        {leituraMaisRecente.leitura_anterior || "N/A"} m³
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Leitura atual</p>
                    <p className="text-lg font-semibold text-white">
                        {leituraMaisRecente.leitura_atual || 0} m³
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Volume medido</p>
                    <p className="text-lg font-semibold text-white">
                        {leituraMaisRecente.volume_medido || 0} m³
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Consumo total</p>
                    <p className="text-lg font-semibold text-white">
                        {leituraMaisRecente.consumo_total || 0} m³
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

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Valor da conta:</span>
                    <span className="font-semibold text-white">
                        {formatarMoeda(leituraMaisRecente.valor_da_conta)}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Arrecadação:</span>
                    <span className="font-semibold text-white">
                        {formatarMoeda(leituraMaisRecente.arrecadacao)}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Taxa garantidora:</span>
                    <span className="font-semibold text-white">
                        {formatarMoeda(leituraMaisRecente.taxa_garantidora)}
                    </span>
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-700/40">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-300">Total a pagar:</span>
                    <span className="text-xl font-bold text-emerald-400">
                        {formatarMoeda(leituraMaisRecente.valor_total)}
                    </span>
                </div>
            </div>
        </div>
    );
}

function DetalhesResiduais({ leituraMaisRecente }) {
    // Determina se o resíduo é positivo (sobra) ou negativo (falta)
    const residuoPositivo = leituraMaisRecente.residuo > 0;
    const colorClass = residuoPositivo ? "text-green-400" : "text-red-400";

    return (
        <div className="glass-card-glow relative overflow-hidden p-5 backdrop-blur-md border border-purple-900/40 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-purple-800/10 -z-10"></div>
            <div className="flex items-center gap-3 mb-3">
                <Calculator className="text-purple-400" size={18} />
                <h3 className="font-semibold text-purple-300">Cálculo de Resíduos</h3>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Resíduo:</span>
                    <span className={`font-semibold ${colorClass}`}>
                        {leituraMaisRecente.residuo} m³
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Valor residual unitário:</span>
                    <span className={`font-semibold ${colorClass}`}>
                        {formatarMoeda(leituraMaisRecente.valor_residual_unitario)}
                    </span>
                </div>

                <div className="flex justify-between items-center border-t border-gray-700/40 pt-3 mt-3">
                    <span className="text-gray-400">Valor residual total:</span>
                    <span className={`font-semibold ${colorClass}`}>
                        {formatarMoeda(leituraMaisRecente.valor_residual_total)}
                    </span>
                </div>
            </div>

            <div className="mt-4 p-3 bg-gray-800/30 rounded-lg text-xs text-gray-400">
                <p>
                    {residuoPositivo
                        ? "Resíduo positivo indica sobra de água em relação ao volume cobrado pela concessionária."
                        : "Resíduo negativo indica consumo não faturado em relação ao volume cobrado pela concessionária."}
                </p>
            </div>
        </div>
    );
}