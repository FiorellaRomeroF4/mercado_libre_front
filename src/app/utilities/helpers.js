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
