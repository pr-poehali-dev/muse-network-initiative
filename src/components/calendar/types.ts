export interface Speaker {
  name: string;
  role: string;
  image: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  type: 'offline' | 'online' | 'workshop' | 'guest';
  location: string;
  seats?: number;
  speakers: Speaker[];
}

export interface EventTypeConfig {
  icon: string;
  color: string;
  badge: string;
  label: string;
}
