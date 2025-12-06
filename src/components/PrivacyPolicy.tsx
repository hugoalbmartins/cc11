import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-stone-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-stone-800">Política de Privacidade</h2>
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
            <h3 className="text-xl font-bold text-stone-800 mb-3">1. Introdução</h3>
            <p>
              A CC11 Acabamentos ("nós", "nosso" ou "empresa") respeita a sua privacidade e está comprometida em proteger os seus dados pessoais.
              Esta Política de Privacidade explica como recolhemos, utilizamos e protegemos as suas informações pessoais em conformidade com o
              Regulamento Geral sobre a Proteção de Dados (RGPD - Regulamento UE 2016/679) e a legislação portuguesa aplicável.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">2. Responsável pelo Tratamento de Dados</h3>
            <p>
              <strong>CC11 Acabamentos</strong><br />
              Email: geral@cc11.pt<br />
              Telefone: +351 911 823 153
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">3. Dados Pessoais que Recolhemos</h3>
            <p>Podemos recolher e processar os seguintes dados pessoais:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Dados de contacto:</strong> nome, endereço de email, número de telefone</li>
              <li><strong>Dados de comunicação:</strong> mensagens enviadas através do formulário de contacto</li>
              <li><strong>Dados técnicos:</strong> endereço IP, tipo de navegador, informações do dispositivo</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">4. Finalidade do Tratamento de Dados</h3>
            <p>Os seus dados pessoais são recolhidos e tratados para as seguintes finalidades:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Responder às suas solicitações de contacto e pedidos de informação</li>
              <li>Fornecer orçamentos e propostas comerciais</li>
              <li>Executar contratos de prestação de serviços</li>
              <li>Melhorar os nossos serviços e comunicação com clientes</li>
              <li>Cumprir obrigações legais e fiscais</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">5. Base Legal para o Tratamento</h3>
            <p>Tratamos os seus dados pessoais com base em:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Consentimento:</strong> quando nos contacta através do formulário do website</li>
              <li><strong>Execução de contrato:</strong> para prestação de serviços solicitados</li>
              <li><strong>Interesse legítimo:</strong> para responder a pedidos de informação e melhorar os nossos serviços</li>
              <li><strong>Obrigações legais:</strong> para cumprimento de requisitos fiscais e contabilísticos</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">6. Partilha de Dados</h3>
            <p>
              Não vendemos, alugamos ou partilhamos os seus dados pessoais com terceiros para fins comerciais.
              Os seus dados podem ser partilhados apenas nas seguintes circunstâncias:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Com prestadores de serviços que nos auxiliam nas operações (ex: serviços de hosting, email)</li>
              <li>Quando exigido por lei ou por autoridades competentes</li>
              <li>Com o seu consentimento expresso</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">7. Segurança dos Dados</h3>
            <p>
              Implementamos medidas técnicas e organizacionais adequadas para proteger os seus dados pessoais contra acesso não autorizado,
              alteração, divulgação ou destruição. Estas medidas incluem encriptação de dados, controlo de acesso e monitorização de segurança.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">8. Retenção de Dados</h3>
            <p>
              Conservamos os seus dados pessoais apenas pelo período necessário para cumprir as finalidades para as quais foram recolhidos,
              ou conforme exigido por lei. Os dados de contacto são conservados durante:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Enquanto mantiver uma relação comercial connosco</li>
              <li>Até 3 anos após o último contacto para fins de orçamentação</li>
              <li>Conforme exigido pela legislação fiscal e contabilística (mínimo 10 anos para contratos executados)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">9. Os Seus Direitos</h3>
            <p>Ao abrigo do RGPD, tem os seguintes direitos:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Direito de acesso:</strong> solicitar cópia dos seus dados pessoais</li>
              <li><strong>Direito de retificação:</strong> corrigir dados incorretos ou incompletos</li>
              <li><strong>Direito ao apagamento:</strong> solicitar eliminação dos seus dados</li>
              <li><strong>Direito à limitação:</strong> restringir o tratamento dos seus dados</li>
              <li><strong>Direito à portabilidade:</strong> receber os seus dados em formato estruturado</li>
              <li><strong>Direito de oposição:</strong> opor-se ao tratamento dos seus dados</li>
              <li><strong>Direito de retirar consentimento:</strong> retirar consentimento a qualquer momento</li>
            </ul>
            <p className="mt-3">
              Para exercer estes direitos, contacte-nos através do email: geral@cc11.pt
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">10. Cookies</h3>
            <p>
              Este website não utiliza cookies de rastreamento ou análise. Apenas utilizamos funcionalidades essenciais
              para o funcionamento básico do website. Para mais informações, consulte a nossa Política de Cookies.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">11. Reclamações</h3>
            <p>
              Se considerar que o tratamento dos seus dados pessoais viola o RGPD, tem o direito de apresentar uma reclamação
              à autoridade de controlo competente:
            </p>
            <p className="mt-2">
              <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong><br />
              Website: <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 underline">www.cnpd.pt</a><br />
              Email: geral@cnpd.pt<br />
              Telefone: +351 213 928 400
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">12. Alterações a Esta Política</h3>
            <p>
              Reservamo-nos o direito de atualizar esta Política de Privacidade periodicamente.
              Quaisquer alterações serão publicadas nesta página com a data de atualização revista.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-800 mb-3">13. Contacto</h3>
            <p>
              Para questões sobre esta Política de Privacidade ou sobre o tratamento dos seus dados pessoais, contacte-nos:
            </p>
            <p className="mt-2">
              Email: geral@cc11.pt<br />
              Telefone: +351 911 823 153
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
