import { useCallback, useState } from 'react';
import * as yup from 'yup';

const useFormHook = (initialState: Record<string, any>, schema?: yup.AnySchema) => {
  const [formState, updateFromState] = useState<Record<string, any>>({ ...initialState, error: {} });

  const updateForm = useCallback((name, value) => {
    updateFromState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const resetFormState = () => {
    updateFromState(initialState);
  };

  const isValid = async () => {
    let isValid;
    schema &&
      (await schema
        .validate(formState)
        .then(() => {
          isValid = true;
          updateForm('error', {});
        })
        .catch((error: any) => {
          isValid = false;
          updateForm('error', {
            messages: error.errors,
            level: 'error',
            path: error.path,
          });
        }));
    return isValid;
  };

  return {
    formState: formState,
    updateForm: updateForm,
    isValid: isValid,
    resetFormState: resetFormState,
  };
};

export default useFormHook;
