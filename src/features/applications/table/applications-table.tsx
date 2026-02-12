import { useCallback } from 'react';
import {
  ApplicationPriority,
  APPLICATIONS_TABLE_HEADERS,
  ApplicationStatus,
  type ApplicationTableItem,
  type PharmacyItem,
} from '../constants/applications-table-items.constants';
import { Badge, Flex, Icon, Table, Text } from '@chakra-ui/react';
import {
  LuCircleAlert,
  LuCircleCheck,
  LuDiamond,
  LuChevronsUp,
  LuChevronUp,
  LuChevronDown,
} from 'react-icons/lu';
import { LuClock } from 'react-icons/lu';

interface ApplicationsTableProps {
  applications: ApplicationTableItem[];
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const headers = APPLICATIONS_TABLE_HEADERS;

  const getStatus = useCallback(
    (status: (typeof ApplicationStatus)[keyof typeof ApplicationStatus]) => {
      switch (status) {
        case ApplicationStatus.NEW:
          return (
            <Badge colorPalette="purple" variant="subtle" size="lg">
              {status}
            </Badge>
          );
        case ApplicationStatus.IN_PROGRESS:
          return (
            <Badge colorPalette="yellow" variant="subtle" size="lg">
              {status}
            </Badge>
          );
        case ApplicationStatus.COMPLETED:
          return (
            <Badge colorPalette="green" variant="subtle" size="lg">
              {status}
            </Badge>
          );
      }
      return (
        <Badge colorPalette="gray" variant="subtle" size="lg">
          {status}
        </Badge>
      );
    },
    [],
  );

  const getPriority = useCallback(
    (
      priority: (typeof ApplicationPriority)[keyof typeof ApplicationPriority],
    ) => {
      switch (priority) {
        case ApplicationPriority.CRITICAL:
          return (
            <Flex alignItems="center" justifyContent="flex-start" gap="1">
              <Icon as={LuChevronsUp} color="red.600" boxSize={7} />
              <Text color="gray.400">{priority}</Text>
            </Flex>
          );
        case ApplicationPriority.HIGH:
          return (
            <Flex alignItems="center" justifyContent="flex-start" gap="1">
              <Icon as={LuChevronUp} color="yellow.500" boxSize={7} />
              <Text color="gray.400">{priority}</Text>
            </Flex>
          );
        case ApplicationPriority.MEDIUM:
          return (
            <Flex alignItems="center" justifyContent="flex-start" gap="1">
              <Icon
                as={LuDiamond}
                color="yellow.600"
                boxSize={6}
                paddingLeft="1"
                strokeWidth={1}
              />
              <Text color="gray.400">{priority}</Text>
            </Flex>
          );
        case ApplicationPriority.LOW:
          return (
            <Flex alignItems="center" justifyContent="flex-start" gap="1">
              <Icon as={LuChevronDown} color="blue.500" boxSize={7} />
              <Text color="gray.400">{priority}</Text>
            </Flex>
          );
      }
    },
    [],
  );

  const getResolutionTime = useCallback(
    (resolutionTime: string, isCompleted: boolean = false) => {
      if (isCompleted) {
        return (
          <Flex alignItems="center" gap="1.5">
            <Icon as={LuCircleCheck} color="green.600" boxSize={4} />
            <Text color="green.600" fontSize="md">
              {resolutionTime}
            </Text>
          </Flex>
        );
      }

      return (
        <Flex alignItems="center" gap="1.5">
          <Icon as={LuClock} boxSize={4} />
          <Text fontSize="md">{resolutionTime}</Text>;
        </Flex>
      );
    },
    [],
  );

  const getCompletedAt = useCallback(
    (completedAt: string, isApproved: boolean) => {
      if (isApproved) {
        return (
          <Flex alignItems="center" gap="1.5">
            <Icon as={LuCircleCheck} color="green.600" boxSize={4} />
            <Text color="green.600" fontSize="md">
              {completedAt}
            </Text>
          </Flex>
        );
      }
      return (
        <Flex alignItems="center" gap="1.5">
          <Icon as={LuCircleAlert} color="red.600" boxSize={4} />
          <Text color="red.600" fontSize="md">
            {completedAt}
          </Text>
        </Flex>
      );
    },
    [],
  );

  const formatCreatedAt = useCallback((createdAt: string) => {
    const [date, time] = createdAt.split('T');
    return (
      <Flex alignItems="center" gap="1">
        <Text>{date}</Text>
        <Text color="gray.400">{time}</Text>
      </Flex>
    );
  }, []);

  const formatedPharmacy = useCallback((pharmacy: PharmacyItem) => {
    return (
      <Flex alignItems="center" gap="2">
        <Badge variant="subtle" size="lg">
          <Text fontWeight="bold">{pharmacy.id}</Text>
        </Badge>
        <Text>{pharmacy.location}</Text>
      </Flex>
    );
  }, []);

  return (
    <Table.ScrollArea
      borderWidth="1px"
      maxW="100%"
      paddingY="8"
      w="full"
      paddingX="10"
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
              <Table.Cell>{formatedPharmacy(application.pharmacy)}</Table.Cell>
              <Table.Cell>
                <Flex alignItems="center" gap="1">
                  {formatCreatedAt(application.createdAt)}
                </Flex>
              </Table.Cell>
              <Table.Cell textAlign="left" justifyContent="flex-start">
                {getPriority(application.priority)}
              </Table.Cell>
              <Table.Cell>{application.title}</Table.Cell>
              <Table.Cell>{application.category}</Table.Cell>
              <Table.Cell>{application.techSupport}</Table.Cell>
              <Table.Cell>
                {getResolutionTime(
                  application.resolutionTime,
                  application.completedAt !== null,
                )}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {application.completedAt
                  ? getCompletedAt(
                      application.completedAt,
                      application.isApproved,
                    )
                  : '-'}
              </Table.Cell>
              <Table.Cell>{getStatus(application.status)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
