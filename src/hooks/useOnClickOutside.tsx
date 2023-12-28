import { useEffect } from 'react';

const useOnClickOutside = (reference: any, callback: any) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (reference?.current && !reference?.current?.contains(event?.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [reference, callback]);
};

export default useOnClickOutside;
