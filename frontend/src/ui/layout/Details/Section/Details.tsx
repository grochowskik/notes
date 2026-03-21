import { Accordion, Loader } from '@/ui';
import { cn } from '@/utils';
import { ReactNode } from 'react';
import DetailsField from '../Fields/DetailsField';
import { detailsStyles } from './Details.styles';

type DetailsSectionProps = {
  children: ReactNode;
  title?: string;
  cols?: 1 | 2 | 3 | 4;
  loading?: boolean;
  accordion?: boolean;
};

function Details({
  children,
  title,
  cols = 4,
  loading = false,
  accordion = false,
}: DetailsSectionProps) {
  const { grid, section } = detailsStyles;

  const gridClass = grid.cols[cols];

  const content = (
    <Loader loading={loading}>
      <div className={cn([grid.wrapper, gridClass])}>{children}</div>
    </Loader>
  );

  if (accordion) {
    return <Accordion title={title}>{content}</Accordion>;
  }

  return (
    <div className={section.wrapper}>
      {title && <h3 className={section.title}>{title}</h3>}
      {content}
    </div>
  );
}

Details.Field = DetailsField;

export default Details;
