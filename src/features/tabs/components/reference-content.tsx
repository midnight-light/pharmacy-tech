import { memo } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import type { TabContentProps } from '../tabs.types';

export const ReferenceContent = memo(({ className }: TabContentProps) => {
  return (
    <Box className={className} p={6}>
      <Heading size="lg" mb={4}>
        Справочники
      </Heading>
      <Text color="gray.600">Здесь будет справочная информация</Text>
    </Box>
  );
});

ReferenceContent.displayName = 'ReferenceContent';
