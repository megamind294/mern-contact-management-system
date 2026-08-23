import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactsPage } from './ContactsPage';
import * as api from '../api/contacts';

vi.mock('../api/contacts', async () => {
  const actual = await vi.importActual<typeof import('../api/contacts')>('../api/contacts');
  return { ...actual, listContacts: vi.fn(), createContact: vi.fn(), updateContact: vi.fn(), deleteContact: vi.fn() };
});

const contact = {
  _id: '1', firstName: 'Rinkle', lastName: 'Sharma', email: 'rinkle@example.com',
  phone: '+48 500 000 000', company: 'Example', category: 'work' as const,
  notes: '', createdAt: '', updatedAt: ''
};

beforeEach(() => {
  vi.mocked(api.listContacts).mockResolvedValue({ data: [contact], count: 1 });
});

describe('ContactsPage', () => {
  it('loads and renders contacts', async () => {
    render(<ContactsPage />);
    expect(screen.getByText('Loading contacts…')).toBeInTheDocument();
    expect(await screen.findByText('Rinkle Sharma')).toBeInTheDocument();
    expect(screen.getByText('rinkle@example.com')).toBeInTheDocument();
  });

  it('sends search terms to the backend query', async () => {
    render(<ContactsPage />);
    await screen.findByText('Rinkle Sharma');
    await userEvent.type(screen.getByPlaceholderText('Search name, email, phone or company'), 'rink');
    await waitFor(() => expect(api.listContacts).toHaveBeenLastCalledWith({ search: 'rink', category: '' }), { timeout: 1000 });
  });

  it('shows a distinct filtered empty state', async () => {
    vi.mocked(api.listContacts).mockResolvedValue({ data: [], count: 0 });
    render(<ContactsPage />);
    await userEvent.type(screen.getByPlaceholderText('Search name, email, phone or company'), 'missing');
    expect(await screen.findByText('No matching contacts')).toBeInTheDocument();
  });
});
