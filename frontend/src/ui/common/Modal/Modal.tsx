'use client';

import { useEscapeKey } from '@/hooks';
import { LoaderIcon, ModalBody, ModalFooter, ModalHeader } from '@/ui';
import { cn } from '@/utils';
import React, {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { modalStyles } from './Modal.styles';

const { overlay, backdrop, container } = modalStyles;

interface ModalContextValue {
  onClose?: () => void;
}

const ModalContext = createContext<ModalContextValue>({});

export const useModalContext = () => {
  const context = useContext(ModalContext);
  return context;
};

interface ModalProps {
  children: ReactNode;
  show?: boolean;
  loading?: boolean;
  onClose?: () => void;
  size?: keyof typeof container.sizes;
  role?: string;
}

const Modal: React.FC<ModalProps> & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
} = ({
  children,
  show,
  onClose,
  size = 'lg',
  role = 'dialog',
  loading = false,
}) => {
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEscapeKey(handleClose, Boolean(show));

  if (!show) {
    return null;
  }

  const modalContent = (
    <div className={overlay}>
      <div className={backdrop} />
      <div
        className={cn([
          container.base,
          container.sizes[size],
          container.maxHeight,
        ])}
        role={role}
        aria-modal="true"
        tabIndex={-1}
      >
        <ModalContext.Provider value={{ onClose: handleClose }}>
          {loading ? (
            <div className="flex items-center justify-center p-16">
              <LoaderIcon width={40} height={40} />
            </div>
          ) : (
            children
          )}
        </ModalContext.Provider>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
