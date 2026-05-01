import Image from "next/image";
import Container from "@/components/Container";

export default function Founder() {
  return (
    <section className="relative py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl border border-gold/15" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-night-2">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/assets/vander.jpeg"
                  alt="Fundador da Clínica O Farol"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs tracking-[0.22em] text-muted">FUNDADOR</div>
            <h2 className="mt-4 text-3xl text-paper sm:text-4xl">
              Vander Maria
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              Terapeuta e especialista em atendimento a casais. Já ajudou dezenas de
              pacientes a restaurar suas famílias e reordenar sua vida interior — com
              uma abordagem que respeita valores cristãos.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Badge title="Casais" desc="Foco em reconstruir diálogo e alianças." />
              <Badge title="Família" desc="Cuidado com vínculos e prioridades." />
              <Badge title="Direção" desc="Clareza, responsabilidade e propósito." />
              <Badge title="Acolhimento" desc="Escuta e plano prático para avançar." />
            </div>

            <div className="mt-10 rounded-3xl border border-gold/15 bg-night-2 p-7">
              <div className="text-sm leading-7 text-muted">
                A Clínica O Farol nasce para ser um lugar de luz: um caminho seguro para
                quem precisa de cuidado terapêutico, com valor social, e não quer correr
                riscos ao expor o que é sagrado.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Badge({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-night-2 p-5">
      <div className="text-lg text-paper">{title}</div>
      <div className="mt-2 text-sm leading-7 text-muted">{desc}</div>
    </div>
  );
}

