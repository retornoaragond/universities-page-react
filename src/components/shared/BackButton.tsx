import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="px-4 py-2 bg-transparent hover:bg-gray-100 mb-5"
    >
      <ChevronLeftIcon className="h-5 w-5" />
    </button>
  );
};
