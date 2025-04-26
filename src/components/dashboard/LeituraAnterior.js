// src/components/dashboard/LeituraAnterior.js
import { History, Droplets, DollarSign, Calculator } from "lucide-react";
import { formatarData, formatarMoeda } from "@/utils/formatadores";

export default function LeituraAnterior({ leituraAnterior }) {
    // Determina se o resíduo é positivo ou negativo para estilização adequada
    const residuoPositivo = leituraAnterior.residuo > 0;
    const residuoClass = residuoPositivo ? "border-green-900/40" : "border-red-900/40";
    const residuoIconClass = residuoPositivo ? "text-green-400" : "text-red-400";

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
                <div>
                    <span className="text-gray-400 text-sm">
                        {formatarData(leituraAnterior.mes_de_referencia)}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-6">
                    <InfoCard
                        titulo="Detalhes da Leitura"
                        icone={<Droplets />}
                        cor="blue"
                        itens={[
                            { label: "Data da leitura", valor: formatarData(leituraAnterior.data_leitura_atual) },
                            { label: "Leitura registrada", valor: `${leituraAnterior.leitura_atual || 0} m³` },
                            { label: "Volume medido", valor: `${leituraAnterior.volume_medido || 0} m³` },
                            { label: "Consumo total", valor: `${leituraAnterior.consumo_total || 0} m³` },
                        ]}
                    />
                </div>

                <div className="space-y-6">
                    <InfoCard
                        titulo="Valores"
                        icone={<DollarSign />}
                        cor="emerald"
                        itens={[
                            { label: "Valor da conta", valor: formatarMoeda(leituraAnterior.valor_da_conta) },
                            { label: "Taxa garantidora", valor: formatarMoeda(leituraAnterior.taxa_garantidora) },
                            { label: "Arrecadação", valor: formatarMoeda(leituraAnterior.arrecadacao) },
                            { label: "Total", valor: formatarMoeda(leituraAnterior.valor_total), destaque: true },
                        ]}
                    />
                </div>

                <div className="space-y-6">
                    <InfoCard
                        titulo="Resíduos"
                        icone={<Calculator />}
                        cor={residuoPositivo ? "green" : "red"}
                        corClasse={residuoClass}
                        iconeClasse={residuoIconClass}
                        itens={[
                            { label: "Resíduo", valor: `${leituraAnterior.residuo} m³` },
                            { label: "Valor unitário", valor: formatarMoeda(leituraAnterior.valor_residual_unitario) },
                            { label: "Valor total", valor: formatarMoeda(leituraAnterior.valor_residual_total), destaque: true },
                        ]}
                    />
                </div>
            </div>
        </section>
    );
}

function InfoCard({ titulo, icone, cor, itens, corClasse, iconeClasse }) {
    // Definir classes baseadas na cor
    const colorClasses = {
        blue: {
            border: "border-blue-900/40",
            bg: "from-blue-900/20 to-blue-800/10",
            text: "text-blue-400"
        },
        emerald: {
            border: "border-emerald-900/40",
            bg: "from-emerald-900/20 to-emerald-800/10",
            text: "text-emerald-400"
        },
        green: {
            border: "border-green-900/40",
            bg: "from-green-900/20 to-green-800/10",
            text: "text-green-400"
        },
        red: {
            border: "border-red-900/40",
            bg: "from-red-900/20 to-red-800/10",
            text: "text-red-400"
        },
        gray: {
            border: "border-gray-700/40",
            bg: "from-gray-800/20 to-gray-700/10",
            text: "text-gray-400"
        }
    };

    const classes = colorClasses[cor] || colorClasses.gray;

    return (
        <div className={`glass-card-glow relative overflow-hidden p-5 backdrop-blur-md border ${corClasse || classes.border} rounded-xl`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${classes.bg} -z-10`}></div>
            <div className="flex items-center gap-3 mb-3">
                <div className={iconeClasse || classes.text}>
                    {icone}
                </div>
                <h3 className={`font-semibold ${classes.text}`}>{titulo}</h3>
            </div>
            <div className="space-y-3">
                {itens.map((item, index) => (
                    <div key={index} className={`flex justify-between items-center ${item.destaque ? 'mt-4 pt-3 border-t border-gray-700/40' : ''}`}>
                        <span className="text-sm text-gray-400">{item.label}:</span>
                        <span className={`font-semibold ${item.destaque ? 'text-lg text-white' : 'text-gray-300'}`}>
                            {item.valor}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}