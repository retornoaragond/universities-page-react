import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getUniversity, createUniversity, updateUniversity } from "../../api/universities";
import { University, UniversityFormData } from "../../types/university";
import { BackButton } from "../../components/shared/BackButton";
import { z } from "zod";
import { universitySchema } from "../../validation/universitySchema";

const UniversityForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<UniversityFormData>({
    name: "",
    location: "",
    website_url: "",
    contact_emails: [{ email: "" }],
  });

  const [errors, setErrors] = useState<Record<string, string | string[]>>({});

  const { data, isLoading: isLoadingData } = useQuery<University, Error>({
    queryKey: ["university", id],
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
      queryClient.invalidateQueries({ queryKey: ["universities"] });
      navigate("/universities");
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
      contact_emails: [...prev.contact_emails, { email: "" }],
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
          } else if (err.path[0] === "contact_emails") {
            validationErrors.contact_emails = "Invalid email(s) in the list.";
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

  if (isEditMode && isLoadingData) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <BackButton />
      <h1>{isEditMode ? "Edit University" : "Create University"}</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ padding: "5px", width: "100%" }}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={{ padding: "5px", width: "100%" }}
          />
          {errors.location && <p style={{ color: "red" }}>{errors.location}</p>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Website URL:</label>
          <input
            type="text"
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            style={{ padding: "5px", width: "100%" }}
          />
          {errors.website_url && <p style={{ color: "red" }}>{errors.website_url}</p>}
        </div>
        <div>
          <label>Contact Emails:</label>
          {formData.contact_emails.map((emailObj, index) => (
            <div
              key={index}
              style={{ display: "flex", marginBottom: "10px" }}
            >
              <input
                type="email"
                value={emailObj.email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                style={{ padding: "5px", flex: 1 }}
              />
              <button
                type="button"
                onClick={() => handleRemoveEmail(index)}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
          {errors.contact_emails && (
            <p style={{ color: "red" }}>{errors.contact_emails}</p>
          )}
          <button
            type="button"
            onClick={handleAddEmail}
            style={{
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Email
          </button>
        </div>

        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {mutation.status === "pending"
            ? "Saving..."
            : isEditMode
            ? "Update"
            : "Create"}
        </button>
      </form>
    </div>
  );
};

export default UniversityForm;
