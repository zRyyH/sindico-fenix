// src/components/dashboard/ErrorState.js
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorState({ message, onRetry }) {
    return (
        <div className="glass-card-light backdrop-blur-md p-8 text-center rounded-xl border border-blue-900/40 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/30 text-red-400 mb-6 mx-auto">
                <AlertTriangle size={32} />
            </div>

            <h3 className="text-xl font-bold mb-4 text-white">Ocorreu um problema</h3>

            <p className="text-gray-400 mb-6 max-w-md mx-auto">
                {message || "Não foi possível carregar os dados. Verifique sua conexão e tente novamente."}
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center gap-2 transition-all shadow-md mx-auto"
                >
                    <RefreshCw size={16} />
                    <span>Tentar novamente</span>
                </button>
            )}
        </div>
    );
}