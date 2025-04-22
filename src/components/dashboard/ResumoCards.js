// src/components/dashboard/ResumoCards.js
import { Droplets, DollarSign, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatarData, formatarMoeda } from "@/utils/formatadores";

export default function ResumoCards({ leituraMaisRecente, diferencaConsumo, diferencaValor }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Valor da conta */}
            <ResumoCard
                titulo="Valor a Pagar"
                valor={formatarMoeda(leituraMaisRecente.leitura_concessionaria_id?.valor_da_conta)}
                diferenca={diferencaValor}
                icone={<DollarSign size={24} />}
                cor="emerald"
                iconeGrande={<DollarSign size={100} className="opacity-5" />}
            />

            {/* Consumo */}
            <ResumoCard
                titulo="Consumo de Água"
                valor={`${leituraMaisRecente.leitura_concessionaria_id?.volume_consumido || 0} m³`}
                diferenca={diferencaConsumo}
                icone={<Droplets size={24} />}
                cor="blue"
                iconeGrande={<Droplets size={100} className="opacity-5" />}
            />

            {/* Próxima leitura */}
            <ProximaLeituraCard leituraMaisRecente={leituraMaisRecente} />
        </div>
    );
}

function ResumoCard({ titulo, valor, diferenca, icone, cor, iconeGrande }) {
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
        if (!leituraMaisRecente.leitura_concessionaria_id?.data_da_proxima_leitura) return "";
        const proxima = new Date(leituraMaisRecente.leitura_concessionaria_id.data_da_proxima_leitura);
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
                        {formatarData(leituraMaisRecente.leitura_concessionaria_id?.data_da_proxima_leitura)}
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