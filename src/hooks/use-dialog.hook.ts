'use client';

import { useCallback, useState } from 'react';

export interface UseDialogReturn {
  isOpen: boolean;
  toggleOpen: () => void;
  openDialog: () => void;
  closeDialog: () => void;
  onOpenChange: SetStateFn<boolean>;
}

export function useDialog(defautOpenState = false): UseDialogReturn {
  const [isOpen, setIsOpen] = useState(defautOpenState);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return {
    isOpen,
    toggleOpen,
    openDialog,
    closeDialog,
    onOpenChange: setIsOpen,
  };
}
