const useSleep = () => {
  const defaultDuration = 100;
  const defaultAttemts = 10;

  // Sleeps until given duration passes.
  const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Sleeps until condition given as function returns true.
  // Checks condition every 100ms, 10 times by default.
  // If condition is not met within 10 attempts, throws an error.
  const sleepWithCondition = async (condition) => {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const intervalId = setInterval(() => {
        attempts++;
        if (condition()) {
          clearInterval(intervalId);
          resolve();
        } else if (attempts >= defaultAttemts) {
          clearInterval(intervalId);
          reject(new Error('Condition was not met within 10 attempts'));
        }
      }, defaultDuration);
    });
  };

  return {
    sleep,
    sleepWithCondition,
  };
};

export default useSleep;
