import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isSticky
            ? 'bg-gradient-to-r from-amber-900 to-stone-800 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <img
              src="/MOBILE.jpg"
              alt="CC11 Acabamentos"
              className="h-16 md:h-20 drop-shadow-lg"
            />
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-amber-50 hover:text-amber-300 transition-colors font-medium"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-amber-50 hover:text-amber-300 transition-colors font-medium"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-amber-50 hover:text-amber-300 transition-colors font-medium"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-full transition-colors font-medium"
            >
              Contacto
            </button>
          </div>

          <button
            className="md:hidden text-amber-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-stone-800/95 backdrop-blur-md border-t border-amber-600/30">
            <div className="flex flex-col gap-4 p-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-amber-50 hover:text-amber-300 transition-colors font-medium text-left"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-amber-50 hover:text-amber-300 transition-colors font-medium text-left"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-amber-50 hover:text-amber-300 transition-colors font-medium text-left"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-full transition-colors font-medium"
              >
                Contacto
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
