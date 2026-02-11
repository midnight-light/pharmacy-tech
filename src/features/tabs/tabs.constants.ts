import { TabEnum, type TabItem } from './tabs.types';

export const TABS_CONFIG: readonly TabItem[] = [
  {
    value: TabEnum.ORDERS,
    label: 'Заявки',
  },
  {
    value: TabEnum.REPORTS,
    label: 'Отчеты',
  },
  {
    value: TabEnum.REFERENCE,
    label: 'Справочник',
  },
] as const;
