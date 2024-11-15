import { useCallback, useEffect, useState } from 'react';

const useVerifyEmail = () => {
  const [seconds, setSeconds] = useState(60);
  const [enableResend, setEnableResend] = useState(false);

  const resetResend = useCallback(() => {
    setEnableResend(false);
    setSeconds(60);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      setEnableResend(true);
    }

    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);

  return { seconds, enableResend, resetResend };
};

export default useVerifyEmail;
