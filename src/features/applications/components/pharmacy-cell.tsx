import { Badge, Flex, Text } from '@chakra-ui/react';
import type { PharmacyItem } from '../constants/applications-table-items.constants';

interface PharmacyCellProps {
  pharmacy: PharmacyItem;
}

export const PharmacyCell: React.FC<PharmacyCellProps> = ({ pharmacy }) => {
  return (
    <Flex alignItems="center" gap="2">
      <Badge variant="subtle" size="lg">
        <Text fontWeight="bold">{pharmacy.id}</Text>
      </Badge>
      <Text>{pharmacy.location}</Text>
    </Flex>
  );
};
