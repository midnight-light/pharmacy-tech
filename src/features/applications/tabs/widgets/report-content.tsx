import { memo } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import type { TabContentProps } from '../tabs.types';

export const ReportsContent = memo(({ className }: TabContentProps) => {
  return (
    <Box className={className} p={6}>
      <Heading size="lg" mb={4}>
        Отчеты
      </Heading>
      <Text color="gray.600">Здесь будут отчеты и аналитика</Text>
    </Box>
  );
});

ReportsContent.displayName = 'ReportsContent';
