import { FormEvent, useMemo, useState } from 'react';
import type { Contact, ContactInput } from '../types/contact';

interface ContactFormProps {
  contact?: Contact | null;
  submitting: boolean;
  error?: string;
  onSubmit: (input: ContactInput) => Promise<void> | void;
  onCancel: () => void;
}

type Errors = Partial<Record<keyof ContactInput, string>>;

const empty: ContactInput = {
  firstName: '', lastName: '', email: '', phone: '', company: '', category: 'personal', notes: ''
};

export function ContactForm({ contact, submitting, error, onSubmit, onCancel }: ContactFormProps) {
  const initial = useMemo<ContactInput>(() => contact ? {
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    company: contact.company ?? '',
    category: contact.category,
    notes: contact.notes ?? ''
  } : empty, [contact]);

  const [values, setValues] = useState<ContactInput>(initial);
  const [errors, setErrors] = useState<Errors>({});

  const set = (field: keyof ContactInput, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const next: Errors = {};
    if (!values.firstName.trim()) next.firstName = 'First name is required';
    if (!values.lastName.trim()) next.lastName = 'Last name is required';
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = 'Enter a valid email';
    if (values.phone.trim().length < 3) next.phone = 'Phone is required';
    if ((values.notes ?? '').length > 500) next.notes = 'Notes must be 500 characters or less';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    await onSubmit({
      ...values,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim(),
      company: values.company?.trim(),
      notes: values.notes?.trim()
    });
  };

  return (
    <div className="form-backdrop" role="presentation">
      <section className="form-panel" role="dialog" aria-modal="true" aria-labelledby="contact-form-title">
        <div className="panel-header">
          <div>
            <p className="eyebrow">{contact ? 'Update record' : 'New record'}</p>
            <h2 id="contact-form-title">{contact ? 'Edit contact' : 'Add contact'}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onCancel} aria-label="Close">×</button>
        </div>
        {error && <div className="alert alert--error">{error}</div>}
        <form onSubmit={submit} className="contact-form" noValidate>
          <div className="form-grid">
            <Field label="First name" error={errors.firstName}><input value={values.firstName} onChange={(e) => set('firstName', e.target.value)} /></Field>
            <Field label="Last name" error={errors.lastName}><input value={values.lastName} onChange={(e) => set('lastName', e.target.value)} /></Field>
            <Field label="Email" error={errors.email}><input type="email" value={values.email} onChange={(e) => set('email', e.target.value)} /></Field>
            <Field label="Phone" error={errors.phone}><input value={values.phone} onChange={(e) => set('phone', e.target.value)} /></Field>
            <Field label="Company"><input value={values.company ?? ''} onChange={(e) => set('company', e.target.value)} /></Field>
            <Field label="Category">
              <select value={values.category} onChange={(e) => set('category', e.target.value)}>
                <option value="personal">Personal</option><option value="work">Work</option><option value="other">Other</option>
              </select>
            </Field>
          </div>
          <Field label="Notes" error={errors.notes}><textarea rows={4} value={values.notes ?? ''} onChange={(e) => set('notes', e.target.value)} /></Field>
          <div className="form-actions">
            <button className="button button--ghost" type="button" onClick={onCancel}>Cancel</button>
            <button className="button button--primary" disabled={submitting} type="submit">{submitting ? 'Saving…' : contact ? 'Save changes' : 'Add contact'}</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="field"><span>{label}</span>{children}{error && <small className="field-error">{error}</small>}</label>;
}
