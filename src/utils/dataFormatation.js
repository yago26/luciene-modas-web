export const formatPrice = (price) => {
  return price.toFixed(2).replace(".", ",");
};

export const formatDate = (date) => {
  return new Date(date).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  // timeZone: "America/Sao_Paulo",
  // day: "2-digit",
  // month: "long",
  // year: "numeric",
  // hour: "2-digit",
  // minute: "2-digit",
};
