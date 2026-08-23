import type { Contact } from '../types/contact';
import { ContactCard } from './ContactCard';

interface ContactListProps {
  contacts: Contact[];
  loading: boolean;
  filtered: boolean;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

export function ContactList({ contacts, loading, filtered, onEdit, onDelete }: ContactListProps) {
  if (loading) return <div className="state-card">Loading contacts…</div>;
  if (!contacts.length) {
    return <div className="state-card">{filtered ? 'No matching contacts' : 'No contacts yet'}</div>;
  }

  return (
    <div className="contact-grid">
      {contacts.map((contact) => (
        <ContactCard key={contact._id} contact={contact} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
