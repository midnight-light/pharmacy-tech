import { memo } from 'react';
import { Flex, Text, Card, Grid, GridItem, Badge } from '@chakra-ui/react';
import type { ApplicationTableItem } from '../constants/applications-table-items.constants';
import { PriorityBadge } from './priority-badge';
import { StatusBadge } from './status-badge';
import { CompletedAtBadge } from './completed-at-badge';
import { PharmacyCell } from './pharmacy-cell';

interface ApplicationCardProps {
  application: ApplicationTableItem;
}

export const ApplicationCard = memo(({ application }: ApplicationCardProps) => {
  return (
    <Card.Root variant="outline" w="100%">
      <Card.Body gap="3" p="4">
        <Grid templateColumns="repeat(3, 1fr)" gap="2">
          <GridItem colSpan={2} rowSpan={2}>
            <Text fontSize="md">{application.title}</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Flex gap="2" alignItems="center" justifyContent="flex-end">
              <PriorityBadge priority={application.priority} />
              <StatusBadge status={application.status} />
            </Flex>
          </GridItem>
          <GridItem colSpan={2} rowSpan={2}>
            <Flex justifyContent="flex-start" alignItems="center" gap="2">
              <Badge variant="subtle" size="lg">
                {application.id}
              </Badge>
              <PharmacyCell pharmacy={application.pharmacy} />
            </Flex>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} textAlign="right">
            <Flex justifyContent="flex-end" alignItems="center">
              {application.completedAt ? (
                <CompletedAtBadge
                  completedAt={application.completedAt}
                  isApproved={application.isApproved}
                />
              ) : (
                '-'
              )}
            </Flex>
          </GridItem>
        </Grid>
      </Card.Body>
    </Card.Root>
  );
});

ApplicationCard.displayName = 'ApplicationCard';
