export const errorHandler = (err: any) => {
  console.log(err.messages || err);
  // throw new Error(err.messages || err)
};
