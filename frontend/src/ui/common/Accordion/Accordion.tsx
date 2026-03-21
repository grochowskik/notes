'use client';
import { cn } from '@/utils';
import { ChevronDown } from 'lucide-react';
import { Fragment, useState, type ReactNode } from 'react';
import { accordionStyles } from './Accordion.styles';

type AccordionProps = {
  children: ReactNode;
  onClick?: () => void;
  title?: string;
};

const Accordion = ({ children, onClick, title }: AccordionProps) => {
  const { summary, icon, expandedIcon, content } = accordionStyles;
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleToggle = () => {
    if (onClick) onClick();
    setExpanded((prev) => !prev);
  };

  return (
    <Fragment>
      <button
        type="button"
        className={summary}
        onClick={handleToggle}
        aria-expanded={expanded}
      >
        <ChevronDown className={cn([icon, expanded && expandedIcon])} />
        {title}
      </button>
      <div
        className={cn([
          content.base,
          expanded && content.expanded,
          !expanded && content.collapsed,
        ])}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default Accordion;
