import { useFetchData } from './hooks/useFetchData';

function App() {
  const { data, error, isLoading } = useFetchData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Data Fetch Example</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
