export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function generateOrderNumber(): string {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `NC-${random}`;
}
