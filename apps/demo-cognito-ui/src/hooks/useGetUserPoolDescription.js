import { useEffect, useState } from 'react';
import { getUserPoolDescription } from '../utils';

export const useGetUserPoolDescription = () => {
  const [rowCount, setRowCount] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const {
          UserPool: { EstimatedNumberOfUsers: rowCount },
        } = await getUserPoolDescription();
        console.log({ rowCount });
        setRowCount(rowCount);
      } catch (err) {
        console.log({ err });
      }
    })();
  }, []);

  return { rowCount };
};

export default useGetUserPoolDescription;
