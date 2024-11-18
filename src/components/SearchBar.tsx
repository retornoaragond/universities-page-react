type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

export const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="Search by Name"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="mb-4 p-2 w-72 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
