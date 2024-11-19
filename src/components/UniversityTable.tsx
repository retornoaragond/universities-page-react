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
import { Blocks } from 'react-loader-spinner';

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

  if (isPending)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Blocks
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </div>
    );
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-2 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer lg:hidden"
                onClick={() => handleSort('name')}
              >
                University{' '}
                {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer lg:hidden hidden sm:table-cell"
                onClick={() => handleSort('website_url')}
              >
                Contact Info{' '}
                {sortBy === 'website_url' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>

              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer hidden lg:table-cell"
                onClick={() => handleSort('name')}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell cursor-pointer"
                onClick={() => handleSort('location')}
              >
                Location{' '}
                {sortBy === 'location' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hidden lg:table-cell"
                onClick={() => handleSort('website_url')}
              >
                Website{' '}
                {sortBy === 'website_url' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell"
              >
                Contact Emails
              </th>
              <th
                scope="col"
                className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right hidden lg:table-cell"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.universities.map((university, index) => (
              <tr
                key={university.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-4 pl-4 pr-3 text-xs font-medium text-gray-900 sm:pl-6 lg:hidden">
                  <div>{university.name}</div>
                  <div className="text-gray-400">{university.location}</div>
                  <div className="text-gray-400 sm:hidden">
                    <a
                      href={university.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {university.website_url}
                    </a>
                  </div>
                  <div className="text-gray-400 sm:hidden">
                    Emails:{' '}
                    {university.contact_emails.length > 0 ? (
                      <span>
                        {university.contact_emails[0].email}
                        {university.contact_emails.length > 1 && (
                          <span className="text-gray-400">
                            {' '}
                            +{university.contact_emails.length - 1} more
                          </span>
                        )}
                      </span>
                    ) : (
                      'No emails'
                    )}
                  </div>
                </td>
                <td className="py-4 pl-4 pr-3 text-xs font-medium text-gray-900 sm:pl-6 lg:hidden hidden sm:table-cell">
                  <div>
                    <a
                      href={university.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {university.website_url}
                    </a>
                  </div>
                  <div className="text-gray-400">
                    Emails:{' '}
                    {university.contact_emails.length > 0 ? (
                      <span>
                        {university.contact_emails[0].email}
                        {university.contact_emails.length > 1 && (
                          <span className="text-gray-400">
                            {' '}
                            +{university.contact_emails.length - 1} more
                          </span>
                        )}
                      </span>
                    ) : (
                      'No emails'
                    )}
                  </div>
                </td>
                <td className="hidden py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:table-cell">
                  {university.name}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell ">
                  {university.location}
                </td>
                <td className="px-3 py-4 text-sm text-blue-600 hover:underline hidden lg:table-cell">
                  <a
                    href={university.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {university.website_url}
                  </a>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 hidden lg:table-cell">
                  {university.contact_emails.length > 0 ? (
                    <span>
                      {university.contact_emails[0].email}
                      {university.contact_emails.length > 1 && (
                        <span className="text-gray-400">
                          {' '}
                          +{university.contact_emails.length - 1} more
                        </span>
                      )}
                    </span>
                  ) : (
                    'No emails'
                  )}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <div className="flex justify-end space-x-2">
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4">
        {meta?.prev && (
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="mr-2 flex items-center space-x-1 px-4 py-2 text-sm text-blue-500 hover:text-blue-700"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            <span>Previous</span>
          </button>
        )}
        <span className="text-sm text-gray-500">
          Page {meta?.page} of {meta?.pages}
        </span>
        {meta?.next && (
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="ml-2 flex items-center space-x-1 px-4 py-2 text-sm text-blue-500 hover:text-blue-700"
          >
            <span>Next</span>
            <ChevronRightIcon className="h-5 w-5" />
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
