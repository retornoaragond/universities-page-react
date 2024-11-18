export type ContactEmail = {
  id?: number;
  email: string;
  _destroy?: boolean;
};

export type University = {
  id: number;
  name: string;
  location: string;
  website_url: string;
  contact_emails: ContactEmail[];
};

export type UniversitiesResponse = {
  universities: University[];
  meta: {
    page: number;
    pages: number;
    limit: number;
    count: number;
    next: number;
    next_url?: string;
    prev: number;
    prev_url?: string;
  };
};
