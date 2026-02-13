import { memo, useCallback } from 'react';
import { Flex } from '@chakra-ui/react';
import type { TabContentProps } from '../tabs.types';
import { ApplicationTableHeader } from '../../table/application-table-header';
import { ApplicationsTable } from '../../table/applications-table';
import { type ApplicationTableItem } from '../../constants/applications-table-items.constants';
import { useApplicationModal } from '../../hooks/use-application-modal';
import { CreateApplicationModal } from '../../components/create-application-modal';
import {
  selectAddApplication,
  selectApplications,
  useApplicationsStore,
} from '../../stores/applications.store';

export const OrdersContent = memo(({ className }: TabContentProps) => {
  const { onClose, onToggle, isOpen } = useApplicationModal();

  const applications = useApplicationsStore(selectApplications);

  const addApplication = useApplicationsStore(selectAddApplication);

  const handleApplicationCreated = useCallback(
    (application: ApplicationTableItem) => {
      addApplication(application);
    },
    [addApplication],
  );

  return (
    <Flex
      className={className}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
    >
      <ApplicationTableHeader onCreateApplication={onToggle} />
      <ApplicationsTable applications={applications} />
      <CreateApplicationModal
        open={isOpen}
        onClose={onClose}
        onSuccess={handleApplicationCreated}
      />
    </Flex>
  );
});

OrdersContent.displayName = 'OrdersContent';
