// src/components/dashboard/Footer.js
import { Droplets, Mail, Phone } from "lucide-react";

export default function Footer() {
    const anoAtual = new Date().getFullYear();

    return (
        <footer className="mt-8 glass-card-light backdrop-blur-md p-5 text-center rounded-xl border border-blue-900/40 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                    <Droplets size={20} className="text-blue-400 mr-2" />
                    <p className="text-sm text-gray-300">
                        © {anoAtual} <span className="font-semibold text-white">HidroAPP</span> - Sistema de Gestão de Hidrometrização
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm text-gray-400">
                        <Phone size={16} className="mr-1" />
                        <span>(11) 4000-0000</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-400">
                        <Mail size={16} className="mr-1" />
                        <a href="mailto:suporte@hidroapp.com.br" className="hover:text-blue-300 transition-colors">
                            suporte@hidroapp.com.br
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}