import { useState, useEffect } from 'react';
import './InstallButton.css'

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
        console.log('beforeinstallprompt fired');
        e.preventDefault();
        setDeferredPrompt(e);
        setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install');
        } else {
          console.log('User dismissed the install');
        }
        setDeferredPrompt(null);
        setShowButton(false);
      });
    }
  };

  if (!showButton) {
    return null;
  }

  return (
    <button onClick={handleInstallClick} className="install-button">Install App!</button>
  );
}

export default InstallButton;
