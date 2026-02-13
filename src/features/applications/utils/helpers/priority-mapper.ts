import type { IconType } from 'react-icons';
import {
  LuChevronsUp,
  LuChevronUp,
  LuDiamond,
  LuChevronDown,
} from 'react-icons/lu';
import {
  ApplicationPriority,
  type ApplicationPriorityType,
} from '../../constants/applications-table-items.constants';

export interface PriorityConfig {
  value: ApplicationPriorityType;
  label: string;
  icon: IconType;
  color: string;
  iconProps?: Record<string, unknown>;
}

/**
 * @description Unified priority configuration map
 * Single source of truth for priority visual representation
 */
export const PRIORITY_CONFIG_MAP: Record<
  ApplicationPriorityType,
  PriorityConfig
> = {
  [ApplicationPriority.CRITICAL]: {
    value: ApplicationPriority.CRITICAL,
    label: 'Критический',
    icon: LuChevronsUp,
    color: 'red.600',
  },
  [ApplicationPriority.HIGH]: {
    value: ApplicationPriority.HIGH,
    label: 'Высокий',
    icon: LuChevronUp,
    color: 'yellow.500',
  },
  [ApplicationPriority.MEDIUM]: {
    value: ApplicationPriority.MEDIUM,
    label: 'Средний',
    icon: LuDiamond,
    color: 'yellow.600',
    iconProps: { boxSize: 6, paddingLeft: '1', strokeWidth: 1 },
  },
  [ApplicationPriority.LOW]: {
    value: ApplicationPriority.LOW,
    label: 'Низкий',
    icon: LuChevronDown,
    color: 'blue.500',
  },
};

export const PRIORITY_LIST = Object.values(PRIORITY_CONFIG_MAP);
