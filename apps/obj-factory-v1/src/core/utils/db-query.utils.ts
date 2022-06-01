export const setUpdateQuery = <T>(table: string, values: T, column: string, row: string | number) => {
  const keys = Object.keys(values);
  const objValues = [row, ...Object.values(values)];

  const query =
    keys.reduce((acc, next, indx) => (acc += `"${next}" = ($${indx + 2}), `), `UPDATE ${table} SET `).slice(0, -2) +
    ` WHERE ${column} = ($1) RETURNING*`;
  return { text: query, values: objValues };
};
