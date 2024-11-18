import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUniversity } from '../../api/universities';
import { UniversityFormData } from '../../types/university';
import { BackButton } from '../../components/shared/BackButton';

export const UniversityForm = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<UniversityFormData>({
    name: '',
    location: '',
    website_url: '',
    contact_emails: [{ email: '' }],
  });

  const mutation = useMutation({
    mutationFn: (formData: UniversityFormData) => createUniversity(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['universities'] });
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-lg">
      <BackButton />
      <h1 className="text-2xl font-bold mb-6">Create University</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Website URL</label>
          <input
            type="text"
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
        >
          {mutation.isPending ? 'Saving...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default UniversityForm;
