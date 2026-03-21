'use client';

import { type ReactNode } from 'react';
import { sectionStyles } from './section.styles';

type SectionProps = {
  title: string;
  children: ReactNode;
};

const { container, titleStyles, childrenStyles } = sectionStyles;

const Section = ({ title, children }: SectionProps) => (
  <div className={container}>
    <h2 className={titleStyles}>{title}</h2>
    <div className={childrenStyles}>{children}</div>
  </div>
);

export default Section;
