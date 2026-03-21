import React from 'react';
import { loaderStyles } from './Loader.styles';
import { Loader2 } from 'lucide-react';

type LoaderProps = {
  children?: React.ReactNode;
  height?: number;
  loading?: boolean;
  width?: number;
};

const Loader = ({
  children,
  height = 48,
  loading,
  width = 48,
}: LoaderProps) => {
  const { container, wrapper, overlay, loader } = loaderStyles;
  if (!loading) return children;
  return (
    <div className={container}>
      <div className={wrapper}>
        {children}
        <div className={overlay}>
          <Loader2 width={width} height={height} className={loader} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
