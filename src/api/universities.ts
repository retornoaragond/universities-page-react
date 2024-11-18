import axios from 'axios';
import { UniversitiesResponse } from '../types/university';

const API_BASE_URL = 'http://localhost:3000/api/v1';

export const fetchUniversities = async (
  page: number,
  search: string,
  sortBy = 'name',
  sortOrder: 'asc' | 'desc' = 'asc',
): Promise<UniversitiesResponse> => {
  const response = await axios.get(`${API_BASE_URL}/universities`, {
    params: { page, search, sort_by: sortBy, sort_order: sortOrder },
  });
  return response.data;
};

export const deleteUniversity = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/universities/${id}`);
  return response.data;
};
