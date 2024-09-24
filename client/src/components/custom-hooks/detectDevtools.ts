let devtoolsOpen = false;

export const detectDevTools = () => {
  const threshold = 160;
  setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    if (widthThreshold || heightThreshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        console.warn("DevTools is open!");
        // Redirect to a blank window
        window.open('about:blank', '_self');
      }
    } else {
      devtoolsOpen = false;
    }
  }, 500);
};


