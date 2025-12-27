import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  title: string;
  autoPlayInterval?: number;
  onViewAll: () => void;
}

export default function ImageCarousel({
  images,
  title,
  autoPlayInterval = 3500,
  onViewAll
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval, isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return (
      <div className="text-stone-400 text-center py-8 italic">
        Galeria em breve
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-64 rounded-lg overflow-hidden bg-stone-900">
        <img
          src={images[currentIndex]}
          alt={`${title} ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-amber-500 w-8'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Ir para imagem ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <button
        onClick={onViewAll}
        className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Ver todas as {images.length} imagens
      </button>
    </div>
  );
}
