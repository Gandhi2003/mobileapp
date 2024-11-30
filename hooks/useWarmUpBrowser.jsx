import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // WebBrowser.warmUpAsync().catch((err) => {
    //   console.error("WebBrowser warmUpAsync error", err);
    // });

    return () => {
      WebBrowser.coolDownAsync().catch((err) => {
        console.error("WebBrowser coolDownAsync error", err);
      });
    };
  }, []);
};

