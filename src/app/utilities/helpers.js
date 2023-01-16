export const categoryResult = (array) => {
  let arr = [...array];
  const category = arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop();
  return category;
};

export const priceString = (value) => {
  // Take care the format depends of the  zone
  let valueNumber;
  if (typeof value === "string" && value.includes(",")) {
    value.replace(",", ".");
    valueNumber = Number(value.replace(",", ".")).toFixed(2);
  } else {
    valueNumber = Number(value).toFixed(2);
  }
  return Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
  }).format(valueNumber);
};
