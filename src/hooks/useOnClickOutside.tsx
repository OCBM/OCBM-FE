import { useEffect } from 'react';

const useOnClickOutside = (reference: any, callback: any) => {
  const handleClick = (e: any) => {
    if (reference?.current && !reference?.current?.contains(e?.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', (e) => handleClick(e));

    return () => {
      document.removeEventListener('click', (e) => handleClick(e));
    };
  }, [reference]);
};

export default useOnClickOutside;
