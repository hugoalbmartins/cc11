import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

const services = [
  {
    title: 'Fornecimento e aplicação de Carpintaria',
    description: 'Soluções completas em carpintaria para edifícios habitacionais, comerciais e industriais. Do fornecimento à instalação, garantimos acabamentos de excelência em todos os projectos.',
    portfolioLink: '#portfolio',
  },
  {
    title: 'Recuperação e manutenção de madeiras exteriores',
    description: 'Especialistas em devolver vida às madeiras expostas ao tempo. Tratamentos profissionais que protegem e preservam a beleza natural das suas estruturas exteriores.',
    portfolioLink: '#portfolio',
  },
  {
    title: 'Renovação de soalhos e pavimentos em madeira',
    description: 'Transformamos soalhos antigos em superfícies renovadas. Lixagem, tratamento e acabamento que respeitam a essência da madeira, conferindo-lhe nova vida e durabilidade.',
    portfolioLink: '#portfolio',
  },
  {
    title: 'Restauro e acabamento de mobiliário',
    description: 'Devolvemos o esplendor original às suas peças de mobiliário. Técnicas artesanais combinadas com métodos modernos para preservar memórias e valorizar o seu património.',
    portfolioLink: '#portfolio',
  },
  {
    title: 'Restauro e lacagem de carpintaria',
    description: 'Processos especializados de lacagem que conferem brilho e proteção duradoura. Restauramos carpintarias com rigor técnico, mantendo a autenticidade e qualidade.',
    portfolioLink: '#portfolio',
  },
  {
    title: 'Projectos de decoração em 3D e execução',
    description: 'Visualize o seu espaço antes de o concretizar. Desenvolvemos projectos de decoração em 3D com realismo fotográfico e executamos cada detalhe com precisão milimétrica.',
    portfolioLink: '#portfolio',
  },
  {
    title: 'Mobiliário por medida (cozinhas, roupeiros, etc...)',
    description: 'Criamos mobiliário personalizado que se adapta perfeitamente ao seu espaço e estilo. Cozinhas funcionais, roupeiros optimizados e soluções únicas pensadas para si.',
    portfolioLink: '#portfolio',
  },
  {
    title: 'Pintura de metais',
    description: 'Acabamentos profissionais em superfícies metálicas. Preparação, tratamento e pintura especializada que garante proteção contra corrosão e um resultado estético impecável.',
    portfolioLink: '#portfolio',
  },
  {
    title: 'Aplicação de microcimento',
    description: 'Revestimento contemporâneo e versátil para pavimentos e paredes. Aplicação técnica de microcimento que oferece continuidade visual, resistência e elegância moderna.',
    portfolioLink: '#portfolio',
  },
];

export default function Services() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const scrollToPortfolio = (e: React.MouseEvent, serviceName: string) => {
    e.stopPropagation();
    const portfolioSection = document.querySelector('#portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const portfolioCard = document.querySelector(`[data-portfolio="${serviceName}"]`);
        if (portfolioCard) {
          portfolioCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          portfolioCard.classList.add('ring-4', 'ring-amber-500', 'ring-offset-4');
          setTimeout(() => {
            portfolioCard.classList.remove('ring-4', 'ring-amber-500', 'ring-offset-4');
          }, 2000);
        }
      }, 500);
    }
  };

  return (
    <section id="services" className="py-24 px-4 bg-gradient-to-b from-amber-50 to-stone-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            Nossos Serviços
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto mb-6"></div>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Soluções completas para todos os seus projetos de madeira e acabamentos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg transition-all duration-300 cursor-pointer overflow-hidden ${
                expandedCard === index ? 'md:col-span-3 shadow-2xl' : 'hover:shadow-xl hover:-translate-y-1'
              }`}
              onClick={() => toggleCard(index)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-stone-800 group-hover:text-amber-700 transition-colors flex-1">
                    {service.title}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-amber-600 transition-transform duration-300 flex-shrink-0 ml-2 ${
                      expandedCard === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    expandedCard === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-stone-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <button
                    onClick={(e) => scrollToPortfolio(e, service.title)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Ver Portfólio
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
