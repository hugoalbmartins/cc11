import { useState } from 'react';
import { Play, ChevronDown } from 'lucide-react';
import ImageGallery from './ImageGallery';
import ImageCarousel from './ImageCarousel';
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
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const selectService = (index: number) => {
    if (selectedService === index) {
      setSelectedService(null);
      return;
    }

    if (selectedService !== null) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedService(index);
        setIsTransitioning(false);
      }, 300);
    } else {
      setSelectedService(index);
    }
  };

  const openGallery = (service: any) => {
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

          <div className="hidden lg:block">
            {selectedService === null ? (
              <div className="grid md:grid-cols-3 gap-6">
                {services.map((service, index) => {
                  const images = galleryData[service.folder] || [];
                  const hasImages = images.length > 0;

                  return (
                    <div
                      key={index}
                      className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer bg-white h-[120px]"
                      onClick={() => selectService(index)}
                    >
                      <div className="relative z-20 h-full flex flex-col p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg text-stone-800 group-hover:text-amber-700 transition-colors">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      {hasImages && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-6">
                <div className="w-1/3 space-y-3">
                  {services.map((service, index) => {
                    const isSelected = selectedService === index;
                    const images = galleryData[service.folder] || [];
                    const hasImages = images.length > 0;

                    return (
                      <div
                        key={index}
                        className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-600 to-amber-500 shadow-lg scale-105'
                            : 'bg-white hover:bg-amber-50 hover:shadow-md'
                        }`}
                        onClick={() => selectService(index)}
                      >
                        <div className="p-4">
                          <h3
                            className={`font-bold text-base transition-colors ${
                              isSelected ? 'text-white' : 'text-stone-800 hover:text-amber-700'
                            }`}
                          >
                            {service.title}
                          </h3>
                        </div>

                        {hasImages && !isSelected && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="w-2/3 relative">
                  <div
                    className={`transition-opacity duration-300 ${
                      isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    {selectedService !== null && (
                      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                        {(() => {
                          const service = services[selectedService];
                          const images = galleryData[service.folder] || [];
                          const hasImages = images.length > 0;

                          return (
                            <>
                              {hasImages && (
                                <div className="relative h-80 overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-r from-stone-900/95 via-stone-900/80 to-transparent z-10"></div>
                                  <img
                                    src={images[0]}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                                    <h3 className="text-3xl font-bold text-white mb-2">
                                      {service.title}
                                    </h3>
                                  </div>
                                </div>
                              )}

                              {!hasImages && (
                                <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-8">
                                  <h3 className="text-3xl font-bold text-white">
                                    {service.title}
                                  </h3>
                                </div>
                              )}

                              <div className="p-8">
                                <p className="text-stone-700 text-lg leading-relaxed mb-6">
                                  {service.description}
                                </p>

                                {hasImages && (
                                  <div>
                                    <div className="flex items-center justify-between mb-4">
                                      <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
                                        Galeria de Trabalhos
                                      </span>
                                      <span className="text-stone-500 text-sm">
                                        {images.length} imagens
                                      </span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                      {images.slice(0, 8).map((img, imgIndex) => (
                                        <div
                                          key={imgIndex}
                                          className="relative aspect-square rounded-lg overflow-hidden bg-stone-200 cursor-pointer group/img"
                                          onClick={() => openGallery(service)}
                                        >
                                          <img
                                            src={img}
                                            alt={`${service.title} ${imgIndex + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                                          />
                                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <Play className="w-8 h-8 text-white" fill="white" />
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    {images.length > 0 && (
                                      <button
                                        onClick={() => openGallery(service)}
                                        className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                                      >
                                        Ver todas as {images.length} imagens
                                      </button>
                                    )}
                                  </div>
                                )}

                                {!hasImages && (
                                  <div className="text-stone-400 text-center py-8 italic border-t border-stone-200">
                                    Galeria em breve
                                  </div>
                                )}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:hidden space-y-4">
            {services.map((service, index) => {
              const images = galleryData[service.folder] || [];
              const hasImages = images.length > 0;
              const isExpanded = selectedService === index;

              return (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div
                    className={`p-4 cursor-pointer flex items-center justify-between transition-all duration-300 ${
                      isExpanded
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500'
                        : 'hover:bg-amber-50'
                    }`}
                    onClick={() => selectService(index)}
                  >
                    <h3
                      className={`font-bold text-base transition-colors ${
                        isExpanded ? 'text-white' : 'text-stone-800'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <ChevronDown
                      className={`flex-shrink-0 ml-2 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-white' : 'text-amber-600'
                      }`}
                    />
                  </div>

                  {isExpanded && (
                    <div
                      className={`transition-opacity duration-300 ${
                        isTransitioning ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      <div className="p-6 border-t border-stone-100">
                        <p className="text-stone-700 leading-relaxed mb-6">
                          {service.description}
                        </p>

                        {hasImages ? (
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
                                Galeria de Trabalhos
                              </span>
                              <span className="text-stone-500 text-sm">
                                {images.length} imagens
                              </span>
                            </div>

                            <ImageCarousel
                              images={images}
                              title={service.title}
                              onViewAll={() => openGallery(service)}
                            />
                          </div>
                        ) : (
                          <div className="text-stone-400 text-center py-8 italic border-t border-stone-200">
                            Galeria em breve
                          </div>
                        )}
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
