import { Suspense, lazy } from 'react';
import { Spinner, Center, Tabs } from '@chakra-ui/react';
import {
  useTabStore,
  selectActiveTab,
} from '@/features/applications/tabs/tabs.store';
import { TabEnum } from '@/features/applications/tabs/tabs.types';

const OrdersContent = lazy(() =>
  import('@/features/applications/tabs/widgets/order-content').then((m) => ({
    default: m.OrdersContent,
  })),
);

const ReportsContent = lazy(() =>
  import('@/features/applications/tabs/widgets/report-content').then((m) => ({
    default: m.ReportsContent,
  })),
);

const ReferenceContent = lazy(() =>
  import('@/features/applications/tabs/widgets/reference-content').then(
    (m) => ({
      default: m.ReferenceContent,
    }),
  ),
);

const TabLoadingFallback = () => (
  <Center h="200px">
    <Spinner size="xl" color="blue.500" />
  </Center>
);

export const ApplicationsPage = () => {
  const activeTab = useTabStore(selectActiveTab);

  return (
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
  );
};
