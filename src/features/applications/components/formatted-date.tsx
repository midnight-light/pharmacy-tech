import { Flex, Text } from '@chakra-ui/react';

interface FormattedDateProps {
  dateTime: string;
}

export const FormattedDate: React.FC<FormattedDateProps> = ({ dateTime }) => {
  const [date, time] = dateTime.split('T');

  return (
    <Flex alignItems="center" gap="1">
      <Text>{date}</Text>
      <Text color="gray.400">{time}</Text>
    </Flex>
  );
};
