import { memo, Suspense, lazy } from 'react';
import { Spinner, Center, Flex, Tabs } from '@chakra-ui/react';
import { useTabStore, selectActiveTab } from '@/features/tabs/tabs.store';
import { TabEnum } from '@/features/tabs/tabs.types';

const OrdersContent = lazy(() =>
  import('@/features/tabs/components/order-content').then((m) => ({
    default: m.OrdersContent,
  })),
);

const ReportsContent = lazy(() =>
  import('@/features/tabs/components/report-content').then((m) => ({
    default: m.ReportsContent,
  })),
);

const ReferenceContent = lazy(() =>
  import('@/features/tabs/components/reference-content').then((m) => ({
    default: m.ReferenceContent,
  })),
);

const TabLoadingFallback = () => (
  <Center h="200px">
    <Spinner size="xl" color="blue.500" />
  </Center>
);

export const MainLayout = memo(() => {
  const activeTab = useTabStore(selectActiveTab);

  return (
    <Flex
      px="10"
      minH="calc(100vh - 5.375rem)"
      justifyContent="center"
      bg="gray.50"
      flex="1"
    >
      <Tabs.Root value={activeTab}>
        <Tabs.Content value={TabEnum.ORDERS}>
          <Suspense fallback={<TabLoadingFallback />}>
            <OrdersContent />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value={TabEnum.REPORTS}>
          <Suspense fallback={<TabLoadingFallback />}>
            <ReportsContent />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value={TabEnum.REFERENCE}>
          <Suspense fallback={<TabLoadingFallback />}>
            <ReferenceContent />
          </Suspense>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
});

MainLayout.displayName = 'MainLayout';
