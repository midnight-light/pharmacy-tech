import { Badge } from '@chakra-ui/react';
import { STATUS_CONFIG_MAP } from '../utils/helpers/status-mapper';
import type { ApplicationTableItem } from '../constants/applications-table-items.constants';

interface StatusBadgeProps {
  status: ApplicationTableItem['status'];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = STATUS_CONFIG_MAP[status];

  return (
    <Badge colorPalette={config.colorPalette} variant="subtle" size="lg">
      {status}
    </Badge>
  );
};
