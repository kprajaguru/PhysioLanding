export type Currency = "INR" | "GBP";

// Locale fact, not a user preference — no toggle. Ireland shares the UK's
// pricing region for now since it's GBP-adjacent and low-volume.
const GBP_COUNTRIES = new Set(["GB", "IE"]);

export function currencyForCountry(country: string): Currency {
  return GBP_COUNTRIES.has(country.toUpperCase()) ? "GBP" : "INR";
}

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  INR: "₹",
  GBP: "£",
};

export const CURRENCY_LABEL: Record<Currency, string> = {
  INR: "Prices in ₹ INR",
  GBP: "Prices in £ GBP",
};

export function formatPrice(amount: number, currency: Currency): string {
  return `${CURRENCY_SYMBOL[currency]}${amount.toLocaleString(currency === "INR" ? "en-IN" : "en-GB")}`;
}
