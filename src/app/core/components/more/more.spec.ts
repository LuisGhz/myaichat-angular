import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { More } from './more';
import {
  MockNzDropdownDirective,
  MockNzDropdownMenuComponent,
  MockNzIconComponent,
  MockNzMenuComponent,
  MockNzMenuItemComponent,
  MockNzButtonDirective,
} from '@sh/testing';

interface RenderOptions {
  deleteChat?: () => void;
  renameChat?: () => void;
}

describe('More', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async (options?: RenderOptions) => {
    const deleteChat = options?.deleteChat ?? vi.fn();
    const renameChat = options?.renameChat ?? vi.fn();

    const result = await render(More, {
      on: {
        deleteChat,
        renameChat,
      },
      componentImports: [
        MockNzDropdownDirective,
        MockNzDropdownMenuComponent,
        MockNzIconComponent,
        MockNzMenuComponent,
        MockNzMenuItemComponent,
        MockNzButtonDirective,
      ],
    });

    return { ...result, deleteChat, renameChat };
  };

  it('should emit renameChat when rename option is clicked', async () => {
    const { renameChat } = await renderComponent();
    const user = userEvent.setup();

    const renameOption = screen.getByText('Rename');
    await user.click(renameOption);

    expect(renameChat).toHaveBeenCalledOnce();
  });

  it('should emit deleteChat when delete option is clicked', async () => {
    const { deleteChat } = await renderComponent();
    const user = userEvent.setup();

    const deleteOption = screen.getByText('Delete');
    await user.click(deleteOption);

    expect(deleteChat).toHaveBeenCalledOnce();
  });

  it('should display rename and delete options in menu', async () => {
    await renderComponent();

    expect(screen.getByText('Rename')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should stop propagation when trigger button is clicked to prevent parent interactions', async () => {
    const { fixture } = await renderComponent();
    const user = userEvent.setup();
    const handleClick = vi.fn();

    fixture.nativeElement.addEventListener('click', handleClick);

    const triggerBtn = screen.getByRole('button');
    await user.click(triggerBtn);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should not emit actions when only trigger button is clicked', async () => {
    const { deleteChat, renameChat } = await renderComponent();
    const user = userEvent.setup();

    const triggerBtn = screen.getByRole('button');
    await user.click(triggerBtn);

    expect(deleteChat).not.toHaveBeenCalled();
    expect(renameChat).not.toHaveBeenCalled();
  });
});
