import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import PageTransition from '@/components/PageTransition';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white">
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#d4af37]/20">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <img 
              src="https://cdn.poehali.dev/files/79b6351f-8026-4707-98d8-23fd1cba8968.png" 
              alt="Muse" 
              className="h-10 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate('/')}
            />
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              className="text-[#d4af37] hover:text-[#b8953d] hover:bg-[#d4af37]/10"
            >
              <Icon name="ArrowLeft" className="w-5 h-5 mr-2" />
              Назад
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#8b7355] mb-8">
            Пользовательское соглашение
          </h1>

          <div className="space-y-6 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">1. Общие положения</h2>
              <p>
                Настоящее Пользовательское соглашение (далее – Соглашение) регулирует отношения между владельцем клуба MUSE (далее – Клуб) и пользователем сайта.
              </p>
              <p className="mt-2">
                Используя сайт клуба MUSE, вы соглашаетесь с условиями данного Соглашения. Если вы не согласны с условиями, пожалуйста, не используйте сайт.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">2. Использование сайта</h2>
              <p>
                Сайт клуба MUSE предоставляет информацию о мероприятиях, экспертах и услугах клуба. Пользователь обязуется использовать сайт только в законных целях.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Не нарушать права других пользователей</li>
                <li>Не распространять вредоносное ПО</li>
                <li>Не использовать автоматизированные системы для сбора данных</li>
                <li>Предоставлять достоверную информацию при регистрации</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">3. Регистрация и личные данные</h2>
              <p>
                При регистрации на мероприятия или вступлении в клуб пользователь предоставляет персональные данные (имя, email, телефон, Telegram).
              </p>
              <p className="mt-2">
                Клуб обязуется обрабатывать персональные данные в соответствии с законодательством о защите персональных данных и не передавать их третьим лицам без согласия пользователя.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">4. Права и обязанности сторон</h2>
              <p className="font-semibold text-white">Клуб обязуется:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Предоставлять достоверную информацию о мероприятиях</li>
                <li>Обеспечивать конфиденциальность данных пользователей</li>
                <li>Своевременно информировать об изменениях в расписании</li>
              </ul>

              <p className="font-semibold text-white mt-4">Пользователь обязуется:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Предоставлять достоверные данные при регистрации</li>
                <li>Соблюдать правила клуба и этику поведения</li>
                <li>Своевременно сообщать об отмене участия в мероприятии</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">5. Ответственность</h2>
              <p>
                Клуб не несет ответственности за технические сбои, временную недоступность сайта или за действия третьих лиц.
              </p>
              <p className="mt-2">
                Пользователь несет полную ответственность за достоверность предоставленной информации и за свои действия на сайте.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">6. Интеллектуальная собственность</h2>
              <p>
                Все материалы сайта (тексты, изображения, видео, логотипы) являются интеллектуальной собственностью клуба MUSE и защищены авторским правом.
              </p>
              <p className="mt-2">
                Использование материалов сайта без письменного согласия владельца запрещено.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">7. Изменение условий</h2>
              <p>
                Клуб оставляет за собой право изменять условия данного Соглашения в любое время. Новая редакция вступает в силу с момента публикации на сайте.
              </p>
              <p className="mt-2">
                Продолжение использования сайта после внесения изменений означает согласие с новыми условиями.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#d4af37] mb-4">8. Контактная информация</h2>
              <p>
                По вопросам, связанным с данным Соглашением, вы можете связаться с нами через контактную форму на сайте или по указанным контактным данным.
              </p>
            </section>

            <div className="pt-8 mt-8 border-t border-[#d4af37]/20">
              <p className="text-sm text-white/60">
                Дата последнего обновления: 30 октября 2025 г.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Terms;
