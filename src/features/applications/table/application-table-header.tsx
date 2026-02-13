import {
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  Separator,
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
    <Container
      minW="100%"
      gapY="4"
      padding={0}
      borderBottom="1px solid"
      borderColor="gray.200"
      paddingX="10"
      paddingBottom="5"
    >
      <Flex justifyContent="space-between" alignItems="center" gap="4">
        <InputGroup startElement={<MdSearch />}>
          <Input placeholder="Username" />
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
      <Flex w="100%" marginTop="5" gap="2">
        {Object.values(APPLICATIONS_STATUS).map((status) => (
          <Button variant="subtle" key={status}>
            {status}
          </Button>
        ))}
        <Button>Все статусы</Button>
        <Separator size="lg" orientation="vertical" />
        <Button variant="subtle">
          <LuFilter />
          Показать только мои
        </Button>
      </Flex>
    </Container>
  );
}
