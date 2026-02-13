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

import { useIsMobile } from '../../../../hooks/use-is-mobile';
import { ApplicationCardList } from '../../table/application-card-list';

export const ApplicationsContent = memo(({ className }: TabContentProps) => {
  const { onClose, onToggle, isOpen } = useApplicationModal();

  const isMobile = useIsMobile();

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
      {isMobile ? (
        <ApplicationCardList applications={applications} />
      ) : (
        <ApplicationsTable applications={applications} />
      )}
      <CreateApplicationModal
        open={isOpen}
        onClose={onClose}
        onSuccess={handleApplicationCreated}
      />
    </Flex>
  );
});

ApplicationsContent.displayName = 'ApplicationsContent';
