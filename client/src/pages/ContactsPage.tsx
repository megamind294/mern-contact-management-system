import { useCallback, useEffect, useState } from 'react';
import {
  createContact,
  deleteContact,
  getApiErrorMessage,
  listContacts,
  updateContact
} from '../api/contacts';
import { CategoryFilter } from '../components/CategoryFilter';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { ContactForm } from '../components/ContactForm';
import { ContactList } from '../components/ContactList';
import { SearchBar } from '../components/SearchBar';
import type { Contact, ContactCategory, ContactInput } from '../types/contact';

export function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ContactCategory | ''>('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [formError, setFormError] = useState('');
  const [editing, setEditing] = useState<Contact | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<Contact | null>(null);
  const [deletingBusy, setDeletingBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const result = await listContacts({ search, category });
      setContacts(result.data);
    } catch (error) {
      setLoadError(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    const timer = window.setTimeout(load, 250);
    return () => window.clearTimeout(timer);
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setFormError('');
    setFormOpen(true);
  };

  const openEdit = (contact: Contact) => {
    setEditing(contact);
    setFormError('');
    setFormOpen(true);
  };

  const save = async (input: ContactInput) => {
    setSubmitting(true);
    setFormError('');
    try {
      if (editing) await updateContact(editing._id, input);
      else await createContact(input);
      setFormOpen(false);
      setEditing(null);
      await load();
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setDeletingBusy(true);
    try {
      await deleteContact(deleting._id);
      setDeleting(null);
      await load();
    } catch (error) {
      setLoadError(getApiErrorMessage(error));
    } finally {
      setDeletingBusy(false);
    }
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">MERN portfolio project</p>
          <h1>Contact Manager</h1>
          <p className="hero__copy">A clean full-stack address book with server-side search, categories and complete CRUD workflows.</p>
        </div>
        <button className="button button--primary button--large" onClick={openCreate}>+ Add contact</button>
      </header>

      <section className="toolbar" aria-label="Contact filters">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} />
        <span className="count-pill">{contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}</span>
      </section>

      {loadError && (
        <div className="alert alert--error">
          <span>{loadError}</span>
          <button className="button button--ghost" onClick={load}>Retry</button>
        </div>
      )}

      <ContactList
        contacts={contacts}
        loading={loading}
        filtered={Boolean(search.trim() || category)}
        onEdit={openEdit}
        onDelete={setDeleting}
      />

      {formOpen && (
        <ContactForm
          key={editing?._id ?? 'new'}
          contact={editing}
          submitting={submitting}
          error={formError}
          onSubmit={save}
          onCancel={() => setFormOpen(false)}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title={`Delete ${deleting.firstName} ${deleting.lastName}?`}
          message="This permanently removes the contact from the database."
          busy={deletingBusy}
          onCancel={() => setDeleting(null)}
          onConfirm={confirmDelete}
        />
      )}
    </main>
  );
}
