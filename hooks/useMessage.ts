import React from 'react';
import { OptionsObject, SnackbarMessage, useSnackbar } from 'notistack';

function useMessage() {
  const { enqueueSnackbar } = useSnackbar();

  const alertMessage = React.useCallback(
    (message: SnackbarMessage, variant: OptionsObject['variant']) => {
      enqueueSnackbar(message, {
        variant,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 2000,
      });
    },
    [enqueueSnackbar]
  );

  return { alertMessage };
}

export default useMessage;
