export function getPublicConfig() {
  const checkout2 =
    process.env.CHECKOUT_2_URL ||
    process.env.NEXT_PUBLIC_CHECKOUT_2_URL ||
    "https://exemplo.com/checkout-2-sessoes";
  const checkout4 =
    process.env.CHECKOUT_4_URL ||
    process.env.NEXT_PUBLIC_CHECKOUT_4_URL ||
    "https://exemplo.com/checkout-4-sessoes";

  return {
    checkout2,
    checkout4,
  };
}

export function getServerWhatsappConfig() {
  const baseUrl = process.env.WHATSAPP_API_BASE_URL;
  const token = process.env.WHATSAPP_API_TOKEN;
  const verifyUrl =
    process.env.WHATSAPP_API_VERIFY_URL ||
    (baseUrl ? `${baseUrl}/chat/check` : undefined);
  const sendUrl =
    process.env.WHATSAPP_API_SEND_URL ||
    (baseUrl ? `${baseUrl}/send/text` : undefined);

  const messageTemplate =
    process.env.WHATSAPP_MESSAGE_TEMPLATE ||
    "Olá! Falta pouco para você concluir sua inscriçao na Clínica O Farol. Preencha seus dados para agendar sua sessão: {{CHECKOUT_4_URL}}";

  return { baseUrl, token, verifyUrl, sendUrl, messageTemplate };
}
