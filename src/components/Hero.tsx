import Image from "next/image";
import Container from "@/components/Container";

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night to-night-2" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gold/12 blur-3xl" />
        <div className="absolute -bottom-56 right-[-140px] h-[520px] w-[520px] rounded-full bg-gold/8 blur-3xl" />
      </div>

      <Container className="relative py-10 sm:py-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-gold/25 bg-night sm:h-20 sm:w-20">
              <Image
                src="/assets/logo.jpeg"
                alt="O Farol"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="leading-tight">
              <div className="text-[11px] tracking-[0.28em] text-muted">CLÍNICA</div>
              <div className="text-2xl text-paper sm:text-3xl">O FAROL</div>
            </div>
          </div>

          <a
            href="#planos"
            className="hidden rounded-full border border-gold/30 bg-night/40 px-4 py-2 text-sm text-paper backdrop-blur hover:border-gold/50 sm:inline-flex"
          >
            Ver Planos
          </a>
        </div>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-night/40 px-4 py-2 text-xs tracking-[0.14em] text-muted backdrop-blur">
              TERAPIA COM VALOR SOCIAL • VALORES CRISTÃOS
            </div>

            <h1 className="mt-6 text-4xl leading-[1.05] text-paper sm:text-5xl">
              Um lugar seguro para cuidar da sua história{" "}
              <span className="text-gold">sem abrir mão do que você acredita.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              A Clínica O Farol existe para acolher quem deseja ser atendido por
              profissionais que compartilham valores cristãos — com respeito à sua fé,
              ao seu casamento e à sua família.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#planos"
                className="inline-flex items-center justify-center rounded-xl bg-gold px-6 py-3 font-semibold text-night hover:brightness-110"
              >
                Assinar e Agendar
              </a>
              <div className="text-sm text-muted">
                Assinatura flexível. Cancele quando quiser.
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-night/40 p-4 backdrop-blur">
                <div className="text-xs tracking-[0.2em] text-muted">ACOLHIMENTO</div>
                <div className="mt-2 text-paper">
                  Um refúgio para reordenar a vida interior.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-night/40 p-4 backdrop-blur">
                <div className="text-xs tracking-[0.2em] text-muted">DIREÇÃO</div>
                <div className="mt-2 text-paper">
                  Clareza e orientação sem ideologias que conflitam com sua fé.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-night/40 p-4 backdrop-blur">
                <div className="text-xs tracking-[0.2em] text-muted">FAMÍLIA</div>
                <div className="mt-2 text-paper">
                  Fortalecimento de vínculos e restauração de relacionamentos.
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl border border-gold/15" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-night/40 p-6 backdrop-blur">
              <h2 className="text-2xl text-paper">Atendimento alinhado à sua fé</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Aqui você encontra acolhimento e direção com responsabilidade — em um
                ambiente seguro, respeitoso e coerente com valores cristãos.
              </p>

              <div className="mt-6 rounded-2xl border border-gold/20 bg-night p-4">
                <p className="text-sm leading-6 text-paper">
                  Assinatura flexível e planos mensais para acompanhar sua jornada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
