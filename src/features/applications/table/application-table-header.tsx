import {
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  Separator,
  Box,
} from '@chakra-ui/react';
import { MdPictureAsPdf, MdSearch, MdAdd } from 'react-icons/md';
import { LuFilter } from 'react-icons/lu';
import { APPLICATIONS_STATUS } from '../constants/applications-status';

interface ApplicationTableHeaderProps {
  onCreateApplication: () => void;
}

export function ApplicationTableHeader({
  onCreateApplication,
}: ApplicationTableHeaderProps) {
  const handleCreateApplication = () => {
    onCreateApplication();
  };

  return (
    <>
      <Container
        minW="100%"
        gapY="4"
        padding={0}
        borderBottom="1px solid"
        borderColor="gray.200"
        paddingX={{ base: '4', md: '10' }}
        paddingBottom="5"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          gap="4"
          display={{ base: 'none', md: 'flex' }}
        >
          <InputGroup startElement={<MdSearch />}>
            <Input placeholder="Поиск по номеру или теме заявки" />
          </InputGroup>
          <Button variant="subtle">
            <MdPictureAsPdf />
            Экспорт
          </Button>
          <Button onClick={handleCreateApplication}>
            <MdAdd />
            Создать новую заявку
          </Button>
        </Flex>

        <Flex
          w="100%"
          marginTop={{ base: '0', md: '5' }}
          gap="2"
          overflowX="auto"
          flexWrap="nowrap"
          css={{
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <Box display={{ base: 'contents', md: 'none' }}>
            <Button variant="subtle" flexShrink={0}>
              <LuFilter />
            </Button>
            <Separator size="lg" orientation="vertical" />
          </Box>

          {Object.values(APPLICATIONS_STATUS).map((status) => (
            <Button variant="subtle" key={status} flexShrink={0}>
              {status}
            </Button>
          ))}
          <Button flexShrink={0}>Все статусы</Button>

          <Box display={{ base: 'none', md: 'contents' }}>
            <Separator size="lg" orientation="vertical" />
            <Button variant="subtle" flexShrink={0}>
              <LuFilter />
              Показать только мои
            </Button>
          </Box>
        </Flex>
      </Container>

      <Flex
        display={{ base: 'flex', md: 'none' }}
        position="fixed"
        bottom="6"
        right="4"
        flexDirection="column"
        alignItems="flex-end"
        gap="3"
        zIndex="overlay"
      >
        <Button variant="outline" bg="gray.50">
          Поиск
          <MdSearch />
        </Button>
        <Button onClick={handleCreateApplication}>
          Создать новую заявку
          <MdAdd />
        </Button>
      </Flex>
    </>
  );
}
