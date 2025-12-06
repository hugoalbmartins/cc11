import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/85 via-stone-800/85 to-amber-950/85 z-10"></div>

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      ></div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center pt-64 md:pt-72">
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
        <p className="text-xl md:text-2xl text-amber-100 font-light leading-relaxed">
          Excelência em Lacagem, Restauro e Carpintaria
        </p>
        <button
          onClick={scrollToAbout}
          className="mt-12 inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Descubra Mais
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <ChevronDown
          className="w-8 h-8 text-amber-400 animate-bounce cursor-pointer"
          onClick={scrollToAbout}
        />
      </div>
    </section>
  );
}
