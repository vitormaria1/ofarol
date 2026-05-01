import Container from "@/components/Container";

const FAQS = [
  {
    q: "A assinatura é obrigatória por quanto tempo?",
    a: "Não. A assinatura é flexível e você pode cancelar quando quiser.",
  },
  {
    q: "Como eu agendo minhas sessões?",
    a: "Após a assinatura e validação do WhatsApp, você recebe instruções para seguir com a triagem e o agendamento.",
  },
  {
    q: "Posso escolher o plano depois?",
    a: "Sim. Você pode começar com um plano e ajustar conforme sua necessidade.",
  },
  {
    q: "É para quem busca atendimento alinhado a valores cristãos?",
    a: "Sim. A proposta é oferecer um ambiente terapêutico que respeite a fé e as convicções do paciente.",
  },
  {
    q: "Meus dados e conversas são confidenciais?",
    a: "Sim. Atendimento e informações do paciente são tratadas com sigilo e responsabilidade.",
  },
];

export default function FAQ() {
  return (
    <section className="relative py-16 sm:py-20">
      <Container>
        <div className="text-center">
          <div className="text-xs tracking-[0.22em] text-muted">DÚVIDAS</div>
          <h2 className="mt-4 text-3xl text-paper sm:text-4xl">FAQ</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
            Respostas rápidas para ajudar você a decidir com segurança.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/10 bg-night-2 px-6 py-5"
            >
              <summary className="cursor-pointer list-none text-lg text-paper">
                <div className="flex items-center justify-between gap-6">
                  <span>{item.q}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-gold/25 bg-night text-gold transition group-open:rotate-45">
                    +
                  </span>
                </div>
              </summary>
              <div className="mt-4 leading-7 text-muted">{item.a}</div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

