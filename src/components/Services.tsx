import { useState } from 'react';
import { ChevronDown, Image as ImageIcon } from 'lucide-react';
import ImageGallery from './ImageGallery';
import { galleryData } from '../lib/galleryData';

const services = [
  {
    title: 'Fornecimento e aplicação de Carpintaria',
    description: 'Soluções completas em carpintaria para edifícios habitacionais, comerciais e industriais. Do fornecimento à instalação, garantimos acabamentos de excelência em todos os projectos.',
    folder: 'Fornecimento e aplicacao de Carpintaria',
  },
  {
    title: 'Recuperação e manutenção de madeiras exteriores',
    description: 'Especialistas em devolver vida às madeiras expostas ao tempo. Tratamentos profissionais que protegem e preservam a beleza natural das suas estruturas exteriores.',
    folder: 'Recuperacao e manutencao de madeiras exteriores',
  },
  {
    title: 'Renovação de soalhos e pavimentos em madeira',
    description: 'Transformamos soalhos antigos em superfícies renovadas. Lixagem, tratamento e acabamento que respeitam a essência da madeira, conferindo-lhe nova vida e durabilidade.',
    folder: 'Renovacao de soalhos e pavimentos em madeira',
  },
  {
    title: 'Restauro e acabamento de mobiliário',
    description: 'Devolvemos o esplendor original às suas peças de mobiliário. Técnicas artesanais combinadas com métodos modernos para preservar memórias e valorizar o seu património.',
    folder: 'Restauro e acabamento de mobiliario',
  },
  {
    title: 'Restauro e lacagem de carpintaria',
    description: 'Processos especializados de lacagem que conferem brilho e proteção duradoura. Restauramos carpintarias com rigor técnico, mantendo a autenticidade e qualidade.',
    folder: 'Restauro e lacagem de carpintaria',
  },
  {
    title: 'Projectos de decoração em 3D e execução',
    description: 'Visualize o seu espaço antes de o concretizar. Desenvolvemos projectos de decoração em 3D com realismo fotográfico e executamos cada detalhe com precisão milimétrica.',
    folder: 'Projectos de decoracao em 3D e execucao',
  },
  {
    title: 'Mobiliário por medida (cozinhas, roupeiros, etc...)',
    description: 'Criamos mobiliário personalizado que se adapta perfeitamente ao seu espaço e estilo. Cozinhas funcionais, roupeiros optimizados e soluções únicas pensadas para si.',
    folder: 'Mobiliario por medida',
  },
  {
    title: 'Pintura de metais',
    description: 'Acabamentos profissionais em superfícies metálicas. Preparação, tratamento e pintura especializada que garante proteção contra corrosão e um resultado estético impecável.',
    folder: 'Pintura de metais',
  },
  {
    title: 'Aplicação de microcimento',
    description: 'Revestimento contemporâneo e versátil para pavimentos e paredes. Aplicação técnica de microcimento que oferece continuidade visual, resistência e elegância moderna.',
    folder: 'Aplicacao de microcimento',
  },
];

export default function Services() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const openGallery = (e: React.MouseEvent, service: any) => {
    e.stopPropagation();
    const images = galleryData[service.folder] || [];
    if (images.length > 0) {
      setGalleryImages(images);
      setSelectedGallery(service.title);
    }
  };

  return (
    <>
      <section id="services" className="py-24 px-4 bg-gradient-to-b from-amber-50 to-stone-100">
        <div className="max-w-7xl mx-auto">
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
            {services.map((service, index) => {
              const images = galleryData[service.folder] || [];
              const hasImages = images.length > 0;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden ${
                    expandedCard === index ? 'md:col-span-3 shadow-2xl' : 'hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => toggleCard(index)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-stone-800 hover:text-amber-700 transition-colors flex-1">
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
                    </div>
                  </div>

                  {hasImages && (
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        expandedCard === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-stone-200 pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold text-stone-700 uppercase tracking-wide">
                              Galeria de Trabalhos
                            </h4>
                            <span className="text-xs text-stone-500">{images.length} imagens</span>
                          </div>
                          <div className="grid grid-cols-4 gap-2 mb-4">
                            {images.slice(0, 4).map((img, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="aspect-square rounded-lg overflow-hidden bg-stone-200 cursor-pointer hover:ring-2 hover:ring-amber-500 transition-all"
                                onClick={(e) => openGallery(e, service)}
                              >
                                <img
                                  src={img}
                                  alt={`${service.title} ${imgIndex + 1}`}
                                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={(e) => openGallery(e, service)}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                          >
                            <ImageIcon className="w-4 h-4" />
                            Ver Galeria Completa
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {!hasImages && expandedCard === index && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-stone-200 pt-4">
                        <p className="text-sm text-stone-500 text-center italic">
                          Galeria em breve
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ImageGallery
        title={selectedGallery || ''}
        images={galleryImages}
        isOpen={selectedGallery !== null}
        onClose={() => setSelectedGallery(null)}
      />
    </>
  );
}
