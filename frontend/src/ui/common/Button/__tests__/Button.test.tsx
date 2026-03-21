import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from '../Button';

describe('Button', () => {
  it('renders the label text', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders a <button> element', () => {
    render(<Button label="Test" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button label="Click" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled and shows loader when loading prop is true', () => {
    render(<Button label="Loading..." loading />);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Button label="No click" disabled onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders with type="submit" when specified', () => {
    render(<Button label="Submit" type="submit" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('defaults to type="button"', () => {
    render(<Button label="Default" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
