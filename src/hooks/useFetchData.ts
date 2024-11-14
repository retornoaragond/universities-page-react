import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/axios';

const fetchData = async () => {
  const response = await apiClient.get('/endpoint');
  return response.data;
};

export const useFetchData = () => {
  return useQuery({
    queryKey: ['fetchData'],
    queryFn: fetchData,
  });
};
