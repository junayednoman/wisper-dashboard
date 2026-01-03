export interface TComplaint {
  id: string;
  type: string;
  status: string;
  date: string;
  reason: string;
  account: TAccount;
  post: TPost;
}

export interface TPost {
  id: string;
  images: string[];
  caption: string;
  views: number;
  createdAt: string;
  author: {
    id: string;
    person?: TProfile;
    business?: TProfile;
  };
}

export interface TAccount {
  id: string;
  role: string;
  person: TProfile;
  business: TProfile;
}

export interface TProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  industry?: string;
  title?: string;
}
