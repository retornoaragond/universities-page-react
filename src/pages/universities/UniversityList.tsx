import { useSearch } from '../../context/SearchContext';
import { UniversityTable } from '../../components/UniversityTable';
import { Button } from '../../components/shared/Button';
import { SearchBar } from '../../components/SearchBar';
import { PlusIcon } from '@heroicons/react/24/outline';

export const UniversityList = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="container mx-auto p-4">
      <div className=" flex justify-center">
        <h1 className="text-2xl  font-bold mb-4">University List</h1>
      </div>
      <div className="flex justify-between items-center mt-4">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Button
          className="p-1 mb-4"
          onClick={() => (window.location.href = `/universities/new`)}
        >
          <PlusIcon className="h-5 w-5 text-white" />
        </Button>
      </div>
      <UniversityTable />
    </div>
  );
};
