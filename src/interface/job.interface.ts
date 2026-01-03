export interface TJob {
  id: string;
  author: Author;
  title: string;
  description: string;
  salary: number;
  compensationType: string;
  experienceLevel: string;
  qualification: string;
  responsibilities: string[];
  requirements: string[];
  applicationType: string;
  locationType: string;
  location: string;
  type: string;
  createdAt: string;
}

export interface Author {
  id: string;
  business: Business;
}

export interface Business {
  id: string;
  name: string;
  industry: string;
  address: string;
  image: string;
}
