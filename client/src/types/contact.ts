export type ContactCategory = 'personal' | 'work' | 'other';

export interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  category: ContactCategory;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  category: ContactCategory;
  notes?: string;
}

export interface ContactQuery {
  search?: string;
  category?: ContactCategory | '';
}
