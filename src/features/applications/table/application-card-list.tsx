import { Flex } from '@chakra-ui/react';
import type { ApplicationTableItem } from '../constants/applications-table-items.constants';
import { ApplicationCard } from '../components/application-card';

interface ApplicationCardListProps {
  applications: ApplicationTableItem[];
}

export function ApplicationCardList({
  applications,
}: ApplicationCardListProps) {
  return (
    <Flex
      flexDirection="column"
      gap="3"
      w="100%"
      px="4"
      py="4"
      overflowY="auto"
      maxH="70vh"
    >
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </Flex>
  );
}
