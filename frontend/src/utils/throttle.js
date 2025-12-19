function throttle(cb, delay = 50) {
    let shouldWait = false;

    let waitingArgs;

    const timeoutFunc = () => {
      if (!waitingArgs) {
        shouldWait = false;
        return;
      } else {
        cb(...waitingArgs);
        waitingArgs = null;
        setTimeout(timeoutFunc, delay);
      }
    };

    return (...args) => {
      if (shouldWait) {
        waitingArgs = args;
        return;
      }
      cb(...args);
      shouldWait = true;
      setTimeout(timeoutFunc, delay);
    };
  }
export default throttle