import { ReactNode } from 'react';
import { modalStyles } from '../Modal.styles';

const { body } = modalStyles;

interface ModalBodyProps {
  children: ReactNode;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return <div className={body}>{children}</div>;
};

export default ModalBody;
