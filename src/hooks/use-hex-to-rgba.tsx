import { useState, useEffect, SetStateAction } from 'react';

// Function to convert hex to rgba with opacity
const hexToRGBA = (hex: string, alpha: number) => {
  const bigint = parseInt(hex.replace(/^#/, ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const useHexToRGBA = (hexColor: string, opacity: number) => {
  const [rgbaColor, setRGBAColor] = useState('');

  useEffect(() => {
    if (hexColor && opacity >= 0 && opacity <= 1) {
      const convertedColor: SetStateAction<string> = hexToRGBA(hexColor, opacity);
      setRGBAColor(convertedColor);
    }
  }, [hexColor, opacity]);

  return rgbaColor;
};

export default useHexToRGBA;
