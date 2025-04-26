// src/components/dashboard/ResumoCards.js
import { Droplets, DollarSign, Calendar, ArrowUpRight, ArrowDownRight, Gauge } from "lucide-react";
import { formatarData, formatarMoeda } from "@/utils/formatadores";

export default function ResumoCards({ leituraMaisRecente, diferencaConsumo, diferencaValor }) {
    // Verifica se há resíduo negativo significativo
    const residuoNegativo = leituraMaisRecente.residuo < 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Valor da conta */}
            <ResumoCard
                titulo="Valor Total"
                valor={formatarMoeda(leituraMaisRecente.valor_total)}
                diferenca={diferencaValor}
                icone={<DollarSign size={24} />}
                cor="emerald"
                iconeGrande={<DollarSign size={100} className="opacity-5" />}
                detalhe={`Base: ${formatarMoeda(leituraMaisRecente.valor_da_conta)}`}
            />

            {/* Consumo */}
            <ResumoCard
                titulo="Consumo Total"
                valor={`${leituraMaisRecente.consumo_total || 0} m³`}
                diferenca={diferencaConsumo}
                icone={<Droplets size={24} />}
                cor="blue"
                iconeGrande={<Droplets size={100} className="opacity-5" />}
                detalhe={`Medido: ${leituraMaisRecente.volume_medido || 0} m³`}
            />

            {/* Próxima leitura ou Resíduo (se negativo) */}
            {residuoNegativo ? (
                <ResiduoCard leituraMaisRecente={leituraMaisRecente} />
            ) : (
                <ProximaLeituraCard leituraMaisRecente={leituraMaisRecente} />
            )}
        </div>
    );
}

function ResumoCard({ titulo, valor, diferenca, icone, cor, iconeGrande, detalhe }) {
    // Definir classes baseadas na cor
    const colorClasses = {
        blue: {
            card: "from-blue-900/40 to-blue-800/30",
            icon: "from-blue-500 to-blue-600",
            text: "text-blue-300"
        },
        emerald: {
            card: "from-emerald-900/40 to-emerald-800/30",
            icon: "from-emerald-500 to-emerald-600",
            text: "text-emerald-300"
        },
        purple: {
            card: "from-purple-900/40 to-purple-800/30",
            icon: "from-purple-500 to-purple-600",
            text: "text-purple-300"
        },
        amber: {
            card: "from-amber-900/40 to-amber-800/30",
            icon: "from-amber-500 to-amber-600",
            text: "text-amber-300"
        },
        red: {
            card: "from-red-900/40 to-red-800/30",
            icon: "from-red-500 to-red-600",
            text: "text-red-300"
        }
    };

    const classes = colorClasses[cor] || colorClasses.blue;

    return (
        <div className={`glass-card-glow relative overflow-hidden p-6 backdrop-blur-md animate-fade-in transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${classes.card} -z-10`}></div>
            <div className="absolute -bottom-6 -right-6">
                {iconeGrande}
            </div>
            <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                    <p className={`text-sm font-medium mb-1 ${classes.text}`}>
                        {titulo}
                    </p>
                    <h3 className="text-3xl font-bold text-white">
                        {valor}
                    </h3>
                    {detalhe && (
                        <p className="text-sm text-gray-400 mt-1">{detalhe}</p>
                    )}
                </div>
                <div className={`bg-gradient-to-r ${classes.icon} p-3 rounded-lg shadow-md text-white`}>
                    {icone}
                </div>
            </div>
            {diferenca !== null && (
                <div className="flex items-center text-sm relative z-10">
                    <span className={parseFloat(diferenca) < 0 ? "text-emerald-400" : "text-red-400"}>
                        {parseFloat(diferenca) < 0 ? (
                            <ArrowDownRight size={16} className="inline mr-1" />
                        ) : (
                            <ArrowUpRight size={16} className="inline mr-1" />
                        )}
                        {Math.abs(parseFloat(diferenca))}% em relação ao mês anterior
                    </span>
                </div>
            )}
        </div>
    );
}

function ProximaLeituraCard({ leituraMaisRecente }) {
    const calcularDiasRestantes = () => {
        if (!leituraMaisRecente.data_da_proxima_leitura) return "";
        const proxima = new Date(leituraMaisRecente.data_da_proxima_leitura);
        const hoje = new Date();
        const diff = Math.ceil((proxima - hoje) / (1000 * 60 * 60 * 24));
        return diff > 0 ? `Faltam ${diff} dias` : "Leitura pendente";
    };

    return (
        <div className="glass-card-glow relative overflow-hidden p-6 backdrop-blur-md animate-fade-in transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-purple-800/30 -z-10"></div>
            <div className="absolute -bottom-6 -right-6">
                <Calendar size={100} className="opacity-5" />
            </div>
            <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                    <p className="text-sm font-medium mb-1 text-purple-300">
                        Próxima Leitura
                    </p>
                    <h3 className="text-3xl font-bold text-white">
                        {formatarData(leituraMaisRecente.data_da_proxima_leitura)}
                    </h3>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-lg shadow-md">
                    <Calendar size={24} />
                </div>
            </div>
            <div className="text-sm text-purple-300 relative z-10">
                {calcularDiasRestantes()}
            </div>
        </div>
    );
}

function ResiduoCard({ leituraMaisRecente }) {
    // Formata o valor para exibição
    const valorResidual = formatarMoeda(Math.abs(leituraMaisRecente.valor_residual_total));

    return (
        <div className="glass-card-glow relative overflow-hidden p-6 backdrop-blur-md animate-fade-in transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-red-800/30 -z-10"></div>
            <div className="absolute -bottom-6 -right-6">
                <Gauge size={100} className="opacity-5" />
            </div>
            <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                    <p className="text-sm font-medium mb-1 text-red-300">
                        Resíduo de Água
                    </p>
                    <h3 className="text-3xl font-bold text-white">
                        {Math.abs(leituraMaisRecente.residuo)} m³
                    </h3>
                </div>
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-lg shadow-md">
                    <Gauge size={24} />
                </div>
            </div>
            <div className="text-sm text-gray-400 relative z-10">
                <p>Valor residual: {valorResidual}</p>
                <p className="mt-1 text-xs">Ajuste aplicado com taxa garantidora</p>
            </div>
        </div>
    );
}