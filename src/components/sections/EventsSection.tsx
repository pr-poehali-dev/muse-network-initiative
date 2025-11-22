import { Suspense, lazy, FormEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const EventsCalendar = lazy(() => import('@/components/EventsCalendar'));
const EventRegistrationDialog = lazy(() => import('@/components/dialogs/EventRegistrationDialog'));

interface EventsSectionProps {
  eventsContent: {
    title: string;
    subtitle: string;
    formats_title: string;
    formats: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  isEventDialogOpen: boolean;
  setIsEventDialogOpen: (value: boolean) => void;
  eventFormData: {
    name: string;
    email: string;
    phone: string;
    telegram: string;
    event: string;
    message: string;
  };
  setEventFormData: (data: any) => void;
  handleEventFormSubmit: (e: FormEvent) => Promise<void>;
  isEventFormSubmitted: boolean;
  isEventFormSubmitting: boolean;
  handleEventRegister: (eventTitle: string) => void;
  calendarAutoExpand: boolean;
  eventsRefreshTrigger: number;
}

const EventsSection = ({
  eventsContent,
  isEventDialogOpen,
  setIsEventDialogOpen,
  eventFormData,
  setEventFormData,
  handleEventFormSubmit,
  isEventFormSubmitted,
  isEventFormSubmitting,
  handleEventRegister,
  calendarAutoExpand,
  eventsRefreshTrigger
}: EventsSectionProps) => {
  return (
    <>
      <section id="events" className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
        <div className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 premium-title flex items-center justify-center gap-4">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]"></span>
              {eventsContent.title || 'События и встречи'}
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]"></span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {eventsContent.subtitle || 'Разнообразные форматы для вашего роста и вдохновения'}
            </p>
          </div>

          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 mb-4">{eventsContent.formats_title || 'Форматы событий'}</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {eventsContent.formats.map((event: any, index: number) => (
              <Card key={index} className={`hover-scale glow-effect border border-[#d4af37]/30 rounded-2xl ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'} relative overflow-hidden group bg-[#1a1a1a]/80 backdrop-blur-md`} style={{animationDelay: `${index * 0.15}s`}}>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 flex-shrink-0">
                      <Icon name={event.icon} className="text-[#b8953d]/60" size={24} />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 pt-2">{event.title}</h4>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-4 font-medium">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div id="calendar">
            <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div></div>}>
              <EventsCalendar 
                onEventRegister={handleEventRegister} 
                autoExpand={calendarAutoExpand}
                refreshTrigger={eventsRefreshTrigger}
              />
            </Suspense>
          </div>
        </div>
      </section>

      {isEventDialogOpen && (
        <Suspense fallback={null}>
          <EventRegistrationDialog
            isOpen={isEventDialogOpen}
            onClose={() => setIsEventDialogOpen(false)}
            formData={eventFormData}
            onFormDataChange={setEventFormData}
            onSubmit={handleEventFormSubmit}
            isSubmitted={isEventFormSubmitted}
            isSubmitting={isEventFormSubmitting}
          />
        </Suspense>
      )}
    </>
  );
};

export default EventsSection;
