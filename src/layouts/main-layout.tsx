import { memo } from 'react';
import { Box } from '@chakra-ui/react';
import { ApplicationsPage } from '@/pages/applications-page';

export const MainLayout = memo(() => {
  return (
    <Box minH="calc(100vh - 5.375rem)" bg="gray.50">
      <ApplicationsPage />
    </Box>
  );
});

MainLayout.displayName = 'MainLayout';
