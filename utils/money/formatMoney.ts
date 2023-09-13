export const formatMoney = (
  lng: string,
  currency: string,
  value: number,
  options?: Partial<Intl.NumberFormatOptions>,
) =>
  new Intl.NumberFormat(lng, {
    currency,
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
