import Container from "@/components/Container";

export default function Proposal() {
  return (
    <section className="relative py-16 sm:py-20">
      <Container>
        <div className="rounded-3xl border border-gold/15 bg-night/40 p-7 backdrop-blur sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <h2 className="mt-4 text-3xl text-paper sm:text-4xl">
                Um refúgio iluminado para quem não quer perder o que acredita.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                A Clínica O Farol é um lugar onde o paciente encontra cuidado,
                acolhimento e direção — sem ser empurrado para ideologias que vão
                contra valores cristãos.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-night-2 p-7 sm:p-9">
              <h3 className="text-2xl text-paper">O que você encontra aqui</h3>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-gold/20 bg-night p-5">
                  <div className="text-xs tracking-[0.22em] text-muted">
                    RESPEITO À SUA HISTÓRIA
                  </div>
                  <p className="mt-2 leading-7 text-paper">
                    Cuidado terapêutico com responsabilidade e sensibilidade.
                  </p>
                </div>
                <div className="rounded-2xl border border-gold/20 bg-night p-5">
                  <div className="text-xs tracking-[0.22em] text-muted">
                    VALORES CRISTÃOS
                  </div>
                  <p className="mt-2 leading-7 text-paper">
                    Um atendimento alinhado à fé e às convicções do paciente.
                  </p>
                </div>
                <div className="rounded-2xl border border-gold/20 bg-night p-5">
                  <div className="text-xs tracking-[0.22em] text-muted">
                    JORNADA ILUMINADA
                  </div>
                  <p className="mt-2 leading-7 text-paper">
                    Clareza para seguir sem desvirtuar seu casamento e sua família.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
