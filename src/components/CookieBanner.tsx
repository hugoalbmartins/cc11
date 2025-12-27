import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenPolicy: () => void;
}

export default function CookieBanner({ onOpenPolicy }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    closeWithAnimation();
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    closeWithAnimation();
  };

  const closeWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 backdrop-blur-lg border-t-2 border-amber-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Cookie className="w-6 h-6 text-amber-400" />
              </div>

              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-2">
                  Privacidade e Cookies
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Este website não utiliza cookies de rastreamento ou análise. Respeitamos a sua privacidade e garantimos uma navegação livre de monitorização.
                  {' '}
                  <button
                    onClick={onOpenPolicy}
                    className="text-amber-400 hover:text-amber-300 font-semibold underline transition-colors"
                  >
                    Saiba mais sobre a nossa política
                  </button>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleReject}
                className="flex-1 md:flex-none px-6 py-2.5 bg-stone-700 hover:bg-stone-600 text-white rounded-lg font-medium transition-all duration-300 border border-stone-600 hover:border-stone-500"
              >
                Rejeitar
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
