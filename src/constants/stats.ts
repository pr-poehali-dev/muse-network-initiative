export interface Stat {
  label: string;
  value: number;
  description: string;
  icon: string;
}

export const stats: Stat[] = [
  {
    label: 'Участниц',
    value: 250,
    description: 'Успешные женщины из разных сфер',
    icon: 'Users'
  },
  {
    label: 'Проведённых встреч',
    value: 50,
    description: 'Нетворкинг и обмен опытом',
    icon: 'Calendar'
  },
  {
    label: 'Онлайн-трансляций в год',
    value: 24,
    description: 'Доступ из любой точки мира',
    icon: 'Radio'
  }
];
