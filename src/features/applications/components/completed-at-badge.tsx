import { Flex, Icon, Text } from '@chakra-ui/react';
import { LuCircleCheck, LuCircleAlert } from 'react-icons/lu';

interface CompletedAtBadgeProps {
  completedAt: string;
  isApproved: boolean;
}

export const CompletedAtBadge: React.FC<CompletedAtBadgeProps> = ({
  completedAt,
  isApproved,
}) => {
  const icon = isApproved ? LuCircleCheck : LuCircleAlert;
  const color = isApproved ? 'green.600' : 'red.600';

  return (
    <Flex alignItems="center" gap="1.5">
      <Icon as={icon} color={color} boxSize={4} />
      <Text color={color} fontSize="md">
        {completedAt}
      </Text>
    </Flex>
  );
};
