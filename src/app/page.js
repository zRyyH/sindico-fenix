"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, checkSyndicProfile, logout } from "@/lib/auth";
import { Droplets, Lock, Mail, ArrowRight, AlertCircle, X } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showProfileError, setShowProfileError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      const isSyndic = await checkSyndicProfile();

      if (isSyndic) {
        router.push("/dashboard");
      } else {
        setShowProfileError(true);
        setTimeout(() => {
          logout();
        }, 5000);
      }
    } catch (err) {
      setError(
        err.response?.data?.errors?.[0]?.message ||
        "Falha na autenticação. Verifique suas credenciais."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeProfileErrorModal = () => {
    setShowProfileError(false);
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-gray-950 flex flex-col relative overflow-hidden p-6">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-40 left-20 w-72 h-72 bg-blue-500/15 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-cyan-500/15 rounded-full filter blur-3xl"></div>
      </div>

      {/* Barra superior */}
      <div className="w-full glass-card-light backdrop-blur-md p-4 flex justify-between items-center z-10 rounded-xl border border-blue-900/40">
        <div className="flex items-center gap-2">
          <Droplets size={24} className="text-white" />
          <span className="text-white font-bold">HidroAPP</span>
        </div>
      </div>

      {/* Modal de erro de perfil */}
      {showProfileError && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card-light max-w-md w-full mx-4 p-6 animate-fade-in border border-blue-900/40">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center text-error">
                <AlertCircle size={24} className="mr-2" />
                <h3 className="text-xl font-bold">Acesso Negado</h3>
              </div>
              <button
                onClick={closeProfileErrorModal}
                className="p-2 rounded-full hover:bg-gray-700"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-300 mb-4">
                Você não possui permissão para acessar o painel de síndico. Este sistema é exclusivo para usuários com perfil de Síndico.
              </p>
              <p className="text-gray-400 text-sm">
                Você será deslogado automaticamente em alguns segundos.
              </p>
            </div>

            <button
              onClick={closeProfileErrorModal}
              className="btn btn-danger w-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1 z-10 mt-6">
        {/* Lado esquerdo - informativo */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12">
          <div className="max-w-md text-white">
            <div className="flex items-center mb-8">
              <div className="glass-card-light p-4 rounded-2xl border border-blue-900/40">
                <Droplets size={40} className="text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-4xl font-bold">HidroAPP</h1>
                <p className="text-white mt-1">Gestão de Hidrometrização</p>
              </div>
            </div>

            <h2 className="text-3xl font-medium mb-8">Monitore e gerencie com precisão o consumo de água</h2>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="glass-card-light p-5 rounded-xl border border-blue-900/40">
                <h3 className="font-medium mb-2">Análise em Tempo Real</h3>
                <p className="text-sm text-blue-100">Acompanhe o consumo de água do seu condomínio com dados atualizados</p>
              </div>
              <div className="glass-card-light p-5 rounded-xl border border-blue-900/40">
                <h3 className="font-medium mb-2">Detecção de Anomalias</h3>
                <p className="text-sm text-blue-100">Identifique rapidamente fugas e consumos irregulares</p>
              </div>
              <div className="glass-card-light p-5 rounded-xl border border-blue-900/40">
                <h3 className="font-medium mb-2">Gestão Financeira</h3>
                <p className="text-sm text-blue-100">Acompanhe faturas e reduza custos operacionais</p>
              </div>
              <div className="glass-card-light p-5 rounded-xl border border-blue-900/40">
                <h3 className="font-medium mb-2">Relatórios Completos</h3>
                <p className="text-sm text-blue-100">Exporte e compartilhe dados de consumo e despesas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado direito - formulário de login */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-0">
          <div className="w-full max-w-md">
            <div className="lg:hidden flex flex-col items-center justify-center mb-12">
              <div className="glass-card-light p-4 rounded-full mb-4 border border-blue-900/40">
                <Droplets size={40} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">HidroAPP</h1>
              <p className="text-white mt-1">Sistema de Gestão de Hidrometrização</p>
            </div>

            <div className="glass-card-light p-8 animate-fade-in border border-blue-900/40">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Bem-vindo(a) de volta</h2>
                <p className="text-gray-300">
                  Acesse sua conta para gerenciar o sistema de hidrometrização
                </p>
              </div>

              {error && (
                <div className="p-4 mb-6 bg-red-900/20 border-l-4 border-red-500 text-red-400 rounded">
                  <div className="flex items-center">
                    <AlertCircle size={16} className="mr-2" />
                    <span className="text-sm">{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-gray-800/40 border-gray-700"
                      placeholder="seu.email@condominio.com.br"
                      style={{ paddingLeft: "2.5rem" }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-gray-800/40 border-gray-700"
                      placeholder="Sua senha"
                      style={{ paddingLeft: "2.5rem" }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded bg-gray-800/40 border-gray-700"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm">
                      Lembrar-me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:underline">
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full py-3"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      <span>Entrando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>Acessar Sistema</span>
                      <ArrowRight size={18} className="ml-2" />
                    </div>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-700/50 text-center text-sm text-gray-300">
                <p>Sistema exclusivo para administração de hidrometrização</p>
                <p className="mt-1">Suporte: (11) 4000-0000 | suporte@hidroapp.com.br</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}