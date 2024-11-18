import { useQuery } from '@tanstack/react-query';
import { fetchUniversities } from '../api/universities';

export const UniversityTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['universities'],
    queryFn: () => fetchUniversities(1, ''),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>University Table</h2>
      {data?.universities.map((university) => (
        <div key={university.id}>{university.name}</div>
      ))}
    </div>
  );
};
