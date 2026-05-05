import Container from "@/components/Container";
import { getPublicConfig } from "@/lib/config";
import PricingClient from "@/components/PricingClient";

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

        <PricingClient
          plans={[
            {
              title: "2 sessões / mês",
              price: "R$ 139,90",
              badge: "Valor social",
              features: [
                "2 sessões de terapia por mês",
                "Assinatura flexível",
                "Cancele quando quiser",
              ],
              href: checkout2,
              cta: "Assinar (2 sessões)",
            },
            {
              title: "4 sessões / mês",
              price: "R$ 279,90",
              badge: "Mais recomendado",
              highlight: true,
              features: [
                "4 sessões de terapia por mês",
                "Assinatura flexível",
                "Cancele quando quiser",
              ],
              href: checkout4,
              cta: "Assinar (4 sessões)",
            },
            {
              title: "Sessão avulsa",
              price: "R$ 79,90",
              badge: "Sem assinatura",
              features: [
                "Para quem prefere pagar por sessão",
                "Pagamento semanal",
                "Sem compromisso mensal",
              ],
              href: checkoutSingle,
              cta: "Pagar Sessão Avulsa",
            },
          ]}
        />
      </Container>
    </section>
  );
}
