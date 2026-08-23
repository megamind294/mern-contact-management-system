import type { ContactCategory } from '../types/contact';

interface CategoryFilterProps {
  value: ContactCategory | '';
  onChange: (value: ContactCategory | '') => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <label className="filter-field">
      <span>Category</span>
      <select value={value} onChange={(event) => onChange(event.target.value as ContactCategory | '')}>
        <option value="">All</option>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="other">Other</option>
      </select>
    </label>
  );
}
