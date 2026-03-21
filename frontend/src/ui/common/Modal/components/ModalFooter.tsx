import { cn } from '@/utils';
import { ReactNode } from 'react';
import { modalStyles } from '../Modal.styles';

interface ModalFooterProps {
  children: ReactNode;
  align?: keyof typeof footer.alignment;
}
const { footer } = modalStyles;

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  align = 'right',
}) => {
  return (
    <div className={cn([footer.base, footer.alignment[align]])}>{children}</div>
  );
};

export default ModalFooter;
