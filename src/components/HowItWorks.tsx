import Container from "@/components/Container";

export default function HowItWorks() {
  return (
    <section className="relative py-16 sm:py-20">
      <Container>
        <div className="text-center">
          <div className="text-xs tracking-[0.22em] text-muted">COMO FUNCIONA</div>
          <h2 className="mt-4 text-3xl text-paper sm:text-4xl">
            Simples, direto e flexível.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
            Você escolhe um plano, preenche seus dados, realiza o pagamento e segue para
            triagem e agendamento da sua sessão.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <Step n="01" title="Escolher o plano" desc="Selecione o plano ideal para você." />
          <Step
            n="02"
            title="Finalizar assinatura e triagem"
            desc="Conclua sua assinatura e siga as orientações iniciais."
          />
          <Step n="03" title="Agendamento" desc="Agende sua sessão e comece o acompanhamento." />
        </div>
      </Container>
    </section>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-night-2 p-6">
      <div className="inline-flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-gold/25 bg-night text-sm font-semibold text-gold">
          {n}
        </div>
        <div className="text-lg text-paper">{title}</div>
      </div>
      <p className="mt-4 leading-7 text-muted">{desc}</p>
    </div>
  );
}
