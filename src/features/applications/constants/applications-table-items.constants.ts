export interface PharmacyItem {
  id: string;
  location: string;
}

export const ApplicationPriority = {
  CRITICAL: 'Критич.',
  HIGH: 'Высокий',
  MEDIUM: 'Средний',
  LOW: 'Низкий',
} as const;

export const ApplicationStatus = {
  NEW: 'Новая',
  IN_PROGRESS: 'В работе',
  COMPLETED: 'Готово',
  CANCELLED: 'Отменено',
  CLOSED: 'Закрыто',
} as const;

export type ApplicationPriorityType =
  (typeof ApplicationPriority)[keyof typeof ApplicationPriority];

export interface ApplicationTableItem {
  id: string;
  pharmacy: PharmacyItem;
  createdAt: string;
  priority: ApplicationPriorityType;
  title: string;
  category: string;
  techSupport: string | null;
  resolutionTime: string;
  completedAt: string | null;
  isApproved: boolean;
  status: (typeof ApplicationStatus)[keyof typeof ApplicationStatus];
}

export const APPLICATIONS_TABLE_HEADERS = [
  {
    label: '№',
    key: 'id',
  },
  {
    label: 'Аптека',
    key: 'pharmacy.location',
  },
  {
    label: 'Создана',
    key: 'createdAt',
  },
  {
    label: 'Приоритет',
    key: 'priority',
  },
  {
    label: 'Тема',
    key: 'title',
  },
  {
    label: 'Категория',
    key: 'category',
  },
  {
    label: 'Техник',
    key: 'techSupport',
  },
  {
    label: 'Реакция',
    key: 'resolutionTime',
  },
  {
    label: 'Решение',
    key: 'completedAt',
  },
  {
    label: 'Статус',
    key: 'status',
  },
] as const;

export const APPLICATIONS_TABLE_ITEMS: ApplicationTableItem[] = [
  {
    id: 'КС-0002',
    pharmacy: {
      id: '065',
      location: 'Островского 7',
    },
    createdAt: '20.07.2025T12:35:45',
    priority: ApplicationPriority.CRITICAL,
    title: 'Поломка кассы',
    category: 'Кассы',
    techSupport: null,
    resolutionTime: '02:48',
    completedAt: null,
    isApproved: false,
    status: ApplicationStatus.NEW,
  },

  {
    id: 'ХЛ-0002',
    pharmacy: {
      id: '150',
      location: 'Кореновск Красная 108',
    },
    createdAt: '20.07.2025T12:35:45',
    priority: ApplicationPriority.MEDIUM,
    title: 'Холодильник сильно гудит',
    category: 'Холодильники',
    techSupport: 'Федоровский Н.',
    resolutionTime: '05:01',
    completedAt: '01:35:34',
    isApproved: true,
    status: ApplicationStatus.IN_PROGRESS,
  },
  {
    id: 'КН-0002',
    pharmacy: {
      id: '045',
      location: 'Тимашевск Интернац 3Б',
    },
    createdAt: '20.07.2025T12:35:45',
    priority: ApplicationPriority.LOW,
    title: 'Конденсат на внутреннем блоке',
    category: 'Кондиционеры',
    techSupport: 'Максимов П.',
    resolutionTime: '05:01',
    completedAt: '02:30:17',
    isApproved: true,
    status: ApplicationStatus.COMPLETED,
  },
  {
    id: 'ИЗ-0002',
    pharmacy: {
      id: '164',
      location: 'РнД Сельмаш 92',
    },
    createdAt: '20.07.2025T12:35:45',
    priority: ApplicationPriority.CRITICAL,
    title: 'Нужно поверить гигрометр',
    category: 'Изм. оборуд.',
    techSupport: 'Алексеев М.',
    resolutionTime: '05:01',
    completedAt: '02:30:17',
    isApproved: true,
    status: ApplicationStatus.COMPLETED,
  },
  {
    id: 'ПО-0002',
    pharmacy: {
      id: '190',
      location: 'Геленджик Душистая 24',
    },
    createdAt: '20.07.2025T12:35:45',
    priority: ApplicationPriority.HIGH,
    title: 'Заметили крыс у входа',
    category: 'Помещения',
    techSupport: 'Сидоров Е.',
    resolutionTime: '05:01',
    completedAt: '02:30:17',
    isApproved: true,
    status: ApplicationStatus.CLOSED,
  },
  {
    id: 'ИТ-0002',
    pharmacy: {
      id: '267',
      location: 'Анапа Парковая 67к2',
    },
    createdAt: '20.07.2025T12:35:45',
    priority: ApplicationPriority.HIGH,
    title: 'Нужен новый компьютер',
    category: 'ИТ',
    techSupport: 'Китов Я.',
    resolutionTime: '05:01',
    completedAt: '02:30:17',
    isApproved: true,
    status: ApplicationStatus.CLOSED,
  },
  {
    id: 'СА-0002',
    pharmacy: {
      id: '150',
      location: 'Кореновск Красная 108',
    },
    createdAt: '20.07.2025T12:35:45',
    priority: ApplicationPriority.MEDIUM,
    title: 'Унитаз перестал смывать',
    category: 'Сантехника',
    techSupport: 'Малахов Н.',
    resolutionTime: '05:01',
    completedAt: '02:30:17',
    isApproved: false,
    status: ApplicationStatus.COMPLETED,
  },
];
