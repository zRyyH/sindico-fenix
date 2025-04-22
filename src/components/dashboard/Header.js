// src/components/dashboard/Header.js
import { Droplets, LogOut, BarChart, Menu, Bell, User } from "lucide-react";
import { useState } from "react";

export default function Header({ user, onLogout }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="glass-card-light backdrop-blur-md p-4 mb-6 flex justify-between items-center rounded-xl border border-blue-900/40 animate-fade-in">
            <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl shadow-md text-white">
                    <Droplets size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">HidroAPP</h1>
                    <p className="text-blue-100/80 text-sm">Painel de Controle</p>
                </div>
            </div>

            {/* Versão desktop do menu */}
            <div className="hidden md:flex items-center gap-6">
                <a href="/dashboard" className="flex items-center gap-1 text-white hover:text-blue-300 transition-colors">
                    <BarChart size={18} />
                    <span>Dashboard</span>
                </a>

                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full bg-blue-900/30 hover:bg-blue-800/40 transition-colors text-white">
                        <Bell size={18} />
                    </button>

                    {user && (
                        <div className="flex items-center gap-2 bg-blue-900/30 px-3 py-1 rounded-full text-white">
                            <div className="bg-blue-700 p-1 rounded-full">
                                <User size={16} />
                            </div>
                            <span className="text-sm">{user.first_name || user.email}</span>
                        </div>
                    )}

                    <button
                        onClick={onLogout}
                        className="bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md"
                    >
                        <LogOut size={16} />
                        <span>Sair</span>
                    </button>
                </div>
            </div>

            {/* Botão menu mobile */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-blue-900/30 hover:bg-blue-800/40 text-white"
            >
                <Menu size={24} />
            </button>

            {/* Menu mobile */}
            {mobileMenuOpen && (
                <div className="absolute top-20 right-4 left-4 glass-card-light backdrop-blur-md border border-blue-900/40 rounded-xl p-4 z-50 animate-fade-in md:hidden">
                    <div className="flex flex-col space-y-4">
                        <a href="/dashboard" className="flex items-center gap-2 text-white p-2 hover:bg-blue-800/20 rounded-lg">
                            <BarChart size={20} />
                            <span>Dashboard</span>
                        </a>

                        {user && (
                            <div className="flex items-center gap-2 p-2 text-white">
                                <div className="bg-blue-700 p-1 rounded-full">
                                    <User size={16} />
                                </div>
                                <span>{user.first_name || user.email}</span>
                            </div>
                        )}

                        <button
                            onClick={onLogout}
                            className="bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 text-white p-2 rounded-lg flex items-center justify-center gap-2"
                        >
                            <LogOut size={20} />
                            <span>Sair</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}