import { Loader2 } from 'lucide-react';
import { loaderStyles } from './Loader.styles';

type LoaderProps = {
  height?: number;
  width?: number;
};

const LoaderIcon = ({ height = 20, width = 20 }: LoaderProps) => {
  const { icon } = loaderStyles;
  return <Loader2 width={width} height={height} className={icon} />;
};

export default LoaderIcon;
