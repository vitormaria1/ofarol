import Container from "@/components/Container";
import { getPublicConfig } from "@/lib/config";

export default function Pricing() {
  const { checkout2, checkout4, checkoutSingle } = getPublicConfig();

  return (
    <section id="planos" className="relative py-16 sm:py-20">
      <Container>
        <div className="text-center">
          <div className="text-xs tracking-[0.22em] text-muted">PLANOS</div>
          <h2 className="mt-4 text-3xl text-paper sm:text-4xl">
            Assinatura flexível para sua jornada.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
            Escolha entre 2 ou 4 sessões por mês. Você pode cancelar quando quiser.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <PlanCard
            title="2 sessões / mês"
            price="R$ 139,90"
            badge="Valor social"
            features={[
              "2 sessões de terapia por mês",
              "Assinatura flexível",
              "Cancele quando quiser",
            ]}
            href={checkout2}
            cta="Assinar (2 sessões)"
          />

          <PlanCard
            title="4 sessões / mês"
            price="R$ 279,90"
            badge="Mais recomendado"
            highlight
            features={[
              "4 sessões de terapia por mês",
              "Assinatura flexível",
              "Cancele quando quiser",
            ]}
            href={checkout4}
            cta="Assinar (4 sessões)"
          />

          <PlanCard
            title="Sessão avulsa"
            price="R$ 79,90"
            badge="Sem assinatura"
            features={[
              "Para quem prefere pagar por sessão",
              "Pagamento semanal",
              "Sem compromisso mensal",
            ]}
            href={checkoutSingle}
            cta="Pagar Sessão Avulsa"
          />
        </div>
      </Container>
    </section>
  );
}

function PlanCard({
  title,
  price,
  badge,
  features,
  href,
  cta,
  highlight,
}: {
  title: string;
  price: string;
  badge: string;
  features: string[];
  href: string;
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border bg-night-2 p-8",
        highlight ? "border-gold/35" : "border-white/10",
      ].join(" ")}
    >
      {highlight ? (
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
      ) : null}

      <div className="relative">
        <div className="inline-flex items-center rounded-full border border-gold/25 bg-night/40 px-4 py-2 text-xs tracking-[0.18em] text-muted">
          {badge}
        </div>
        <h3 className="mt-5 text-2xl text-paper">{title}</h3>
        <div className="mt-3 flex items-baseline gap-2">
          <div className="text-4xl text-gold">{price}</div>
          <div className="text-sm text-muted">/ mês</div>
        </div>

        <ul className="mt-6 space-y-3 text-paper">
          {features.map((f) => (
            <li key={f} className="flex gap-3 leading-7">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gold" />
              <span className="text-muted">{f}</span>
            </li>
          ))}
        </ul>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            "mt-8 inline-flex w-full items-center justify-center rounded-xl px-6 py-3 font-semibold transition",
            highlight
              ? "bg-gold text-night hover:brightness-110"
              : "border border-gold/25 bg-night/30 text-paper hover:border-gold/50",
          ].join(" ")}
        >
          {cta}
        </a>
      </div>
    </div>
  );
}
