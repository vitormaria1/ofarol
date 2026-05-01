export function onlyDigits(input: string) {
  return (input || "").replace(/\D+/g, "");
}

export function formatBrPhoneMask(digits: string) {
  const d = onlyDigits(digits).slice(0, 13); // (55?) + DDD + 9 digits max

  // If user typed country code, ignore it for the display mask.
  const without55 = d.startsWith("55") ? d.slice(2) : d;

  const ddd = without55.slice(0, 2);
  const rest = without55.slice(2);

  if (!ddd) return "";
  if (!rest) return `(${ddd}`;

  const isMobile = rest.length > 8;
  const first = isMobile ? rest.slice(0, 5) : rest.slice(0, 4);
  const second = isMobile ? rest.slice(5, 9) : rest.slice(4, 8);

  if (!second) return `(${ddd}) ${first}`;
  return `(${ddd}) ${first}-${second}`;
}

export function normalizeToE164Brazil(input: string) {
  const d = onlyDigits(input);
  if (!d) return null;

  // Accept +55..., 55..., or DDD+number.
  const rest = d.startsWith("55") ? d.slice(2) : d;

  // DDD(2) + number(8 or 9)
  if (rest.length !== 10 && rest.length !== 11) return null;

  const ddd = rest.slice(0, 2);
  const number = rest.slice(2);

  // Basic sanity: DDD 11-99, number not all zeros.
  const dddNum = Number(ddd);
  if (!Number.isFinite(dddNum) || dddNum < 11 || dddNum > 99) return null;
  if (/^0+$/.test(number)) return null;

  return `+55${ddd}${number}`;
}

