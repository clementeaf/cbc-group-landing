import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';

/**
 * Hook para inicializar Cal.com en la aplicación
 * Configura el API de Cal.com con el namespace y opciones de UI
 */
export const useCalCom = (): void => {
  useEffect((): void => {
    (async (): Promise<void> => {
      try {
        const cal = await getCalApi({ namespace: '30min' });
        cal('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view'
        });
      } catch (error) {
        console.error('Error al inicializar Cal.com:', error);
      }
    })();
  }, []);
};

