import { useState } from 'react';
import { Mail, Phone, Shield, Cookie } from 'lucide-react';
import PrivacyPolicy from './PrivacyPolicy';
import CookiePolicy from './CookiePolicy';

export default function Footer() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-gradient-to-b from-stone-800 to-stone-900 text-stone-200 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">CC11 Acabamentos</h3>
              <p className="text-stone-300 leading-relaxed">
                Excelência em carpintaria, lacagem e pintura. Transformamos espaços com qualidade e profissionalismo.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Contactos</h4>
              <div className="space-y-3">
                <a
                  href="tel:+351911823153"
                  className="flex items-center gap-3 text-stone-300 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+351 911 823 153</span>
                </a>
                <a
                  href="mailto:geral@cc11.pt"
                  className="flex items-center gap-3 text-stone-300 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>geral@cc11.pt</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Informação Legal</h4>
              <div className="space-y-3">
                <button
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="flex items-center gap-3 text-stone-300 hover:text-amber-400 transition-colors"
                >
                  <Shield className="w-5 h-5" />
                  <span>Política de Privacidade</span>
                </button>
                <button
                  onClick={() => setShowCookiePolicy(true)}
                  className="flex items-center gap-3 text-stone-300 hover:text-amber-400 transition-colors"
                >
                  <Cookie className="w-5 h-5" />
                  <span>Política de Cookies</span>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-stone-400 text-sm text-center md:text-left">
                © {currentYear} CC11 Acabamentos. Todos os direitos reservados.
              </p>
              <p className="text-stone-400 text-sm text-center md:text-right">
                Website desenvolvido com dedicação para CC11
              </p>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyPolicy isOpen={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)} />
      <CookiePolicy isOpen={showCookiePolicy} onClose={() => setShowCookiePolicy(false)} />
    </>
  );
}
