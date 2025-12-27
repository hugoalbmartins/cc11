import { useState, useEffect } from 'react';
import { MessageCircle, Instagram, ChevronUp } from 'lucide-react';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-40">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="group w-12 h-12 bg-amber-600/80 hover:bg-amber-500/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="w-6 h-6 text-white" />
          <span className="absolute right-16 bg-stone-800 text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none text-sm">
            Topo
          </span>
        </button>
      )}

      <a
        href="https://wa.me/351911823153"
        target="_blank"
        rel="noopener noreferrer"
        className="group w-12 h-12 bg-[#25D366]/90 hover:bg-[#20BA5A]/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        aria-label="Contactar via WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute right-16 bg-stone-800 text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none text-sm">
          WhatsApp
        </span>
      </a>

      <a
        href="https://www.instagram.com/cc11.acabamentos.homedecor?igsh=ZWdjM3F0djhhMzh4"
        target="_blank"
        rel="noopener noreferrer"
        className="group w-12 h-12 bg-gradient-to-br from-[#833AB4]/90 via-[#E1306C]/90 to-[#F77737]/90 hover:from-[#7232A8]/95 hover:via-[#D12A60]/95 hover:to-[#E66B2B]/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        aria-label="Visitar Instagram"
      >
        <Instagram className="w-6 h-6 text-white" />
        <span className="absolute right-16 bg-stone-800 text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none text-sm">
          Instagram
        </span>
      </a>
    </div>
  );
}
