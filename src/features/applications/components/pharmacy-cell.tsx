import { Badge, Flex, Text } from '@chakra-ui/react';
import type { PharmacyItem } from '../constants/applications-table-items.constants';

interface PharmacyCellProps {
  pharmacy: PharmacyItem;
}

export const PharmacyCell: React.FC<PharmacyCellProps> = ({ pharmacy }) => {
  return (
    <Flex alignItems="center" gap="2">
      <Badge variant="subtle" size="lg" display={{ base: 'none', md: 'block' }}>
        <Text fontWeight="bold">{pharmacy.id}</Text>
      </Badge>
      <Text
        fontSize={{ base: 'xs', md: 'md' }}
        color={{ base: 'gray.400', md: 'gray.700' }}
      >
        {pharmacy.location}
      </Text>
    </Flex>
  );
};
