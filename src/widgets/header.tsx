import {
  Avatar,
  Box,
  Button,
  Circle,
  Flex,
  Float,
  Icon,
  NativeSelect,
  Tabs,
  Text,
} from '@chakra-ui/react';
import type { TabEnumType } from '@/features/applications/tabs/tabs.types';
import {
  selectActiveTab,
  selectSetActiveTab,
  useTabStore,
} from '@/features/applications/tabs/tabs.store';
import { TABS_CONFIG } from '@/features/applications/tabs/tabs.constants';
import { IoLogOutOutline } from 'react-icons/io5';

export function Header() {
  const activeTab = useTabStore(selectActiveTab);
  const setActiveTab = useTabStore(selectSetActiveTab);

  const handleTabChange = (tabDetails: Tabs.TabsValueChangeDetails) => {
    console.log('tabDetails', tabDetails);
    console.log('activeTab', activeTab);
    setActiveTab(tabDetails.value as TabEnumType);
  };
  return (
    <Flex
      pl={{ base: '1rem', md: '8.125rem' }}
      pr={{ base: '1rem', md: '2.1rem' }}
      justifyContent="space-between"
      alignItems="center"
      h={{ base: '3.5rem', md: '5.375rem' }}
      border="1px solid"
      borderColor="gray.200"
      bg="gray.50"
    >
      {/* Desktop: Tabs */}

      <Box display={{ base: 'none', md: 'block' }}>
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

      {/* Mobile: NativeSelect */}
      <Box display={{ base: 'block', md: 'none' }}>
        <NativeSelect.Root size="sm">
          <NativeSelect.Field
            css={{
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
            }}
            fontSize="18px"
            fontWeight="bold"
            border="transparent"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as TabEnumType)}
          >
            {TABS_CONFIG.map((tab) => (
              <option key={tab.value} value={tab.value}>
                {tab.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
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
        <Button
          variant="outline"
          colorScheme="gray"
          display={{ base: 'none', md: 'block' }}
        >
          <Icon as={IoLogOutOutline} boxSize="8" />
          Выйти
        </Button>
      </Box>
    </Flex>
  );
}
