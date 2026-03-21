import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Modal from '../Modal';

describe('Modal', () => {
  it('renders nothing when show is false', () => {
    render(
      <Modal show={false} onClose={vi.fn()}>
        <p>Hidden content</p>
      </Modal>
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('renders children when show is true', () => {
    render(
      <Modal show={true} onClose={vi.fn()}>
        <p>Visible content</p>
      </Modal>
    );
    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('has role="dialog" by default', () => {
    render(
      <Modal show={true} onClose={vi.fn()}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(
      <Modal show={true} onClose={vi.fn()}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(
      <Modal show={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose for non-Escape keys', () => {
    const onClose = vi.fn();
    render(
      <Modal show={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('shows a loader instead of children when loading is true', () => {
    render(
      <Modal show={true} loading={true} onClose={vi.fn()}>
        <p>Should not appear</p>
      </Modal>
    );
    expect(screen.queryByText('Should not appear')).not.toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('uses a custom role when specified', () => {
    render(
      <Modal show={true} role="alertdialog" onClose={vi.fn()}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });
});
