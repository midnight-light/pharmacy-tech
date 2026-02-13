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
} from '@chakra-ui/react';
import { CreateApplicationForm } from '../forms/components/create-application-form';
import type { ApplicationTableItem } from '../constants/applications-table-items.constants';

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
        <DialogContent>
          <DialogHeader>
            <DialogTitle fontSize="2xl">Создание заявки</DialogTitle>
            <DialogCloseTrigger asChild>
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
