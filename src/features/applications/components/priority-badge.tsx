import { Flex, Icon, Text } from '@chakra-ui/react';
import { PRIORITY_CONFIG_MAP } from '../utils/helpers/priority-mapper';
import type { ApplicationPriorityType } from '../constants/applications-table-items.constants';

interface PriorityBadgeProps {
  priority: ApplicationPriorityType;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const config = PRIORITY_CONFIG_MAP[priority];

  return (
    <Flex alignItems="center" justifyContent="flex-start" gap="1">
      <Icon
        as={config.icon}
        color={config.color}
        boxSize={7}
        {...config.iconProps}
      />
      <Text color="gray.400">{priority}</Text>
    </Flex>
  );
};
