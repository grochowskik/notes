import { Icon } from '@/ui';
import { cn } from '@/utils';
import { useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { infotipStyles } from './Infotip.styles';

type MoreProps = {
  children?: ReactNode;
  textInfo?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
};

const Infotip = ({
  children,
  textInfo,
  width,
  height,
  className,
}: MoreProps) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  if (!textInfo && !children) return null;

  const handleMouseEnter = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      });
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={infotipStyles.container}
      ref={iconRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon
        name="info"
        className={infotipStyles.icon}
        width={width ?? 20}
        height={height ?? 20}
      />
      {isHovered &&
        createPortal(
          <span
            className={cn([infotipStyles.tooltip, className])}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {textInfo || children}
          </span>,
          document.body
        )}
    </div>
  );
};

export default Infotip;
