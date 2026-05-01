import Container from "@/components/Container";

export default function Problem() {
  return (
    <section className="relative py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="mt-4 text-3xl text-paper sm:text-4xl">
              Psicologia contemporânea, ideologias e o medo de se expor.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Muitas pessoas querem buscar ajuda, mas hesitam em entregar sua vida, sua
              história e seu casamento a profissionais cujas abordagens entram em
              conflito com valores cristãos.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-night-2 p-7 sm:p-9">
            <h3 className="text-2xl text-paper">O que isso pode colocar em risco?</h3>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-gold/20 bg-night p-5">
                <div className="text-xs tracking-[0.22em] text-muted">CASAMENTO</div>
                <p className="mt-2 leading-7 text-paper">
                  Decisões e aconselhamentos que desorganizam vínculos, prioridades e
                  compromissos.
                </p>
              </div>
              <div className="rounded-2xl border border-gold/20 bg-night p-5">
                <div className="text-xs tracking-[0.22em] text-muted">FÉ</div>
                <p className="mt-2 leading-7 text-paper">
                  Orientações que relativizam a fé e afastam convicções pessoais.
                </p>
              </div>
              <div className="rounded-2xl border border-gold/20 bg-night p-5">
                <div className="text-xs tracking-[0.22em] text-muted">FAMÍLIA</div>
                <p className="mt-2 leading-7 text-paper">
                  Ruídos que se acumulam e viram distância, frieza e solidão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
