import { memo } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import type { TabContentProps } from '../tabs.types';

export const OrdersContent = memo(({ className }: TabContentProps) => {
  return (
    <Box className={className} p={6}>
      <Heading size="lg" mb={4}>
        Заявки
      </Heading>
      <Text color="gray.600">Здесь будет список заявок и их управление</Text>
    </Box>
  );
});

OrdersContent.displayName = 'OrdersContent';
