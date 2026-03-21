import { fireEvent, render } from '@testing-library/react';
import { useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import useClickOutside from '../useClickOutside';

function TestComponent({ handler }: { handler: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, handler);
  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
}

describe('useClickOutside', () => {
  it('does NOT call handler when clicking inside the ref element', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent handler={handler} />);
    fireEvent.mouseDown(getByTestId('inside'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('calls handler when clicking outside the ref element', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent handler={handler} />);
    fireEvent.mouseDown(getByTestId('outside'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('calls handler on touchstart outside the ref element', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent handler={handler} />);
    fireEvent.touchStart(getByTestId('outside'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does NOT call handler on touchstart inside the ref element', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent handler={handler} />);
    fireEvent.touchStart(getByTestId('inside'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('removes event listeners on unmount', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    const removeSpy = vi.spyOn(document, 'removeEventListener');

    const handler = vi.fn();
    const { unmount } = render(<TestComponent handler={handler} />);

    expect(addSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(addSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
