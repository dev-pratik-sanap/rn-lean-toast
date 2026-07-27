import { useEffect, useState } from 'react';
import { Toast } from './ToastController';
import type { ToastData } from './ToastController';
import { ToastUI } from './ToastUI';

export const ToastHost = () => {
  const [activeToast, setActiveToast] = useState<ToastData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = Toast.subscribe((toast) => {
      if (toast) {
        setActiveToast(toast);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    return unsubscribe;
  }, []);

  if (!activeToast) return null;

  return (
    <ToastUI
      toast={activeToast}
      isVisible={isVisible}
      onAnimationEnd={() => {
        if (!isVisible) {
          setActiveToast(null);
          Toast.next();
        }
      }}
    />
  );
};
