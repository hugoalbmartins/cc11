import { useState } from 'react';
import ImageGallery from './ImageGallery';

const portfolioItems = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Móvel Lacado Alto-Brilho',
    category: 'Lacagem',
    folder: 'Movel Lacado Alto-Brilho',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Portas de Madeira',
    category: 'Carpintaria',
    folder: 'Portas de Madeira',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Móveis Personalizados Modernos',
    category: 'Carpintaria',
    folder: 'Móveis Personalizados Modernos',
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/1350593/pexels-photo-1350593.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Roupeiro Residencial',
    category: 'Carpintaria',
    folder: 'Roupeiro Residencial',
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Pintura de Interiores',
    category: 'Pintura',
    folder: 'Pintura de Interiores Portfolio',
  },
  {
    id: 6,
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Carpintaria Residencial',
    category: 'Carpintaria',
    folder: 'Carpintaria Residencial',
  },
];

export default function Portfolio() {
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const openGallery = (item: any) => {
    const folderPath = `/images/${item.folder}`;
    const images: string[] = [];

    const imageMap: { [key: string]: string[] } = {
      'Móveis Personalizados Modernos': [
        '/images/Móveis Personalizados Modernos/Móveis Personalizados Modernos 1.jpg',
        '/images/Móveis Personalizados Modernos/Móveis Personalizados Modernos 2.jpg',
      ],
      'Carpintaria Residencial': [
        '/images/Carpintaria Residencial/Carpintaria Residencial 1.jpg',
        '/images/Carpintaria Residencial/Carpintaria Residencial 2.jpg',
        '/images/Carpintaria Residencial/Carpintaria Residencial 3.jpg',
      ],
      'Movel Lacado Alto-Brilho': [],
      'Portas de Madeira': [],
      'Roupeiro Residencial': [],
      'Pintura de Interiores Portfolio': [],
    };

    setGalleryImages(imageMap[item.folder] || [item.image]);
    setSelectedGallery(item.title);
  };

  return (
    <section id="portfolio" className="py-24 px-4 bg-gradient-to-b from-stone-100 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            Trabalhos Realizados
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto mb-6"></div>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Conheça alguns dos nossos projetos concluídos com excelência
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => openGallery(item)}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-amber-500 text-white text-sm rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {item.title}
                  </h3>
                </div>
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
