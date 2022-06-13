export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("ru-Ru", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};
