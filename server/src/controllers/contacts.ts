import type { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Contact } from '../models/Contact.js';
import { HttpError } from '../middleware/errorHandler.js';
import { contactInputSchema, contactQuerySchema } from '../validation/contact.js';

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function getId(req: Request): string {
  const value = req.params.id;
  return Array.isArray(value) ? (value[0] ?? '') : value;
}

function ensureObjectId(id: string) {
  if (!mongoose.isValidObjectId(id)) throw new HttpError(400, 'Invalid contact id');
}

export async function listContacts(req: Request, res: Response, next: NextFunction) {
  try {
    const query = contactQuerySchema.parse(req.query);
    const filter: Record<string, unknown> = {};

    if (query.category) filter.category = query.category;
    if (query.search) {
      const regex = new RegExp(escapeRegex(query.search), 'i');
      filter.$or = [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { phone: regex },
        { company: regex }
      ];
    }

    const contacts = await Contact.find(filter).sort({ updatedAt: -1 });
    res.json({ data: contacts, count: contacts.length });
  } catch (error) {
    next(error);
  }
}

export async function getContact(req: Request, res: Response, next: NextFunction) {
  try {
    const id = getId(req);
    ensureObjectId(id);
    const contact = await Contact.findById(id);
    if (!contact) throw new HttpError(404, 'Contact not found');
    res.json({ data: contact });
  } catch (error) {
    next(error);
  }
}

export async function createContact(req: Request, res: Response, next: NextFunction) {
  try {
    const input = contactInputSchema.parse(req.body);
    const contact = await Contact.create(input);
    res.status(201).json({ data: contact });
  } catch (error) {
    next(error);
  }
}

export async function updateContact(req: Request, res: Response, next: NextFunction) {
  try {
    const id = getId(req);
    ensureObjectId(id);
    const input = contactInputSchema.parse(req.body);
    const contact = await Contact.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true
    });
    if (!contact) throw new HttpError(404, 'Contact not found');
    res.json({ data: contact });
  } catch (error) {
    next(error);
  }
}

export async function deleteContact(req: Request, res: Response, next: NextFunction) {
  try {
    const id = getId(req);
    ensureObjectId(id);
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) throw new HttpError(404, 'Contact not found');
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
