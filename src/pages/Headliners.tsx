import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Headliners = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/files/19ea472f-0e08-4164-80c5-ca52c6927fd6.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
        </div>

        <div className="relative h-full flex flex-col">
          <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <Button
                  onClick={() => navigate('/')}
                  variant="ghost"
                  className="text-white hover:text-[#d4af37] transition-colors"
                >
                  <Icon name="ArrowLeft" size={20} className="mr-2" />
                  На главную
                </Button>
                <div className="text-sm text-white/60">Хедлайнеры</div>
              </div>
            </div>
          </header>

          <div className="flex-1 flex items-center justify-center px-6">
            <div className="max-w-5xl w-full text-center space-y-8">
              <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#8b7355]/20 border border-[#d4af37]/30 mb-4">
                <span className="text-[#d4af37] font-semibold">Хедлайнер события</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#d4af37] via-white to-[#d4af37] bg-clip-text text-transparent">
                  Как помогаем бизнесу находить Лиды
                </span>
              </h1>

              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

              <div className="space-y-4 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Юлия Викторова
                </h2>
                <p className="text-xl md:text-2xl text-[#d4af37]">
                  Директор по цифровому маркетингу
                </p>
                <div className="flex items-center justify-center gap-3 text-white/80">
                  <img 
                    src="https://cdn.poehali.dev/files/8f2f3fdc-63e8-4204-96d7-dfb5659ba108.png" 
                    alt="Digital Agency albe" 
                    className="h-12 w-12 object-contain"
                  />
                  <span className="text-lg">Digital Agency albe</span>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold px-8 py-6 text-lg rounded-full shadow-2xl shadow-[#d4af37]/20 transition-all hover:scale-105"
                >
                  Зарегистрироваться на событие
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <Icon name="ChevronDown" size={32} className="text-[#d4af37]" />
          </div>
        </div>
      </div>

      <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              О выступлении
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-white/10 hover:border-[#d4af37]/30 transition-all hover:scale-105">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-4 mx-auto">
                  <Icon name="Target" className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h4 className="text-xl font-bold text-center mb-2 text-white">Стратегии лидогенерации</h4>
                <p className="text-white/60 text-center">Эффективные методы привлечения клиентов</p>
              </div>

              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-white/10 hover:border-[#d4af37]/30 transition-all hover:scale-105">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-4 mx-auto">
                  <Icon name="TrendingUp" className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h4 className="text-xl font-bold text-center mb-2 text-white">Реальные кейсы</h4>
                <p className="text-white/60 text-center">Примеры успешных проектов</p>
              </div>

              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-white/10 hover:border-[#d4af37]/30 transition-all hover:scale-105">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-4 mx-auto">
                  <Icon name="Rocket" className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h4 className="text-xl font-bold text-center mb-2 text-white">Практические инструменты</h4>
                <p className="text-white/60 text-center">Готовые решения для вашего бизнеса</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-80 rounded-2xl overflow-hidden group">
                <img 
                  src="https://cdn.poehali.dev/files/cd862309-52b4-4597-a125-64f4cd167b55.jpg"
                  alt="Юлия Викторова"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              <div className="relative h-80 rounded-2xl overflow-hidden group">
                <img 
                  src="https://cdn.poehali.dev/files/db81dd5d-ecc0-433f-a5ba-4e3072c571cb.jpg"
                  alt="Юлия Викторова"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-950">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Что вы узнаете
          </h3>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              'Как настроить воронку продаж для максимальной конверсии',
              'Секреты работы с холодной аудиторией',
              'Инструменты автоматизации лидогенерации',
              'Анализ эффективности рекламных кампаний',
              'Построение системы постоянного потока клиентов'
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl border border-white/10 hover:border-[#d4af37]/30 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b7355] flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="Check" className="w-5 h-5 text-black" />
                </div>
                <p className="text-lg text-white text-left">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold px-10 py-6 text-lg rounded-full shadow-2xl shadow-[#d4af37]/20 transition-all hover:scale-105"
            >
              Присоединиться к событию
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-neutral-950 to-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-2xl p-12 border border-[#d4af37]/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://cdn.poehali.dev/files/e501d365-c5a3-4d4b-aa9c-ffefddb14a4a.jpg"
                  alt="Юлия Викторова"
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">О спикере</h3>
                <p className="text-white/80 leading-relaxed">
                  Юлия Викторова — опытный специалист в области цифрового маркетинга с более чем 10-летним опытом работы. 
                  Директор по цифровому маркетингу в Digital Agency albe.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Помогла десяткам компаний построить эффективные системы привлечения клиентов и увеличить продажи в 3-5 раз.
                </p>
                <div className="pt-4">
                  <img 
                    src="https://cdn.poehali.dev/files/8f2f3fdc-63e8-4204-96d7-dfb5659ba108.png"
                    alt="Digital Agency albe"
                    className="h-16 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Headliners;
