export const compareArray = (firstArray, secondArray) => {
  if (firstArray === secondArray) {
    return true;
  }

  if (firstArray.length !== secondArray.length) {
    return false;
  }

  const sortedFirstArray = firstArray.sort((a, b) => a - b);
  const sortedSecondArray = secondArray.sort((a, b) => a - b);

  for (let index = 0; index < sortedFirstArray.length; index++) {
    if (sortedFirstArray[index] !== sortedSecondArray[index]) {
      return false;
    }
  }

  return true;
};
