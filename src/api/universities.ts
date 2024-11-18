import axios from 'axios';
import { UniversitiesResponse, UniversityFormData } from '../types/university';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

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

export const getUniversity = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/universities/${id}`);
  return response.data;
};

export const createUniversity = async (
  data: UniversityFormData,
): Promise<UniversityFormData> => {
  const response = await axios.post(`${API_BASE_URL}/universities`, data);
  return response.data;
};

export const updateUniversity = async (
  id: string,
  data: UniversityFormData,
) => {
  const response = await axios.patch(
    `${API_BASE_URL}/universities/${id}`,
    data,
  );
  return response.data;
};

export const deleteUniversity = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/universities/${id}`);
  return response.data;
};
