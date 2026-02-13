import { useCallback, useState } from 'react';

interface UseApplicationModalReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

/**
 * @description - Hook for managing application modal state
 */
export const useApplicationModal = (): UseApplicationModalReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};

useApplicationModal.displayName = 'useApplicationModal';
