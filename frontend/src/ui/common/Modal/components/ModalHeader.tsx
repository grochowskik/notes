import { Icon } from '@/ui';
import { useModalContext } from '../Modal';
import { modalStyles } from '../Modal.styles';

interface ModalHeaderProps {
  title?: string;
}

const { header } = modalStyles;

const ModalHeader: React.FC<ModalHeaderProps> = ({ title }) => {
  const { onClose } = useModalContext();
  return (
    <div className={header.base}>
      <div className={header.title}>{title}</div>
      <Icon
        name="cross"
        onClick={onClose}
        height={24}
        width={24}
        className={header.closeIcon}
      />
    </div>
  );
};

export default ModalHeader;
