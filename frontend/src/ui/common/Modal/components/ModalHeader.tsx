import { Icon } from '@/ui';
import { modalStyles } from '../Modal.styles';
import { useModalContext } from '../Modal';

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
