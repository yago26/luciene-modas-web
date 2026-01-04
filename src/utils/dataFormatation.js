export const formatPrice = (price) => {
  return price.toFixed(2).replace(".", ",");
};

export const formatDate = (date, complete = true) => {
  return complete
    ? new Date(date).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      })
    : new Date(date).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

  // timeZone: "America/Sao_Paulo",
  // hour: "2-digit",
  // minute: "2-digit",
};
