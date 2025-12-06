import { useState } from 'react';
import { Paintbrush, Hammer, RefreshCw } from 'lucide-react';
import ImageGallery from './ImageGallery';

const services = [
  {
    icon: RefreshCw,
    title: 'Lacagem & Restauro',
    description: 'Devolvemos vida e brilho a peças antigas, preservando a sua história e beleza original. Especialistas em lacagem de madeiras e restauro de móveis.',
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
    folder: 'Lacagem e Restauro',
  },
  {
    icon: Paintbrush,
    title: 'Pintura de Interiores',
    description: 'Serviços completos de pintura garantindo ambientes modernos, acolhedores e adaptados ao gosto de cada cliente.',
    image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=800',
    folder: 'Pintura de Interiores',
  },
  {
    icon: Hammer,
    title: 'Carpintaria Nova',
    description: 'Soluções à medida para edifícios habitacionais, comerciais e industriais. Portas, roupeiros, móveis personalizados e muito mais.',
    image: 'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=800',
    folder: 'Carpintaria Nova',
  },
];

export default function Services() {
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const openGallery = (service: any) => {
    const imageMap: { [key: string]: string[] } = {
      'Lacagem e Restauro': [],
      'Pintura de Interiores': [],
      'Carpintaria Nova': [],
    };

    setGalleryImages(imageMap[service.folder] || [service.image]);
    setSelectedGallery(service.title);
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

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => openGallery(service)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-amber-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageGallery
        title={selectedGallery || ''}
        images={galleryImages}
        isOpen={selectedGallery !== null}
        onClose={() => setSelectedGallery(null)}
      />
    </section>
  );
}
