import Container from "@/components/Container";

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 py-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs tracking-[0.22em] text-muted">PRÓXIMO PASSO</div>
            <h2 className="mt-4 text-3xl text-paper sm:text-4xl">
              Comece hoje sua jornada com um plano flexível.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Escolha um plano, finalize a assinatura e siga para triagem e agendamento.
            </p>
          </div>
          <a
            href="#planos"
            className="inline-flex items-center justify-center rounded-xl bg-gold px-8 py-4 font-semibold text-night hover:brightness-110"
          >
            Ver Planos
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Clínica Terapêutica O Farol</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-paper">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-paper">
              Termos de Uso
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

