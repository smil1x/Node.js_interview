export const setNotFoundMsg = (
  id: number | string,
  additionalMsg?: string,
): string => {
  const defaultMsg = `Object with id ${id} is not found`;

  return additionalMsg ? `${defaultMsg}, ${additionalMsg}` : defaultMsg;
};
