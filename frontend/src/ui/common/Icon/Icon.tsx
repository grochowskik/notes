import { cn } from '@/utils';
import type { LucideProps } from 'lucide-react';
import {
  ChevronDown,
  Circle,
  CircleDot,
  Eye,
  EyeOff,
  Filter,
  Globe,
  Info,
  Loader2,
  MoreHorizontal,
  Trash,
  X,
} from 'lucide-react';
import { iconStyles } from './Icon.styles';

export type IconName =
  | 'loader'
  | 'expand'
  | 'cross'
  | 'info'
  | 'radioSelected'
  | 'radioUnselected'
  | 'eye'
  | 'eye-off'
  | 'filter'
  | 'globe'
  | 'trash'
  | 'more';

const iconMap: Record<IconName, React.FC<LucideProps>> = {
  loader: Loader2,
  expand: ChevronDown,
  cross: X,
  info: Info,
  radioSelected: CircleDot,
  radioUnselected: Circle,
  eye: Eye,
  'eye-off': EyeOff,
  filter: Filter,
  globe: Globe,
  trash: Trash,
  more: MoreHorizontal,
};

type IconProps = LucideProps & {
  name: IconName;
  pointer?: boolean;
};

const Icon = ({
  name,
  pointer = false,
  className,
  onClick,
  ...props
}: IconProps) => {
  const { base, point } = iconStyles;
  const LucideIcon = iconMap[name];
  return (
    <LucideIcon
      className={cn([base, className, (pointer || onClick) && point])}
      onClick={onClick}
      {...props}
    />
  );
};

export default Icon;
