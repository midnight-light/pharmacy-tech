import { Flex, Icon, Text } from '@chakra-ui/react';
import { LuCircleCheck, LuClock } from 'react-icons/lu';

interface ResolutionTimeBadgeProps {
  resolutionTime: string;
  isCompleted?: boolean;
}

export const ResolutionTimeBadge: React.FC<ResolutionTimeBadgeProps> = ({
  resolutionTime,
  isCompleted = false,
}) => {
  const icon = isCompleted ? LuCircleCheck : LuClock;
  const color = isCompleted ? 'green.600' : undefined;

  return (
    <Flex alignItems="center" gap="1.5">
      <Icon as={icon} color={color} boxSize={4} />
      <Text color={color} fontSize="md">
        {resolutionTime}
      </Text>
    </Flex>
  );
};
