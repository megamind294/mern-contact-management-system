import axios from 'axios';
import type { Contact, ContactInput, ContactQuery } from '../types/contact';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api',
  timeout: 10000
});

export async function listContacts(query: ContactQuery = {}) {
  const params: Record<string, string> = {};
  if (query.search?.trim()) params.search = query.search.trim();
  if (query.category) params.category = query.category;
  const response = await api.get<{ data: Contact[]; count: number }>('/contacts', { params });
  return response.data;
}

export async function getContact(id: string) {
  const response = await api.get<{ data: Contact }>(`/contacts/${id}`);
  return response.data.data;
}

export async function createContact(input: ContactInput) {
  const response = await api.post<{ data: Contact }>('/contacts', input);
  return response.data.data;
}

export async function updateContact(id: string, input: ContactInput) {
  const response = await api.put<{ data: Contact }>(`/contacts/${id}`, input);
  return response.data.data;
}

export async function deleteContact(id: string) {
  await api.delete(`/contacts/${id}`);
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.error?.message;
    if (typeof message === 'string') return message;
  }
  return 'Something went wrong. Please try again.';
}

export { api };
