import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useEscapeKey from '../useEscapeKey';

function TestComponent({
  callback,
  isActive,
}: {
  callback: () => void;
  isActive: boolean;
}) {
  useEscapeKey(callback, isActive);
  return <div>test</div>;
}

describe('useEscapeKey', () => {
  it('calls callback when Escape is pressed and hook is active', () => {
    const callback = vi.fn();
    render(<TestComponent callback={callback} isActive={true} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does NOT call callback when hook is inactive', () => {
    const callback = vi.fn();
    render(<TestComponent callback={callback} isActive={false} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(callback).not.toHaveBeenCalled();
  });

  it('does NOT call callback for other keys', () => {
    const callback = vi.fn();
    render(<TestComponent callback={callback} isActive={true} />);
    fireEvent.keyDown(document, { key: 'Enter' });
    fireEvent.keyDown(document, { key: 'Tab' });
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    expect(callback).not.toHaveBeenCalled();
  });

  it('removes event listener on unmount', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const callback = vi.fn();
    const { unmount } = render(
      <TestComponent callback={callback} isActive={true} />
    );
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    removeSpy.mockRestore();
  });
});
