import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry); // Métrica de layout instável (Cumulative Layout Shift)
    onFID(onPerfEntry); // Métrica de tempo de interação (First Input Delay)
    onFCP(onPerfEntry); // Métrica de primeira renderização (First Contentful Paint)
    onLCP(onPerfEntry); // Métrica de maior renderização (Largest Contentful Paint)
    onTTFB(onPerfEntry); // Métrica de tempo de resposta do servidor (Time to First Byte)
  }
};

export default reportWebVitals;
