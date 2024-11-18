import { useQuery } from '@tanstack/react-query';
import { fetchUniversities } from '../api/universities';
import { useState } from 'react';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useSearch } from '../context/SearchContext';

export const UniversityTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchTerm } = useSearch();

  const { data, isPending, error } = useQuery({
    queryKey: ['universities', currentPage, searchTerm],
    queryFn: () => fetchUniversities(currentPage, searchTerm),
  });

  if (isPending) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const meta = data.meta;

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Location</th>
            <th className="border border-gray-300 p-2">Website</th>
            <th className="border border-gray-300 p-2">Contact Emails</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.universities.map((university) => (
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
                {university.contact_emails
                  .map((emailObj) => emailObj.email)
                  .join(', ')}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() =>
                    (window.location.href = `/universities/${university.id}`)
                  }
                >
                  <EyeIcon className="h-5 w-5 text-blue-500" />
                </button>
                <button
                  onClick={() =>
                    (window.location.href = `/universities/${university.id}/edit`)
                  }
                >
                  <PencilIcon className="h-5 w-5 text-green-500" />
                </button>
                <button onClick={() => ''}>
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        {meta.prev && (
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Previous
          </button>
        )}
        <span className="text-gray-600">
          Page {meta.page} of {meta.pages}
        </span>
        {meta.next && (
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
