import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Tabs from '../Tabs';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/dashboard/tab1',
}));

const tabs = [
  { name: 'tab1', label: 'First Tab' },
  { name: 'tab2', label: 'Second Tab' },
  { name: 'tab3', label: 'Third Tab', disabled: true },
];

describe('Tabs', () => {
  it('renders all tab buttons', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" />);
    expect(screen.getByText('First Tab')).toBeInTheDocument();
    expect(screen.getByText('Second Tab')).toBeInTheDocument();
    expect(screen.getByText('Third Tab')).toBeInTheDocument();
  });

  it('renders the correct number of buttons', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('calls onClick with the tab name when a tab is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Tabs tabs={tabs} activeTab="tab1" onClick={onClick} />);

    await user.click(screen.getByText('Second Tab'));
    expect(onClick).toHaveBeenCalledWith('tab2');
  });

  it('does not call onClick for a disabled tab', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Tabs tabs={tabs} activeTab="tab1" onClick={onClick} />);

    await user.click(screen.getByText('Third Tab'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('marks the third tab button as disabled', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" />);
    expect(screen.getByText('Third Tab').closest('button')).toBeDisabled();
  });

  it('all tab buttons have type="button"', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" />);
    screen.getAllByRole('button').forEach((btn) => {
      expect(btn).toHaveAttribute('type', 'button');
    });
  });
});
