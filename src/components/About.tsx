import { Sparkles, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-b from-stone-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            Sobre Nós
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
            <img
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Interior com Madeiras"
              className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>

          <div className="space-y-6">
            <p className="text-lg text-stone-700 leading-relaxed">
              Somos uma empresa dedicada à <span className="font-semibold text-amber-700">excelência no tratamento e renovação de madeiras</span>, com uma equipa experiente e especializada em lacagem, restauro de madeiras e móveis. Orgulhamo-nos de devolver vida e brilho a peças antigas, preservando a sua história e beleza original.
            </p>
            <p className="text-lg text-stone-700 leading-relaxed">
              Além do restauro, oferecemos serviços completos de <span className="font-semibold text-amber-700">pintura de interiores</span>, garantindo ambientes modernos, acolhedores e adaptados ao gosto de cada cliente.
            </p>
            <p className="text-lg text-stone-700 leading-relaxed">
              A nossa experiência estende-se ainda à <span className="font-semibold text-amber-700">carpintaria nova</span> para edifícios habitacionais, comerciais e industriais, onde desenvolvemos soluções à medida, desde portas e roupeiros a móveis personalizados, sempre com materiais de alta qualidade e acabamentos de excelência.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-amber-100">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 text-center mb-3">Rigor & Profissionalismo</h3>
            <p className="text-stone-600 text-center">
              Trabalhamos com atenção ao detalhe em cada projeto
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-amber-100">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 text-center mb-3">Qualidade Superior</h3>
            <p className="text-stone-600 text-center">
              Materiais de alta qualidade e acabamentos de excelência
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-amber-100">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 text-center mb-3">Equipa Experiente</h3>
            <p className="text-stone-600 text-center">
              Profissionais especializados e dedicados
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl font-light text-stone-800 italic">
            "Transformamos espaços e renovamos memórias"
          </p>
        </div>
      </div>
    </section>
  );
}
