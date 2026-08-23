import mongoose, { Schema } from 'mongoose';
import type { ContactCategory } from '../validation/contact.js';

export interface ContactDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  category: ContactCategory;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<ContactDocument>(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, maxlength: 50 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    company: { type: String, trim: true, maxlength: 100 },
    category: { type: String, enum: ['personal', 'work', 'other'], default: 'personal', required: true },
    notes: { type: String, trim: true, maxlength: 500 }
  },
  { timestamps: true }
);

export const Contact = mongoose.models.Contact ?? mongoose.model<ContactDocument>('Contact', contactSchema);
