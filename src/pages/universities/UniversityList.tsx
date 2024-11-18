import { useSearch } from "../../context/SearchContext";
import { UniversityTable } from "../../components/UniversityTable";
import { Button } from "../../components/shared/Button";
import { SearchBar } from "../../components/SearchBar";

export const UniversityList = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">University List</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Button
        label="Add"
        onClick={() => (window.location.href = `/universities/new`)}
        className="mb-4"
      />
      <UniversityTable />
    </div>
  );
};
