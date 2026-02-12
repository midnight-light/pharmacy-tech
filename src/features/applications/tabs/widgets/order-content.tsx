import { memo } from 'react';
import { Flex } from '@chakra-ui/react';
import type { TabContentProps } from '../tabs.types';
import { ApplicationTableHeader } from '../../table/application-table-header';
import { ApplicationsTable } from '../../table/applications-table';
import { APPLICATIONS_TABLE_ITEMS } from '../../constants/applications-table-items.constants';

export const OrdersContent = memo(({ className }: TabContentProps) => {
  return (
    <Flex
      className={className}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
    >
      <ApplicationTableHeader />
      <ApplicationsTable applications={APPLICATIONS_TABLE_ITEMS} />
    </Flex>
  );
});

OrdersContent.displayName = 'OrdersContent';
