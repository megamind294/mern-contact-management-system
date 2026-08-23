import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ContactForm } from './ContactForm';

const contact = {
  _id: '1', firstName: 'Rinkle', lastName: 'Sharma', email: 'rinkle@example.com',
  phone: '+48 500 000 000', company: 'Example', category: 'work' as const,
  notes: 'University contact', createdAt: '', updatedAt: ''
};

describe('ContactForm', () => {
  it('shows required field errors', async () => {
    render(<ContactForm submitting={false} onSubmit={vi.fn()} onCancel={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: 'Add contact' }));
    expect(screen.getByText('First name is required')).toBeInTheDocument();
    expect(screen.getByText('Last name is required')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
  });

  it('prefills and submits edited contact data', async () => {
    const onSubmit = vi.fn();
    render(<ContactForm contact={contact} submitting={false} onSubmit={onSubmit} onCancel={vi.fn()} />);
    expect(screen.getByDisplayValue('Rinkle')).toBeInTheDocument();
    await userEvent.clear(screen.getByDisplayValue('Example'));
    await userEvent.type(screen.getByLabelText('Company'), 'OpenAI Demo');
    await userEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ company: 'OpenAI Demo', category: 'work' }));
  });

  it('disables submit while saving', () => {
    render(<ContactForm submitting={true} onSubmit={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Saving…' })).toBeDisabled();
  });
});
