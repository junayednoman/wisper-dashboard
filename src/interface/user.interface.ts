export interface TUserProfile {
  coverPhoto: any;
  _id: string;
  name: string;
  email: string;
  photoUrl: string;
  bio: string;
  address: any;
  scores: number;
  status: string;
  id: string;
  createdAt: string;
  avgRating: number;
}

export type TUserCharts = TUserChart[];

export interface TUserChart {
  month: string;
  amount: number;
}

export interface TUser {
  id: string;
  role: string;
  status: "ACTIVE" | "BLOCKED";
  createdAt: string;
  person: TPerson;
  business: TBusiness;
}

export interface TPerson {
  id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  title: string;
  industry: string;
  address: string;
}

export interface TBusiness {
  id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  industry: string;
  address: string;
}
