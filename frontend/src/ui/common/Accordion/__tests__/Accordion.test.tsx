import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from '../Accordion';

describe('Accordion', () => {
  it('renders the title', () => {
    render(<Accordion title="FAQ">Content</Accordion>);
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Accordion title="Section">Inner content</Accordion>);
    expect(screen.getByText('Inner content')).toBeInTheDocument();
  });

  it('has aria-expanded="false" by default', () => {
    render(<Accordion title="Collapsed">Content</Accordion>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles aria-expanded to true when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Accordion title="Toggle me">Content</Accordion>);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses again on second click', async () => {
    const user = userEvent.setup();
    render(<Accordion title="Toggle">Content</Accordion>);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('calls the onClick prop when clicked', () => {
    const onClick = vi.fn();
    render(<Accordion title="With handler" onClick={onClick}>Content</Accordion>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
