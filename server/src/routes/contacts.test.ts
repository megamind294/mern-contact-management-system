import request from 'supertest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../app.js';
import { Contact } from '../models/Contact.js';

const id = '507f1f77bcf86cd799439011';
const sample = {
  _id: id,
  firstName: 'Rinkle',
  lastName: 'Sharma',
  email: 'rinkle@example.com',
  phone: '+48 500 000 000',
  company: 'Example',
  category: 'work',
  notes: '',
  createdAt: new Date('2026-08-01T00:00:00Z'),
  updatedAt: new Date('2026-08-02T00:00:00Z')
};

afterEach(() => vi.restoreAllMocks());

describe('contacts API', () => {
  it('creates a valid contact', async () => {
    vi.spyOn(Contact, 'create').mockResolvedValue(sample as never);
    const response = await request(createApp()).post('/api/contacts').send({
      firstName: ' Rinkle ', lastName: 'Sharma', email: 'RINKLE@EXAMPLE.COM',
      phone: '+48 500 000 000', company: 'Example', category: 'work'
    });
    expect(response.status).toBe(201);
    expect(response.body.data.email).toBe('rinkle@example.com');
  });

  it('rejects invalid contact input', async () => {
    const response = await request(createApp()).post('/api/contacts').send({ firstName: '' });
    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('Validation failed');
  });

  it('lists contacts', async () => {
    const sort = vi.fn().mockResolvedValue([sample]);
    vi.spyOn(Contact, 'find').mockReturnValue({ sort } as never);
    const response = await request(createApp()).get('/api/contacts');
    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
  });

  it('supports search and category filters', async () => {
    const sort = vi.fn().mockResolvedValue([sample]);
    const find = vi.spyOn(Contact, 'find').mockReturnValue({ sort } as never);
    const response = await request(createApp()).get('/api/contacts?search=rinkle&category=work');
    expect(response.status).toBe(200);
    expect(find).toHaveBeenCalledWith(expect.objectContaining({ category: 'work', $or: expect.any(Array) }));
    expect(sort).toHaveBeenCalledWith({ updatedAt: -1 });
  });

  it('returns 400 for malformed ids', async () => {
    const response = await request(createApp()).get('/api/contacts/not-an-id');
    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe('Invalid contact id');
  });

  it('returns 404 for a missing contact', async () => {
    vi.spyOn(Contact, 'findById').mockResolvedValue(null);
    const response = await request(createApp()).get(`/api/contacts/${id}`);
    expect(response.status).toBe(404);
  });

  it('updates a contact', async () => {
    vi.spyOn(Contact, 'findByIdAndUpdate').mockResolvedValue(sample as never);
    const response = await request(createApp()).put(`/api/contacts/${id}`).send({
      firstName: 'Rinkle', lastName: 'Sharma', email: 'rinkle@example.com',
      phone: '+48 500 000 000', company: 'Example', category: 'work'
    });
    expect(response.status).toBe(200);
    expect(response.body.data.firstName).toBe('Rinkle');
  });

  it('deletes a contact', async () => {
    vi.spyOn(Contact, 'findByIdAndDelete').mockResolvedValue(sample as never);
    const response = await request(createApp()).delete(`/api/contacts/${id}`);
    expect(response.status).toBe(204);
  });
});
