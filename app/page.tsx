"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, MapPin, Menu, MessageCircle, Quote, Scale, ShieldCheck, UsersRound, X } from "lucide-react";
import GlowingButton from "./components/GlowingButton";
import { brand } from "./site-data";

const areas = [
  { title: "Consultoria preventiva", icon: ShieldCheck, summary: "Antecipar riscos para conduzir seu negócio com mais segurança.", details: "Orientação jurídica para as decisões e os desafios do dia a dia da empresa. A análise considera a realidade do negócio para identificar pontos de atenção e orientar os próximos passos.", topics: ["Análise de riscos jurídicos", "Orientação para decisões empresariais", "Acompanhamento consultivo"] },
  { title: "Direito trabalhista", icon: UsersRound, summary: "Clareza nas relações de trabalho, da prevenção à resolução de conflitos.", details: "Assessoria às empresas em questões trabalhistas, com atenção às relações entre empregadores e equipes. O atendimento reúne orientação preventiva e análise individualizada de conflitos.", topics: ["Consultoria trabalhista para empresas", "Orientação nas relações de trabalho", "Atuação em demandas trabalhistas"] },
  { title: "Direito empresarial", icon: BriefcaseBusiness, summary: "Apoio jurídico para estruturar relações e decisões da sua empresa.", details: "Orientação em questões jurídicas que acompanham a atividade empresarial, com análise de documentos, relações comerciais e necessidades específicas de cada negócio.", topics: ["Análise de contratos empresariais", "Orientação nas relações comerciais", "Assessoria jurídica empresarial"] },
  { title: "Atuação contenciosa", icon: Scale, summary: "Acompanhamento responsável quando um conflito exige atuação jurídica.", details: "Análise das circunstâncias de cada demanda para definir os caminhos possíveis de atuação. Comunicação clara ao longo do acompanhamento, com atenção aos documentos, às etapas e às particularidades do caso.", topics: ["Análise individualizada de demandas", "Atuação em conflitos empresariais", "Acompanhamento das etapas do processo"] },
];
const reviews = [
  { name: "Eliane Cabral", text: "Atendimento excelente,eficiência para resolver meu problema e clareza na explicação." },
  { name: "Barbara Nogueira", text: "Profissional ética, competente e atenciosa. Recomendo o atendimento de olhos fechados." },
  { name: "Igor Tanan", text: "A Dra. Lara realizou um trabalho impecável. Muito atenciosa, clara nas orientações e sempre disponível para ajudar. Demonstrou segurança, domínio do assunto e conduziu todo o processo com seriedade. Excelente profissional, recomendo sem hesitar." },
  { name: "Julia Silveira", text: "Excelente profissional, muito dedicada e competente!" },
  { name: "Raylander Caldeira", text: "Prestativa, profissional exemplar e de extrema confiança." },
  { name: "Andrée Carrijo", text: "Profissional confiável e extremamente competente." },
];
const navigation = [["Início", "#inicio"], ["Atuação", "#atuacao"], ["Sobre", "#sobre"], ["Depoimentos", "#avaliacoes"], ["Contato", "#contato"]];
const reveal = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.6 } };

function Instagram({ size = 16 }: { size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle cx="17.8" cy="6.4" r="0.75" fill="currentColor" stroke="none" /></svg>;
}

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return <Image src={brand.logo} alt="Advogadas de Empresa — Consultoria jurídica para empresas" width={1774} height={887} sizes={compact ? "160px" : "220px"} className={compact ? "h-auto w-40" : "h-auto w-[165px] sm:w-[205px]"} />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeArea, setActiveArea] = useState<(typeof areas)[number] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!activeArea || !dialog) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [activeArea]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#conteudo" className="skip-link">Ir para o conteúdo</a>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur-xl">
        <div className="container-shell flex h-[90px] items-center justify-between gap-5 sm:h-[108px]">
          <a href="#inicio" aria-label="Advogadas de Empresa — início" onClick={() => setMenuOpen(false)}><BrandLogo /></a>
          <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
            {navigation.map(([label, href]) => <a className="nav-link" key={href} href={href}>{label}</a>)}
          </nav>
          <div className="hidden lg:block"><GlowingButton href={brand.whatsapp} target="_blank" size="sm">Fale conosco <ArrowUpRight size={15} /></GlowingButton></div>
          <button type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" className="grid size-11 place-items-center rounded-full border border-white/25 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menuOpen && <nav id="mobile-navigation" aria-label="Navegação móvel" className="container-shell flex flex-col gap-1 border-t border-white/10 py-5 lg:hidden">
          {navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="py-3 text-sm text-white/85">{label}</a>)}
          <GlowingButton href={brand.whatsapp} target="_blank" className="mt-3">Contato pelo WhatsApp <MessageCircle size={16} /></GlowingButton>
        </nav>}
      </header>

      <main id="conteudo">
        <section id="inicio" className="hero-section relative isolate overflow-hidden bg-ink text-white">
          <div className="container-shell grid items-center gap-12 py-14 sm:py-20 lg:min-h-[740px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <motion.div {...reveal} className="relative z-10">
              <p className="eyebrow-light mb-7">Trabalhista & empresarial · João Monlevade, MG</p>
              <h1 className="max-w-2xl font-serif text-[clamp(2.2rem,4.7vw,4.3rem)] leading-[1.14] tracking-[-0.035em]">Segurança jurídica para quem <span className="italic text-brand-200">empreende.</span></h1>
              <p className="mt-7 max-w-lg text-[15px] leading-8 text-white/75 sm:text-base">Consultoria preventiva e atuação contenciosa para cuidar das questões jurídicas da sua empresa. Orientação clara para decisões mais conscientes, em cada etapa do seu negócio.</p>
              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <GlowingButton href={brand.whatsapp} target="_blank" size="lg"><MessageCircle size={17} /> Converse com a equipe</GlowingButton>
                <a href="#atuacao" className="inline-flex items-center gap-2 py-3 text-sm text-white/85">Conheça nossa atuação <ArrowRight size={16} /></a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-6 text-xs text-white/65">
                <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-brand-200" /> Prevenção e estratégia</span>
                <span className="flex items-center gap-2"><MapPin size={16} className="text-brand-200" /> João Monlevade · MG</span>
              </div>
            </motion.div>
            <motion.div {...reveal} className="relative mx-auto w-full max-w-[460px] pb-5 pr-4 lg:mr-0">
              <div className="absolute bottom-0 left-5 right-0 top-5 border border-brand-200/45" />
              <div className="relative aspect-[0.83] overflow-hidden bg-stone-300">
                <Image src={brand.portrait} alt="Retrato profissional de Lara Pacheco de Figueiredo" fill preload sizes="(max-width: 640px) 90vw, (max-width: 1024px) 460px, 40vw" className="object-cover object-[50%_28%]" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/95 to-transparent" />
                <div className="absolute bottom-7 left-7 right-7"><p className="font-serif text-3xl">Lara Pacheco</p><p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-brand-100">de Figueiredo · Advogada</p></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section aria-label="Pilares de atendimento" className="border-b border-ink/10 bg-ivory">
          <div className="container-shell grid gap-6 py-8 sm:grid-cols-3 sm:gap-4">
            {[["Prevenir", "Identificar riscos e orientar decisões."], ["Orientar", "Traduzir questões jurídicas com clareza."], ["Acompanhar", "Atenção às particularidades do negócio."]].map(([title, text], index) => <div key={title} className={index ? "sm:border-l sm:border-ink/15 sm:pl-8" : ""}><p className="font-serif text-3xl text-brand-700">{title}</p><p className="mt-2 text-xs leading-6 text-ink-soft">{text}</p></div>)}
          </div>
        </section>

        <section id="atuacao" className="section-space bg-ivory">
          <div className="container-shell">
            <motion.div {...reveal} className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl"><p className="eyebrow">Áreas de atuação</p><h2 className="section-title mt-4">Seu negócio, amparado por uma visão <span className="italic text-brand-700">jurídica.</span></h2></div>
              <p className="max-w-sm text-sm leading-7 text-ink-soft">Do cuidado preventivo à condução de conflitos, uma atuação alinhada às necessidades da empresa.</p>
            </motion.div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {areas.map((area, index) => <motion.article {...reveal} key={area.title} className="group flex flex-col border border-ink/15 bg-white p-7 transition-colors hover:border-brand-500">
                <div className="flex items-center justify-between"><area.icon size={27} strokeWidth={1.4} className="text-brand-700" /><span className="text-xs text-ink-soft">0{index + 1}</span></div>
                <h3 className="mt-8 font-serif text-[1.8rem] leading-tight">{area.title}</h3><p className="mb-7 mt-4 text-sm leading-7 text-ink-soft">{area.summary}</p>
                <button type="button" onClick={() => setActiveArea(area)} aria-label={`Saiba mais sobre ${area.title}`} className="mt-auto flex items-center justify-between border-t border-ink/10 pt-5 text-xs font-semibold text-brand-700">Saiba mais <ArrowUpRight size={17} /></button>
              </motion.article>)}
            </div>
          </div>
        </section>

        <section id="sobre" className="section-space bg-white">
          <div className="container-shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <motion.div {...reveal} className="relative mx-auto w-full max-w-[520px]">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-200"><Image src={brand.team} alt="Lara Pacheco e Danila Guimarães — Advogadas de Empresa" fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 520px, 45vw" className="object-cover object-center" /></div>
              <div className="mt-5 border-l-2 border-brand-500 bg-ivory p-5"><p className="font-serif text-xl">Atenção ao seu negócio.</p><p className="mt-1 text-xs text-ink-soft">Clareza em cada orientação.</p></div>
            </motion.div>
            <motion.div {...reveal}>
              <p className="eyebrow">Lara Pacheco de Figueiredo</p><h2 className="section-title mt-4">Por trás de cada empresa, há pessoas e <span className="italic text-brand-700">decisões.</span></h2>
              <p className="mt-6 text-[15px] leading-8 text-ink-soft">Lara Pacheco de Figueiredo é advogada em João Monlevade, Minas Gerais. Ao lado de Danila Guimarães, apresenta a Advogadas de Empresa, com foco em Direito Trabalhista e Empresarial.</p>
              <p className="mt-4 text-[15px] leading-8 text-ink-soft">A proposta é aproximar o jurídico da rotina de quem empreende: compreender o contexto, esclarecer as possibilidades e acompanhar as questões que exigem atenção, de forma preventiva e contenciosa.</p>
              <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-brand-700/40 pb-2 text-xs font-semibold uppercase tracking-wider text-brand-700">Conheça a Advogadas de Empresa <ArrowUpRight size={16} /></a>
              <a href={brand.danilaInstagram} target="_blank" rel="noopener noreferrer" className="mt-5 flex w-fit items-center gap-2 text-xs text-ink-soft"><Instagram size={15} /> Instagram de Danila Guimarães <ArrowUpRight size={14} /></a>
            </motion.div>
          </div>
        </section>

        <section className="section-space bg-ink text-white">
          <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div><p className="eyebrow-light">Como trabalhamos</p><h2 className="section-title mt-4">Uma orientação que acompanha a sua <span className="italic text-brand-200">realidade.</span></h2><p className="mt-6 text-sm leading-7 text-white/70">Proximidade para entender. Clareza para orientar. Responsabilidade para acompanhar.</p></div>
            <div className="divide-y divide-white/15">{[["01", "Entender o contexto", "O primeiro passo é ouvir as necessidades da empresa e conhecer os documentos e as circunstâncias envolvidos."], ["02", "Esclarecer os caminhos", "Apresentamos as possibilidades de atuação e os pontos de atenção, com uma comunicação acessível."], ["03", "Acompanhar cada etapa", "A condução considera as particularidades do caso e mantém atenção às demandas do negócio."]].map(([number, title, text]) => <motion.div {...reveal} key={number} className="flex gap-6 py-7 first:pt-0"><span className="font-serif text-3xl text-brand-200">{number}</span><div><h3 className="font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-white/70">{text}</p></div></motion.div>)}</div>
          </div>
        </section>

        <section id="avaliacoes" className="section-space bg-ivory">
          <div className="container-shell">
            <motion.div {...reveal} className="max-w-2xl"><p className="eyebrow">Experiências compartilhadas</p><h2 className="section-title mt-4">Clareza e cuidado que deixam <span className="italic text-brand-700">confiança.</span></h2><p className="mt-5 text-sm leading-7 text-ink-soft">Depoimentos de clientes sobre o atendimento de Lara Pacheco de Figueiredo, publicados no Google.</p></motion.div>
            <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{reviews.map((review) => <motion.figure {...reveal} key={review.name} className="flex flex-col border border-ink/10 bg-white p-7"><div className="mb-5 flex gap-1 text-brand-700" aria-hidden="true"><Quote size={23} strokeWidth={1.3} /></div><blockquote className="mb-7 text-sm leading-7 text-ink-soft">“{review.text}”</blockquote><figcaption className="mt-auto border-t border-ink/10 pt-5"><p className="font-serif text-xl">{review.name}</p><p className="mt-1 text-[11px] text-ink-soft">Depoimento no Google</p></figcaption></motion.figure>)}</div>
            <p className="mt-6 text-xs leading-6 text-ink-soft">Relatos individuais de atendimento. Cada situação é analisada conforme suas particularidades.</p>
          </div>
        </section>

        <section id="conteudos" className="section-space bg-white">
          <div className="container-shell grid items-center gap-10 md:grid-cols-[0.65fr_1fr] lg:gap-20">
            <div className="relative mx-auto aspect-[0.9] w-full max-w-[360px] overflow-hidden"><Image src={brand.secondaryPortrait} alt="Lara Pacheco de Figueiredo no escritório" fill sizes="(max-width: 768px) 90vw, 360px" className="object-cover object-[50%_25%]" /></div>
            <div><p className="eyebrow">Advogadas de Empresa</p><h2 className="section-title mt-4">O jurídico também faz parte da rotina de quem <span className="italic text-brand-700">empreende.</span></h2><p className="mt-5 max-w-xl text-sm leading-7 text-ink-soft">Acompanhe o perfil de Danila Guimarães e Lara Pacheco no Instagram e conheça a proposta de consultoria jurídica para empresas.</p><GlowingButton href={brand.instagram} target="_blank" className="mt-7"><Instagram size={16} /> @advogadasdeempresa</GlowingButton></div>
          </div>
        </section>

        <section id="contato" className="section-space bg-ivory">
          <div className="container-shell grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div><p className="eyebrow">Contato e localização</p><h2 className="section-title mt-4">Vamos conversar sobre a sua <span className="italic text-brand-700">empresa?</span></h2><p className="mt-6 max-w-lg text-sm leading-7 text-ink-soft">Entre em contato para apresentar sua demanda e consultar as possibilidades de atendimento.</p><GlowingButton href={brand.whatsapp} target="_blank" size="lg" className="mt-8"><MessageCircle size={17} /> Fale pelo WhatsApp</GlowingButton><a className="mt-4 block w-fit text-sm text-ink-soft hover:text-brand-700" href={brand.phoneLink}>{brand.phoneDisplay}</a></div>
            <div className="border border-ink/15 bg-white p-7 sm:p-10"><MapPin size={27} strokeWidth={1.4} className="text-brand-700" /><h3 className="mt-5 font-serif text-3xl">João Monlevade · MG</h3><p className="mt-2 text-xs text-ink-soft">Lara Pacheco de Figueiredo Advogada</p><address className="mt-6 text-sm not-italic leading-8 text-ink-soft">Av. Wilson Alvarenga, 1140 — sala 506<br />Carneirinhos, João Monlevade — MG<br />CEP 35930-001, Brasil</address><a href={brand.maps} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-brand-700/40 pb-2 text-xs font-semibold uppercase tracking-wider text-brand-700">Como chegar <ArrowUpRight size={16} /></a></div>
          </div>
        </section>

        <section className="bg-brand-200 py-14 text-ink"><div className="container-shell flex flex-col justify-between gap-7 md:flex-row md:items-center"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em]">Consultoria jurídica para empresas</p><h2 className="mt-3 max-w-2xl font-serif text-3xl sm:text-4xl">Decisões conscientes começam com orientação.</h2></div><GlowingButton href={brand.whatsapp} target="_blank" className="w-fit shrink-0">Entre em contato <ArrowUpRight size={16} /></GlowingButton></div></section>
      </main>

      <footer className="bg-ink py-14 text-white">
        <div className="container-shell grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_1.1fr]">
          <div><BrandLogo compact /><p className="mt-5 max-w-xs text-xs leading-6 text-white/70">Lara Pacheco de Figueiredo<br />Advogadas de Empresa<br />Trabalhista & Empresarial</p></div>
          <div><h2 className="eyebrow-light">Navegação</h2><div className="mt-5 flex flex-col gap-3 text-xs text-white/75">{navigation.slice(1).map(([label, href]) => <a className="footer-link" key={href} href={href}>{label}</a>)}</div></div>
          <div><h2 className="eyebrow-light">Contato</h2><div className="mt-5 flex flex-col items-start gap-4 text-xs leading-6 text-white/75"><a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" className="footer-link flex items-center gap-2"><MessageCircle size={15} /> {brand.phoneDisplay}</a><a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="footer-link flex items-center gap-2"><Instagram size={15} /> @advogadasdeempresa</a><a href={brand.danilaInstagram} target="_blank" rel="noopener noreferrer" className="footer-link flex items-center gap-2"><Instagram size={15} /> @danilaguimaraes.adv</a><a href={brand.maps} target="_blank" rel="noopener noreferrer" className="footer-link">Av. Wilson Alvarenga, 1140 — sala 506<br />Carneirinhos · João Monlevade, MG</a></div></div>
        </div>
        <div className="container-shell mt-10 flex flex-col gap-3 border-t border-white/15 pt-5 text-[10px] leading-5 text-white/60 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Lara Pacheco de Figueiredo. Todos os direitos reservados.</p><p>Conteúdo informativo. Atendimento mediante análise individual.</p></div>
      </footer>

      <dialog ref={dialogRef} onCancel={() => setActiveArea(null)} onClick={(event) => { if (event.target === event.currentTarget) setActiveArea(null); }} aria-labelledby="area-dialog-title" className="area-dialog">
        {activeArea && <div className="relative p-7 sm:p-10"><button type="button" autoFocus onClick={() => setActiveArea(null)} aria-label="Fechar detalhes da área" className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-ink/20"><X size={18} /></button><p className="eyebrow pr-10">Área de atuação</p><h2 id="area-dialog-title" className="mt-5 pr-10 font-serif text-4xl">{activeArea.title}</h2><p className="mt-5 text-sm leading-7 text-ink-soft">{activeArea.details}</p><ul className="mt-6 space-y-3">{activeArea.topics.map((topic) => <li key={topic} className="flex items-center gap-3 text-sm"><span className="size-1.5 shrink-0 rounded-full bg-brand-700" />{topic}</li>)}</ul><GlowingButton href={brand.whatsapp} target="_blank" className="mt-8"><MessageCircle size={16} /> Converse sobre sua demanda</GlowingButton></div>}
      </dialog>
    </MotionConfig>
  );
}
