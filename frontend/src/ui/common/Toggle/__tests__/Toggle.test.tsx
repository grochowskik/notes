import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Toggle from '../Toggle';

describe('Toggle', () => {
  it('renders a checkbox input', () => {
    render(<Toggle checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('reflects the checked state', () => {
    render(<Toggle checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('reflects the unchecked state', () => {
    render(<Toggle checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onChange when the checkbox changes', () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders left label when provided', () => {
    render(<Toggle checked={false} leftLabel="Off" onChange={vi.fn()} />);
    expect(screen.getByText('Off')).toBeInTheDocument();
  });

  it('renders right label when provided', () => {
    render(<Toggle checked={true} rightLabel="On" onChange={vi.fn()} />);
    expect(screen.getByText('On')).toBeInTheDocument();
  });

  it('renders both labels simultaneously', () => {
    render(
      <Toggle checked={false} leftLabel="Off" rightLabel="On" onChange={vi.fn()} />,
    );
    expect(screen.getByText('Off')).toBeInTheDocument();
    expect(screen.getByText('On')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Toggle checked={false} disabled onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('sets the name attribute via the name prop', () => {
    render(<Toggle checked={false} name="my-toggle" onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'my-toggle');
  });
});
