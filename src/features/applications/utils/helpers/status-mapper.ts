import {
  ApplicationStatus,
  type ApplicationTableItem,
} from '../../constants/applications-table-items.constants';

type ApplicationStatusType = ApplicationTableItem['status'];

export interface StatusConfig {
  value: ApplicationStatusType;
  colorPalette: string;
}

export const STATUS_CONFIG_MAP: Record<ApplicationStatusType, StatusConfig> = {
  [ApplicationStatus.NEW]: {
    value: ApplicationStatus.NEW,
    colorPalette: 'purple',
  },
  [ApplicationStatus.IN_PROGRESS]: {
    value: ApplicationStatus.IN_PROGRESS,
    colorPalette: 'yellow',
  },
  [ApplicationStatus.COMPLETED]: {
    value: ApplicationStatus.COMPLETED,
    colorPalette: 'green',
  },
  [ApplicationStatus.CANCELLED]: {
    value: ApplicationStatus.CANCELLED,
    colorPalette: 'gray',
  },
  [ApplicationStatus.CLOSED]: {
    value: ApplicationStatus.CLOSED,
    colorPalette: 'gray',
  },
};
