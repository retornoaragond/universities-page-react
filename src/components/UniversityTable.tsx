import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUniversity, fetchUniversities } from '../api/universities';
import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useSearch } from '../context/SearchContext';
import { Button } from './shared/Button';
import { UniversitiesResponse, University } from '../types/university';
import { DeleteModal } from './DeleteModal';

export const UniversityTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchTerm } = useSearch();
  const queryClient = useQueryClient();

  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [deleteModal, setDeleteModal] = useState<University | null>(null);

  const { data, isPending, error } = useQuery<UniversitiesResponse, Error>({
    queryKey: ['universities', searchTerm, currentPage, sortBy, sortOrder],
    queryFn: () =>
      fetchUniversities(currentPage, searchTerm, sortBy, sortOrder),
  });
  const meta = data?.meta;

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUniversity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['universities'] });
      setDeleteModal(null);
    },
    onError: () => {
      alert('An error occurred while deleting the university.');
    },
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleDelete = (university: University) => {
    setDeleteModal(university);
  };

  const confirmDelete = () => {
    if (deleteModal) {
      deleteMutation.mutate(deleteModal.id.toString());
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr>
            <th
              className="cursor-pointer border border-gray-300 p-2"
              onClick={() => handleSort('name')}
            >
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="cursor-pointer border border-gray-300 p-2"
              onClick={() => handleSort('location')}
            >
              Location{' '}
              {sortBy === 'location' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="cursor-pointer border border-gray-300 p-2"
              onClick={() => handleSort('website_url')}
            >
              Website{' '}
              {sortBy === 'website_url' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="border border-gray-300 p-2">Contact Emails</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.universities.map((university) => (
            <tr key={university.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{university.name}</td>
              <td className="border border-gray-300 p-2">
                {university.location}
              </td>
              <td className="border border-gray-300 p-2">
                <a
                  href={university.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {university.website_url}
                </a>
              </td>
              <td className="border border-gray-300 p-2">
                {university.contact_emails.length > 0 && (
                  <div>
                    <a
                      href={`mailto:${university.contact_emails[0].email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {university.contact_emails[0].email}
                    </a>
                    {university.contact_emails.length > 1 && (
                      <span className="text-gray-500">
                        ,... +{university.contact_emails.length - 1}
                      </span>
                    )}
                  </div>
                )}
              </td>
              <td className="border border-gray-300 p-2">
                <Button
                  onClick={() =>
                    (window.location.href = `/universities/${university.id}`)
                  }
                  isIcon
                  className="p-1"
                >
                  <EyeIcon className="h-5 w-5 text-blue-500" />
                </Button>
                <Button
                  onClick={() =>
                    (window.location.href = `/universities/${university.id}/edit`)
                  }
                  isIcon
                  className="p-1"
                >
                  <PencilIcon className="h-5 w-5 text-green-500" />
                </Button>
                <Button
                  onClick={() => handleDelete(university)}
                  isIcon
                  className="p-1"
                >
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-4">
        {meta?.prev && (
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className=" mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <ChevronLeftIcon className="h-5 w-5 text-white" />
          </button>
        )}
        <span className="text-gray-600">
          Page {meta?.page} of {meta?.pages}
        </span>
        {meta?.next && (
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className=" ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <ChevronRightIcon className="h-5 w-5 text-white" />
          </button>
        )}
      </div>
      {deleteModal && (
        <DeleteModal
          isOpen={!!deleteModal}
          onClose={() => setDeleteModal(null)}
          onConfirm={confirmDelete}
          title="Delete University"
          message={`Are you sure you want to delete ${deleteModal.name}? This action cannot be undone.`}
        />
      )}
    </div>
  );
};
