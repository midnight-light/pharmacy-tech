import type { HTMLAttributes } from 'react';
import {
  Avatar,
  Box,
  Button,
  Circle,
  Flex,
  Float,
  Icon,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { cn } from '@/utils/cn';
import type { TabEnumType } from '@/features/tabs/tabs.types';
import {
  selectActiveTab,
  selectSetActiveTab,
  useTabStore,
} from '@/features/tabs/tabs.store';
import { TABS_CONFIG } from '@/features/tabs/tabs.constants';
import { IoLogOutOutline } from 'react-icons/io5';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export function Header({ className }: HeaderProps) {
  const activeTab = useTabStore(selectActiveTab);
  const setActiveTab = useTabStore(selectSetActiveTab);

  const handleTabChange = (tabDetails: Tabs.TabsValueChangeDetails) => {
    console.log('tabDetails', tabDetails);
    console.log('activeTab', activeTab);
    setActiveTab(tabDetails.value as TabEnumType);
  };
  return (
    <Flex
      pl="8.125rem" // 24 = 8rem = 130px
      pr="2.1rem"
      justifyContent="space-between"
      alignItems="center"
      h="5.375rem"
      border="1px solid"
      borderColor="#D9E1EC"
    >
      <Box as="div" className={cn('bg.red.500', className)}>
        <Tabs.Root
          value={activeTab}
          onValueChange={handleTabChange}
          variant="plain"
        >
          <Tabs.List>
            {TABS_CONFIG.map((tab) => (
              <Tabs.Trigger key={tab.value} value={tab.value}>
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </Box>

      <Box gap="5" display="flex" alignItems="center">
        <Avatar.Root>
          <Avatar.Fallback name="Иванов Иван" />
          <Avatar.Image src="https://bit.ly/sage-adebayo" />
          <Float placement="bottom-end" offsetX="0.5" offsetY="0.5">
            <Circle
              bg="#B93C3C"
              size="5"
              outline="0.2em solid"
              outlineColor="bg"
            >
              <Text fontSize="12px" fontWeight="medium" color="white">
                2
              </Text>
            </Circle>
          </Float>
        </Avatar.Root>
        <Button variant="outline" colorScheme="gray">
          <Icon as={IoLogOutOutline} boxSize="8" />
          Выйти
        </Button>
      </Box>
    </Flex>
  );
}
