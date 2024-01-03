import { useEffect } from 'react';

const useOnClickOutside = (reference: any, callback: any) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (reference?.current && !reference?.current?.contains(event?.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [reference]);
};

export default useOnClickOutside;
