import { useState, useEffect } from "react";
import Dither from "@/components/Dither";
import Lanyard from "@/components/Lanyard";
import heroImg from "@/assets/hero.png";
import {
  Download,
  Menu,
  X,
  Send,
  ArrowDown,
  ArrowUpRight,
  Code2,
  Lightbulb,
  Rocket,
  FileCode,
  Palette,
  Terminal,
  Atom,
  Server,
  GitBranch,
  Mail,
  Sparkles,
} from "lucide-react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "sobre", "projetos", "habilidades", "contato"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Início", href: "#hero", id: "hero" },
    { label: "Sobre", href: "#sobre", id: "sobre" },
    { label: "Projetos", href: "#projetos", id: "projetos" },
    { label: "Habilidades", href: "#habilidades", id: "habilidades" },
    { label: "Contato", href: "#contato", id: "contato" },
  ];

  const projects = [
    {
      title: "Dashboard Financeiro",
      description:
        "Painel interativo para monitoramento financeiro pessoal em tempo real, visualização de métricas e fluxo de caixa.",
      tags: ["React", "Tailwind CSS", "Recharts"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=700",
      link: "#",
    },
    {
      title: "Landing Page Viagens",
      description:
        "Experiência digital inspiradora para exploração de roteiros turísticos com design ultra-responsivo e navegação fluida.",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=700",
      link: "#",
    },
    {
      title: "E-commerce Tech",
      description:
        "Loja virtual moderna de periféricos com catálogo de produtos, filtros em tempo real e fluxo de checkout intuitivo.",
      tags: ["React", "Node.js", "Stripe"],
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=700",
      link: "#",
    },
  ];

  const skills = [
    { name: "HTML5", icon: FileCode, desc: "Estruturação Semântica" },
    { name: "CSS3 / Tailwind", icon: Palette, desc: "Design & Glassmorphism" },
    { name: "JavaScript", icon: Terminal, desc: "ES6+, Async & Lógica" },
    { name: "React / Next.js", icon: Atom, desc: "SPA, Hooks & SSR" },
    { name: "Node.js", icon: Server, desc: "APIs REST & Backend" },
    { name: "Git / GitHub", icon: GitBranch, desc: "Versionamento Ágil" },
  ];

  return (
    <main className="bg-slate-950 min-h-screen w-full text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Navbar com Liquid Glass */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "py-3 bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40"
          : "py-5 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center font-bold text-lg text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-purple-900/30">
                CJX
              </div>
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-purple-400 transition-colors">
                Portfólio
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-xl">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/40"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Botão Baixar CV */}
            <div className="hidden md:flex items-center">
              <a
                href="#cv"
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-purple-300 bg-slate-900/40 backdrop-blur-md border border-white/10 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-black/20 hover:shadow-purple-600/30 hover:scale-105"
              >
                <Download className="w-4 h-4" />
                Baixar CV
              </a>
            </div>

            {/* Botão Menu Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-900/40 border border-white/10 text-slate-300 hover:text-white transition-all"
              aria-label="Alternar Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950/95 border-b border-white/10 backdrop-blur-2xl transition-all px-4 pt-4 pb-6 mt-3 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${activeSection === item.id
                  ? "bg-purple-600/30 text-purple-300 border border-purple-500/30"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#cv"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center px-4 py-3 rounded-xl text-base font-semibold text-purple-300 bg-slate-900/40 border border-white/10 hover:bg-purple-600 hover:text-white transition-all mt-4"
            >
              <Download className="w-4 h-4 inline mr-2" /> Baixar CV
            </a>
          </div>
        )}
      </header>

      {/* Hero Section (#hero) com Dither e Lanyard 3D em Tela Cheia */}
      <section
        id="hero"
        className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-950"
      >
        {/* Fundo Animado com Dither 
      {/* Fundo Animado com Dither em Escuro Nativo */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-slate-950 overflow-hidden">
          <Dither
            waveSpeed={0.03}
            waveFrequency={2.8}
            waveAmplitude={0.3}
            waveColor="#a855f7"
            pixelSize={2}
          />
        </div>
        {/* Luzes / Efeitos de Brilho Sutis de Fundo */}
        <div className="absolute top-1/4 -left-28 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Camada do Canvas 3D do Lanyard - Ocupa todo o Hero (inset-0) com bg-transparent */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-transparent">
          <Lanyard
            frontImage={heroImg}
            backImage={heroImg}
            cardColor="#0a0f1d"
            strapColor="#8b5cf6"
            finish="glossy"
            size={0.50}
            strapLength={0.46}
            anchor="right"
            interactive={true}
            className="w-full h-full pointer-events-none bg-transparent"
          />
        </div>

        {/* Conteúdo do Hero - Camada Superior (z-10) com botões e links totalmente clicáveis */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Coluna Esquerda: Apresentação e Botões */}
            <div className="lg:col-span-7 space-y-6 text-left pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 text-purple-300 text-sm font-medium shadow-lg">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                <span>Olá, eu sou</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Caio Juan <br />
                <span className="neon-text">Desenvolvedor Web</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
                Transformo ideias em experiências digitais incríveis, com foco em design,
                performance e soluções criativas.
              </p>

              {/* Ações / Botões em camada superior clicável */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#contato"
                  className="px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-lg shadow-purple-600/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Vamos conversar?
                </a>
                <a
                  href="#projetos"
                  className="px-7 py-3.5 rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-purple-500/50 hover:bg-slate-800/60 text-slate-200 font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
                >
                  <ArrowDown className="w-4 h-4" />
                  Conheça meu trabalho
                </a>
              </div>

              {/* Destaques rápidos em cards Liquid Glass */}
              <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg">
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-3 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">+3</div>
                  <div className="text-xs text-slate-400">Anos Exp.</div>
                </div>
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-3 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">100%</div>
                  <div className="text-xs text-slate-400">Responsivo</div>
                </div>
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-3 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">3D/Web</div>
                  <div className="text-xs text-slate-400">Interativo</div>
                </div>
              </div>
            </div>

            {/* Coluna Direita: Espaço reservado para o Lanyard no Desktop e dica flutuante */}
            <div className="lg:col-span-5 h-[380px] sm:h-[460px] lg:h-[560px] pointer-events-none flex flex-col justify-end items-center pb-2">
            </div>
          </div>
        </div>
      </section>

      {/* Seção Sobre mim (#sobre) */}
      <section id="sobre" className="py-24 relative bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Imagem / Ilustração */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/10 p-2 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
                  alt="Workspace de Desenvolvimento"
                  className="rounded-2xl w-full h-[340px] object-cover"
                />
              </div>
            </div>

            {/* Conteúdo & Cards Liquid Glass */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Sobre <span className="neon-text">mim</span>
                </h2>
                <div className="w-16 h-1 bg-purple-600 rounded-full"></div>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Sou um desenvolvedor apaixonado por tecnologia, sempre em busca de aprender e
                evoluir. Tenho experiência com desenvolvimento web, criando soluções modernas,
                responsivas e centradas no usuário.
              </p>

              {/* Cards com Liquid Glass */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20 hover:shadow-purple-500/20 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 rounded-2xl p-5">
                  <Code2 className="w-8 h-8 text-purple-400 mb-2" />
                  <h3 className="font-bold text-white text-base">Desenvolvimento Web</h3>
                  <p className="text-slate-300 text-xs mt-1">Interfaces modernas, fluidas e performáticas.</p>
                </div>

                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20 hover:shadow-purple-500/20 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 rounded-2xl p-5">
                  <Lightbulb className="w-8 h-8 text-purple-400 mb-2" />
                  <h3 className="font-bold text-white text-base">Soluções Criativas</h3>
                  <p className="text-slate-300 text-xs mt-1">Design centrado no usuário com UX intuitiva.</p>
                </div>

                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20 hover:shadow-purple-500/20 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 rounded-2xl p-5">
                  <Rocket className="w-8 h-8 text-purple-400 mb-2" />
                  <h3 className="font-bold text-white text-base">Aprendizado Contínuo</h3>
                  <p className="text-slate-300 text-xs mt-1">Constante atualização com novas tecnologias e 3D.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Projetos (#projetos) com Cards Liquid Glass */}
      <section id="projetos" className="py-24 relative bg-slate-950">
        <div className="absolute right-0 top-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Meus <span className="neon-text">Projetos</span>
              </h2>
              <p className="text-slate-400 mt-2">Confira alguns dos meus trabalhos mais recentes.</p>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/10 text-purple-300 hover:text-white hover:border-purple-500/50 transition-all text-sm font-medium shadow-lg hover:scale-105"
            >
              Ver repositórios
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20 hover:shadow-purple-500/20 hover:border-purple-500/40 hover:-translate-y-1.5 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="p-3">
                    <div className="rounded-xl overflow-hidden h-48 bg-slate-900 relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <div className="px-5 pt-2 pb-3 space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-bold text-xl text-white pt-1">{project.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex justify-end">
                  <a
                    href={project.link}
                    className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-md"
                    aria-label={`Ver detalhes de ${project.title}`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Habilidades (#habilidades) com Cards Liquid Glass */}
      <section id="habilidades" className="py-24 relative bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Minhas <span className="neon-text">Habilidades</span>
            </h2>
            <p className="text-slate-400 mt-2">Tecnologias que utilizo para criar soluções completas.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20 hover:shadow-purple-500/20 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 rounded-2xl p-5 flex flex-col items-center justify-center text-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-3 group-hover:bg-purple-600/30 group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="font-semibold text-white text-sm">{skill.name}</span>
                  <span className="text-[11px] text-slate-400 mt-1">{skill.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seção Contato (#contato) com Banner Liquid Glass */}
      <section id="contato" className="py-24 relative bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 bottom-0 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0 shadow-lg">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Vamos trabalhar juntos?
                  </h3>
                  <p className="text-slate-300 mt-1 text-sm sm:text-base">
                    Entre em contato comigo e vamos transformar suas ideias em realidade!
                  </p>
                </div>
              </div>

              <a
                href="mailto:caiojuan.lima@ucsal.edu.br"
                className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-purple-600/30 hover:scale-105 shrink-0 flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Entrar em contato
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="border-t border-white/10 py-8 bg-slate-950/80 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-purple-400">CJX</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 text-sm">Portfólio</span>
          </div>

          {/* Social Links com SVGs Inline */}
          <div className="flex items-center gap-3 text-slate-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:text-purple-400 hover:bg-white/10 transition-all"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:text-purple-400 hover:bg-white/10 transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:text-purple-400 hover:bg-white/10 transition-all"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

          <p className="text-xs text-slate-500">© 2026 Caio Juan. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
