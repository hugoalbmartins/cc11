import { X } from 'lucide-react';

interface CookiePolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CookiePolicy({ isOpen, onClose }: CookiePolicyProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-stone-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-stone-800">Política de Cookies</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6 text-stone-600" />
          </button>
        </div>

        <div className="px-8 py-6 space-y-6 text-stone-700 leading-relaxed">
          <p className="text-sm text-stone-500">
            <strong>Última atualização:</strong> 06 de Dezembro de 2025
          </p>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">1. O Que São Cookies?</h3>
            <p>
              Cookies são pequenos ficheiros de texto que os websites colocam no seu computador ou dispositivo móvel quando visita um website.
              Os cookies são amplamente utilizados para fazer os websites funcionarem, ou funcionarem de forma mais eficiente,
              bem como para fornecer informações aos proprietários do website.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">2. Como Utilizamos Cookies</h3>
            <p>
              O website da CC11 Acabamentos foi desenvolvido com uma abordagem minimalista em relação ao uso de cookies.
              <strong> Não utilizamos cookies de rastreamento, análise ou publicidade.</strong>
            </p>
            <p className="mt-3">
              Este website funciona sem a necessidade de armazenar cookies no seu dispositivo, garantindo assim a sua privacidade
              e uma experiência de navegação sem rastreamento.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">3. Tipos de Cookies</h3>
            <p>Para referência, existem os seguintes tipos de cookies:</p>

            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-semibold text-stone-800">Cookies Estritamente Necessários</h4>
                <p className="text-sm">
                  Essenciais para o funcionamento básico do website. Sem estes cookies, o website não pode funcionar corretamente.
                </p>
                <p className="text-sm mt-1">
                  <strong>Estado neste website:</strong> <span className="text-green-600">Não utilizados</span>
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-stone-800">Cookies de Desempenho</h4>
                <p className="text-sm">
                  Recolhem informações sobre como os visitantes utilizam o website, para ajudar a melhorar o seu funcionamento.
                </p>
                <p className="text-sm mt-1">
                  <strong>Estado neste website:</strong> <span className="text-green-600">Não utilizados</span>
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-stone-800">Cookies de Funcionalidade</h4>
                <p className="text-sm">
                  Permitem que o website se lembre das suas escolhas para fornecer funcionalidades melhoradas e personalizadas.
                </p>
                <p className="text-sm mt-1">
                  <strong>Estado neste website:</strong> <span className="text-green-600">Não utilizados</span>
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-stone-800">Cookies de Marketing</h4>
                <p className="text-sm">
                  Utilizados para rastrear visitantes através de websites para exibir anúncios relevantes e apelativos.
                </p>
                <p className="text-sm mt-1">
                  <strong>Estado neste website:</strong> <span className="text-green-600">Não utilizados</span>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">4. Cookies de Terceiros</h3>
            <p>
              Não utilizamos serviços de terceiros que coloquem cookies no seu dispositivo, tais como:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Google Analytics ou outras ferramentas de análise</li>
              <li>Facebook Pixel ou outras plataformas de redes sociais</li>
              <li>Redes de publicidade</li>
              <li>Plugins de partilha em redes sociais</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">5. Armazenamento Local</h3>
            <p>
              O website pode utilizar o armazenamento local do navegador (localStorage/sessionStorage) apenas para
              funcionalidades essenciais do website, como lembrar preferências de interface. Esta informação permanece
              no seu dispositivo e não é transmitida aos nossos servidores.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">6. Gestão de Cookies</h3>
            <p>
              Uma vez que este website não utiliza cookies, não é necessário configurar preferências de cookies.
              No entanto, pode sempre controlar e gerir cookies através das configurações do seu navegador:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li><strong>Google Chrome:</strong> Definições → Privacidade e segurança → Cookies e outros dados do site</li>
              <li><strong>Mozilla Firefox:</strong> Opções → Privacidade e segurança → Cookies e dados do site</li>
              <li><strong>Safari:</strong> Preferências → Privacidade → Cookies e dados de websites</li>
              <li><strong>Microsoft Edge:</strong> Definições → Cookies e permissões do site</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">7. Formulário de Contacto</h3>
            <p>
              Quando utiliza o nosso formulário de contacto, os dados são enviados diretamente para os nossos servidores
              através de uma ligação segura (HTTPS). Não utilizamos cookies para rastrear ou armazenar estas informações
              no seu dispositivo.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">8. Alterações a Esta Política</h3>
            <p>
              Podemos atualizar esta Política de Cookies periodicamente para refletir alterações nas nossas práticas ou
              por outros motivos operacionais, legais ou regulamentares. Recomendamos que reveja esta página regularmente
              para se manter informado sobre como utilizamos cookies.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">9. Mais Informações</h3>
            <p>
              Para mais informações sobre como tratamos os seus dados pessoais, consulte a nossa{' '}
              <span className="text-amber-600 font-semibold">Política de Privacidade</span>.
            </p>
            <p className="mt-3">
              Se tiver questões sobre esta Política de Cookies, contacte-nos:
            </p>
            <p className="mt-2">
              Email: geral@cc11.pt<br />
              Telefone: +351 911 823 153
            </p>
          </section>

          <section className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-green-800 mb-2">Compromisso com a Privacidade</h3>
            <p className="text-green-800 text-sm">
              A CC11 Acabamentos está comprometida em proteger a sua privacidade. Este website foi desenvolvido
              intencionalmente sem cookies de rastreamento ou análise, garantindo que a sua visita permanece privada
              e livre de monitorização.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
