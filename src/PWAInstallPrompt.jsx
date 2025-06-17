import { useState, useEffect } from 'react';

export default function PWAInstallPrompt() {
   const [deferredPrompt, setDeferredPrompt] = useState(null);
   const [isAppInstalled, setIsAppInstalled] = useState(false);

   useEffect(() => {
      const handler = e => {
         e.preventDefault();
         setDeferredPrompt(e);
      };

      window.addEventListener('beforeinstallprompt', handler);

      window.addEventListener('appinstalled', () => {
         setIsAppInstalled(true);
      });

      return () => {
         window.removeEventListener('beforeinstallprompt', handler);
      };
   }, []);

   const handleInstallClick = () => {
      if (deferredPrompt) {
         deferredPrompt.prompt();
         deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
               console.log('Пользователь установил PWA');
            } else {
               console.log('Пользователь отказался от установки');
            }
            setDeferredPrompt(null);
         });
      }
   };

   if (isAppInstalled || !deferredPrompt) {
      return null;
   }

   return (
      <div className="pwa-install-banner">
         <button onClick={handleInstallClick}>Установить приложение</button>
      </div>
   );
}
