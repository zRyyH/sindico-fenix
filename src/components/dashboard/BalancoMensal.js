// src/components/dashboard/BalancoMensal.js
import { PieChart, Scale, TrendingUp } from "lucide-react";
import { formatarMoeda } from "@/utils/formatadores";

export default function BalancoMensal({ leituraMaisRecente }) {
    // Calcula a relação consumo vs arrecadação para visualização
    const valor = parseFloat(leituraMaisRecente.valor_da_conta) || 0;
    const arrecadacao = parseFloat(leituraMaisRecente.arrecadacao) || 0;
    const diferenca = arrecadacao - valor;
    const percentualCobertura = valor > 0 ? (arrecadacao / valor) * 100 : 0;

    // Define se o balanço é positivo, negativo ou equilibrado
    const status = diferenca > 0 ? "positivo" : diferenca < 0 ? "negativo" : "equilibrado";

    // Classes de cores baseadas no status
    const statusClasses = {
        positivo: {
            border: "border-green-900/40",
            bg: "from-green-900/20 to-green-800/10",
            text: "text-green-400",
            bar: "bg-green-500"
        },
        negativo: {
            border: "border-red-900/40",
            bg: "from-red-900/20 to-red-800/10",
            text: "text-red-400",
            bar: "bg-red-500"
        },
        equilibrado: {
            border: "border-blue-900/40",
            bg: "from-blue-900/20 to-blue-800/10",
            text: "text-blue-400",
            bar: "bg-blue-500"
        }
    };

    const classes = statusClasses[status];

    // Mensagens contextuais
    const mensagens = {
        positivo: "A arrecadação é superior ao valor da conta, gerando superávit.",
        negativo: "A arrecadação é inferior ao valor da conta, gerando déficit.",
        equilibrado: "A arrecadação está equilibrada com o valor da conta."
    };

    // Limita a barra de progresso a 110% para visualização
    const progressWidth = Math.min(percentualCobertura, 110);

    return (
        <section className={`glass-card-light backdrop-blur-md p-6 relative overflow-hidden rounded-xl border ${classes.border} animate-fade-in`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${classes.bg} -z-10`}></div>

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${classes.text} bg-gray-800/50`}>
                        <Scale size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white">Balanço Mensal</h2>
                </div>
                <div className={`flex items-center ${classes.text}`}>
                    <TrendingUp size={16} className="mr-1" />
                    <span className="text-sm font-medium">
                        {status === "positivo" ? "Superávit" : status === "negativo" ? "Déficit" : "Equilibrado"}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Valor da conta:</span>
                        <span className="font-semibold text-white">{formatarMoeda(valor)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Arrecadação:</span>
                        <span className="font-semibold text-white">{formatarMoeda(arrecadacao)}</span>
                    </div>

                    <div className="flex justify-between items-center font-medium">
                        <span className={`${classes.text}`}>
                            {status === "positivo" ? "Superávit:" : status === "negativo" ? "Déficit:" : "Saldo:"}
                        </span>
                        <span className={`${classes.text}`}>{formatarMoeda(Math.abs(diferenca))}</span>
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Cobertura</span>
                            <span className={`${classes.text} font-medium`}>{percentualCobertura.toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800/50 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${classes.bar} rounded-full transition-all duration-1000`}
                                style={{ width: `${progressWidth}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="p-3 bg-gray-800/30 rounded-lg text-sm text-gray-400 mt-2">
                    <p>{mensagens[status]}</p>
                    <p className="mt-1 text-xs">
                        Taxa garantidora: {formatarMoeda(leituraMaisRecente.taxa_garantidora)}
                    </p>
                </div>
            </div>
        </section>
    );
}