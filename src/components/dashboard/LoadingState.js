// src/components/dashboard/LoadingState.js
import { Droplets } from "lucide-react";

export default function LoadingState() {
    return (
        <div className="glass-card-light backdrop-blur-md p-12 flex flex-col justify-center items-center rounded-xl border border-blue-900/40">
            <div className="relative mb-6">
                {/* Círculos pulsantes */}
                <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping"></div>
                <div className="absolute inset-1 rounded-full bg-blue-500 opacity-40 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full bg-blue-500 opacity-60 animate-pulse delay-75"></div>
                <div className="absolute inset-3 rounded-full bg-blue-500 opacity-80 animate-pulse delay-150"></div>

                {/* Ícone central */}
                <div className="relative z-10 bg-gradient-to-br from-blue-900 to-indigo-900 p-4 rounded-full flex items-center justify-center">
                    <Droplets size={32} className="text-blue-300" />
                </div>
            </div>

            <h3 className="text-xl font-bold mb-2 text-white">Carregando dados</h3>
            <p className="text-gray-400">
                Obtendo informações do seu condomínio...
            </p>

            {/* Barra de progresso animada */}
            <div className="w-full max-w-md h-1 bg-blue-900/40 rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-progress-bar"></div>
            </div>
        </div>
    );
}