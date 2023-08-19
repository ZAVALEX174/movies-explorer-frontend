import { useState, useEffect } from 'react';

export const useWindowSize = () => {
   const isWindowClient = typeof window === 'object';
   const [windowSize, setWindowSize] = useState(
      isWindowClient ? window.innerWidth : undefined
   );

   useEffect(() => {
      function handleResize() { 
         setWindowSize(window.innerWidth);
      }
      if (isWindowClient) {
         window.addEventListener('resize', handleResize); 
         return () => window.removeEventListener('resize', handleResize); 
      }
   }, [isWindowClient, setWindowSize]);
   return windowSize;
}
