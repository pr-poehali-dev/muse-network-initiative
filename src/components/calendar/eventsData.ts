import { Event } from './types';

export const events: Event[] = [
  {
    id: 1,
    title: 'Встреча клуба: Искусство переговоров',
    date: '2025-11-05',
    time: '18:00',
    description: 'Панельная дискуссия с участием успешных предпринимательниц о стратегиях эффективных переговоров в бизнесе',
    type: 'offline',
    location: 'Конференц-зал "Империал"',
    seats: 45,
    speakers: [
      {
        name: 'Карина Ляшева',
        role: 'Эксперт гастрономического искусства',
        image: 'https://cdn.poehali.dev/files/aa430451-7e67-4a2d-b073-2c8fc22f6d71.jpg'
      },
      {
        name: 'Екатерина Кузнецова',
        role: 'Директор ТИЦ Архангельской области',
        image: 'https://cdn.poehali.dev/files/f4f78af3-467b-4528-ac10-d085a6eeb04b.jpg'
      }
    ]
  },
  {
    id: 2,
    title: 'Онлайн-трансляция: Женское лидерство',
    date: '2025-11-12',
    time: '19:00',
    description: 'Живой эфир с обсуждением современных вызовов и возможностей для женщин-лидеров',
    type: 'online',
    location: 'Zoom',
    speakers: [
      {
        name: 'Мария Лазарева',
        role: 'Психолог, психотерапевт',
        image: 'https://cdn.poehali.dev/files/72395041-bb4b-429d-9521-807b2d0e1281.jpg'
      }
    ]
  },
  {
    id: 3,
    title: 'Творческий вечер: Живопись и вино',
    date: '2025-11-18',
    time: '17:00',
    description: 'Мастер-класс по живописи в камерной атмосфере с профессиональным художником',
    type: 'workshop',
    location: 'Арт-студия "Муза"',
    seats: 20,
    speakers: [
      {
        name: 'Людмила Мерзлая',
        role: 'Художница',
        image: 'https://cdn.poehali.dev/files/d43f8002-32ee-4d33-b31a-1522584b8d7a.jpg'
      }
    ]
  },
  {
    id: 4,
    title: 'Встреча с гостем: Стиль и имидж',
    date: '2025-11-22',
    time: '18:30',
    description: 'Эксперт по стилю расскажет о создании личного бренда через имидж',
    type: 'guest',
    location: 'Бизнес-лаундж Muse',
    seats: 30,
    speakers: [
      {
        name: 'Юлия Самсонова',
        role: 'Стилист',
        image: 'https://cdn.poehali.dev/files/37231f0d-7f2c-44ec-a259-688241e59545.jpg'
      },
      {
        name: 'Юлия Христенко',
        role: 'Дизайнер бренда JK',
        image: 'https://cdn.poehali.dev/files/11ada638-a634-464f-bc5e-2fabbfbc56ed.jpg'
      }
    ]
  },
  {
    id: 5,
    title: 'Онлайн встреча: Баланс жизни',
    date: '2025-11-26',
    time: '20:00',
    description: 'Обсуждение практик work-life balance с экспертом здорового образа жизни',
    type: 'online',
    location: 'Zoom',
    speakers: [
      {
        name: 'Тамара Мазмишаили',
        role: 'Фитнес тренер',
        image: 'https://cdn.poehali.dev/files/7fa24823-78a5-4550-8937-8659f6f2fb59.jpg'
      }
    ]
  },
  {
    id: 6,
    title: 'Декабрьская встреча: Итоги года',
    date: '2025-12-03',
    time: '18:00',
    description: 'Праздничная встреча клуба с подведением итогов года и планированием на будущее',
    type: 'offline',
    location: 'Ресторан "Золотой век"',
    seats: 60,
    speakers: [
      {
        name: 'Карина Ляшева',
        role: 'Основательница клуба Muse',
        image: 'https://cdn.poehali.dev/files/aa430451-7e67-4a2d-b073-2c8fc22f6d71.jpg'
      },
      {
        name: 'Полина Берг',
        role: 'Мастер исторического костюма',
        image: 'https://cdn.poehali.dev/files/ac72f595-012b-4bb4-9f27-b198576f5ed4.jpg'
      }
    ]
  }
];