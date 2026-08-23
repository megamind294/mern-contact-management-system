import { describe, expect, it } from 'vitest';
import { contactInputSchema } from './contact';

const validContact = {
  firstName: ' Rinkle ',
  lastName: ' Sharma ',
  email: 'RINKLE@EXAMPLE.COM',
  phone: '+48 500 000 000',
  category: 'work' as const,
  notes: 'Met at university.'
};

describe('contactInputSchema', () => {
  it('requires the core contact fields', () => {
    const result = contactInputSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('trims names and normalizes email', () => {
    const result = contactInputSchema.parse(validContact);
    expect(result.firstName).toBe('Rinkle');
    expect(result.lastName).toBe('Sharma');
    expect(result.email).toBe('rinkle@example.com');
  });

  it('rejects unsupported categories', () => {
    const result = contactInputSchema.safeParse({ ...validContact, category: 'vip' });
    expect(result.success).toBe(false);
  });

  it('rejects notes longer than 500 characters', () => {
    const result = contactInputSchema.safeParse({ ...validContact, notes: 'x'.repeat(501) });
    expect(result.success).toBe(false);
  });
});
