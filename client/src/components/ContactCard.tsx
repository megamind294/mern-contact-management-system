import type { Contact } from '../types/contact';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <article className="contact-card">
      <div className="contact-card__header">
        <div>
          <h3>{contact.firstName} {contact.lastName}</h3>
          <span className={`badge badge--${contact.category}`}>{contact.category}</span>
        </div>
        <div className="contact-card__actions">
          <button className="button button--ghost" onClick={() => onEdit(contact)}>Edit</button>
          <button className="button button--danger-ghost" onClick={() => onDelete(contact)}>Delete</button>
        </div>
      </div>
      <dl className="contact-details">
        <div><dt>Email</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
        <div><dt>Phone</dt><dd><a href={`tel:${contact.phone}`}>{contact.phone}</a></dd></div>
        {contact.company && <div><dt>Company</dt><dd>{contact.company}</dd></div>}
        {contact.notes && <div><dt>Notes</dt><dd>{contact.notes}</dd></div>}
      </dl>
    </article>
  );
}
