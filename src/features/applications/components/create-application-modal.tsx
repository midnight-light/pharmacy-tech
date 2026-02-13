import { useCallback } from 'react';
import {
  DialogRoot,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPositioner,
  CloseButton,
  Icon,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { CreateApplicationForm } from '../forms/components/create-application-form';
import type { ApplicationTableItem } from '../constants/applications-table-items.constants';
import { MdArrowBack } from 'react-icons/md';

export interface CreateApplicationModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (application: ApplicationTableItem) => void;
}

export const CreateApplicationModal: React.FC<CreateApplicationModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const handleSuccess = useCallback(() => {
    onClose();
  }, [onClose, onSuccess]);

  return (
    <DialogRoot
      open={open}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
        }
      }}
      size="xl"
      placement="center"
      motionPreset="scale"
    >
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent borderRadius={{ base: '0', md: 'xl' }}>
          <DialogHeader
            borderBottom={{ base: '1px solid', md: 'none' }}
            borderColor="border"
          >
            <Flex justifyContent="flex-start" alignItems="center" gap="2">
              <DialogTitle fontSize="2xl">
                <IconButton
                  display={{ base: 'inline-flex', md: 'none' }}
                  aria-label="Назад"
                  variant="ghost"
                  size="lg"
                  onClick={onClose}
                >
                  <Icon as={MdArrowBack} />
                </IconButton>
                Создание заявки
              </DialogTitle>
            </Flex>
            <DialogCloseTrigger asChild display={{ base: 'none', md: 'block' }}>
              <CloseButton size="lg" />
            </DialogCloseTrigger>
          </DialogHeader>

          <DialogBody>
            <CreateApplicationForm
              onSuccess={handleSuccess}
              onCancel={onClose}
            />
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};

CreateApplicationModal.displayName = 'CreateApplicationModal';
