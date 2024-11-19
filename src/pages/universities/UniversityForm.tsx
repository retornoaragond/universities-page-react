import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  getUniversity,
  createUniversity,
  updateUniversity,
} from '../../api/universities';
import { University, UniversityFormData } from '../../types/university';
import { z } from 'zod';
import { universitySchema } from '../../validation/universitySchema';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/shared/Button';
import { Blocks } from 'react-loader-spinner';

const UniversityForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<UniversityFormData>({
    name: '',
    location: '',
    website_url: '',
    contact_emails: [{ email: '' }],
  });

  const [errors, setErrors] = useState<Record<string, string | string[]>>({});

  const { data, isLoading: isLoadingData } = useQuery<University, Error>({
    queryKey: ['university', id],
    queryFn: () => getUniversity(id!),
    enabled: isEditMode,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        location: data.location,
        website_url: data.website_url,
        contact_emails: data.contact_emails || [],
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (formData: UniversityFormData) =>
      isEditMode ? updateUniversity(id!, formData) : createUniversity(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['universities'] });
      navigate('/universities');
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updatedEmails = [...prev.contact_emails];
      updatedEmails[index].email = value;
      return { ...prev, contact_emails: updatedEmails };
    });
  };

  const handleAddEmail = () => {
    setFormData((prev) => ({
      ...prev,
      contact_emails: [...prev.contact_emails, { email: '' }],
    }));
  };

  const handleRemoveEmail = (index: number) => {
    setFormData((prev) => {
      const updatedEmails = [...prev.contact_emails];
      updatedEmails.splice(index, 1);
      return { ...prev, contact_emails: updatedEmails };
    });
  };

  const validateForm = () => {
    try {
      universitySchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: Record<string, string | string[]> = {};
        error.errors.forEach((err) => {
          if (err.path.length === 1) {
            validationErrors[err.path[0] as string] = err.message;
          } else if (err.path[0] === 'contact_emails') {
            validationErrors.contact_emails = 'Invalid email(s) in the list.';
          }
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
    mutation.mutate(formData);
  };

  if (isEditMode && isLoadingData)
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

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-lg border border-gray-200 space-y-12"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {isEditMode ? 'Edit University' : 'Create University'}
        </h2>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md py-1.5 pl-2 shadow-md border focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md py-1.5 pl-2 shadow-md border focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.location && (
            <p className="mt-2 text-sm text-red-500">{errors.location}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="website_url"
            className="block text-sm font-medium text-gray-700"
          >
            Website
          </label>
          <input
            id="website_url"
            name="website_url"
            type="text"
            value={formData.website_url}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md py-1.5 pl-2 shadow-md border focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.website_url && (
            <p className="mt-2 text-sm text-red-500">{errors.website_url}</p>
          )}
        </div>

        <div>
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700">
              Contact Emails
            </label>
            <Button className="p-1 ml-2" isIcon onClick={handleAddEmail}>
              <PlusIcon className="h-5 w-5 text-blue" />
            </Button>
          </div>

          {formData.contact_emails.map((emailObj, index) => (
            <div key={index} className="flex items-center mt-2 space-x-2">
              <input
                type="email"
                value={emailObj.email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                className="flex-1 rounded-md py-1.5 pl-2 shadow-md border focus:border-blue-500 focus:ring-blue-500"
              />
              <Button
                onClick={() => handleRemoveEmail(index)}
                isIcon
                className="p-1"
              >
                <TrashIcon className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          ))}

          {errors.contact_emails && (
            <p className="mt-2 text-sm text-red-500">{errors.contact_emails}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-x-4">
        <button
          type="button"
          onClick={() => navigate('/universities')}
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600"
        >
          {mutation.isPending ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default UniversityForm;
