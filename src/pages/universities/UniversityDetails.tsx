import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { University } from '../../types/university';
import { getUniversity } from '../../api/universities';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/shared/Button';
import { BackButton } from '../../components/shared/BackButton';

export const UniversityDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isPending, error } = useQuery<University, Error>({
    queryKey: ['university', id],
    queryFn: () => getUniversity(id!),
  });

  if (isPending)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        Loading...
      </div>
    );

  if (error instanceof Error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-center">
        Error loading university: {error.message}
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-4xl p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <BackButton />
        <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">
          {data?.name}
        </h2>
        <div className="space-y-6">
          <div className="flex items-center">
            <strong className="font-semibold text-gray-800 w-32">
              Location:
            </strong>
            <span className="text-gray-600">
              {data?.location || 'Not provided'}
            </span>
          </div>

          <div className="flex items-center">
            <strong className="font-semibold text-gray-800 w-32">
              Website:
            </strong>
            <a
              href={data?.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 hover:underline truncate"
            >
              {data?.website_url || 'Not provided'}
            </a>
          </div>

          <div>
            <strong className="font-semibold text-gray-800">
              Contact Emails:
            </strong>
            <ul className="list-disc list-inside mt-2">
              {data?.contact_emails && data.contact_emails.length > 0 ? (
                data.contact_emails.map((emailObj, index) => (
                  <li key={index} className="text-gray-600">
                    <a
                      href={`mailto:${emailObj.email}`}
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {emailObj.email}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No emails provided</li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            onClick={() =>
              (window.location.href = `/universities/${data?.id}/edit`)
            }
            isIcon
            className="p-1"
          >
            <PencilIcon className="h-5 w-5 text-green-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};
