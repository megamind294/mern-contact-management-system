interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="search-field">
      <span className="sr-only">Search contacts</span>
      <input
        type="search"
        placeholder="Search name, email, phone or company"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
