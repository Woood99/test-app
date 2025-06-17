import { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function PWAInstallPrompt() {
   const [deferredPrompt, setDeferredPrompt] = useState(null);
   const [isInstalled, setIsInstalled] = useState(false);
   const { updateServiceWorker } = useRegisterSW();

   useEffect(() => {
      const handler = e => {
         e.preventDefault();
         setDeferredPrompt(e);
      };

      window.addEventListener('beforeinstallprompt', handler);

      const installedHandler = () => setIsInstalled(true);
      window.addEventListener('appinstalled', installedHandler);

      return () => {
         window.removeEventListener('beforeinstallprompt', handler);
         window.removeEventListener('appinstalled', installedHandler);
      };
   }, []);

   const handleInstallClick = async () => {
      if (!deferredPrompt) return;

      try {
         deferredPrompt.prompt();
         const { outcome } = await deferredPrompt.userChoice;

         if (outcome === 'accepted') {
            console.log('Пользователь принял установку');
            setDeferredPrompt(null);
         }
      } catch (error) {
         console.error('Ошибка при установке:', error);
      }
   };

   if (isInstalled || !deferredPrompt) {
      return null;
   }

   return (
      <button onClick={handleInstallClick} className="pwa-install-button" aria-label="Установить приложение">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
         </svg>
         Установить приложение
      </button>
   );
}
