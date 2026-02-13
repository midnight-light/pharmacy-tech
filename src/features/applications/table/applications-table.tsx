import {
  APPLICATIONS_TABLE_HEADERS,
  type ApplicationTableItem,
} from '../constants/applications-table-items.constants';
import { Flex, Table } from '@chakra-ui/react';
import { PriorityBadge } from '../components/priority-badge';
import { StatusBadge } from '../components/status-badge';
import { CompletedAtBadge } from '../components/completed-at-badge';
import { ResolutionTimeBadge } from '../components/resolution-time-badge';
import { FormattedDate } from '../components/formatted-date';
import { PharmacyCell } from '../components/pharmacy-cell';

interface ApplicationsTableProps {
  applications: ApplicationTableItem[];
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const headers = APPLICATIONS_TABLE_HEADERS;

  return (
    <Table.ScrollArea
      borderWidth="1px"
      maxW="100%"
      paddingY="8"
      w="full"
      paddingX="10"
      maxH="70vh"
      overflowY="auto"
    >
      <Table.Root variant="outline">
        <Table.Header>
          <Table.Row>
            {headers.map((header) => (
              <Table.ColumnHeader key={header.key} maxW="8rem">
                {header.label}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {applications.map((application: ApplicationTableItem) => (
            <Table.Row key={application.id}>
              <Table.Cell>{application.id}</Table.Cell>
              <Table.Cell>
                <PharmacyCell pharmacy={application.pharmacy} />
              </Table.Cell>
              <Table.Cell>
                <Flex alignItems="center" gap="1">
                  <FormattedDate dateTime={application.createdAt} />
                </Flex>
              </Table.Cell>
              <Table.Cell textAlign="left" justifyContent="flex-start">
                <PriorityBadge priority={application.priority} />
              </Table.Cell>
              <Table.Cell>{application.title}</Table.Cell>
              <Table.Cell>{application.category}</Table.Cell>
              <Table.Cell>{application.techSupport}</Table.Cell>
              <Table.Cell>
                <ResolutionTimeBadge
                  resolutionTime={application.resolutionTime}
                  isCompleted={application.completedAt !== null}
                />
              </Table.Cell>
              <Table.Cell textAlign="center">
                {application.completedAt ? (
                  <CompletedAtBadge
                    completedAt={application.completedAt}
                    isApproved={application.isApproved}
                  />
                ) : (
                  '-'
                )}
              </Table.Cell>
              <Table.Cell>
                <StatusBadge status={application.status} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
